import GoogleMapSetting from '@/components/setting/GoogleMapSetting'
import GoogleTagManagerSetting from '@/components/setting/GoogleTagManager'
import SettingsLayout from '@/components/setting/SettingPageLayout'
import TwakTooSetting from '@/components/setting/TwakTooSetting'
import WhatsappSetting from '@/components/setting/WhatsappSetting'
import { type TwakTooSettingOutput, type GoogleMapExtensionOutput, WhatsappSettingOutput, CreateGoogleTagMangerExtensionOutput } from '@/schema/extension.schema'
import { api } from '@/utils/api'
import React from 'react'


const extensionTitleMap = {
    GoogleMap: 'google_map',
    TwakTo: 'twak_to',
    Whatsapp: 'whatsapp',
}

const ExtensionPage = () => {
    const { data, isLoading } = api.extension.getAll.useQuery()

    const findDataByTitle = (title: string) => {
        if(!data) return undefined;
        const d = data.find(val => val.title.toLowerCase() === title.toLowerCase());
        return d;
    }
    return (
        <SettingsLayout>

            <div className='space-y-5 border rounded-xl p-2'>
                <GoogleMapSetting data={findDataByTitle(extensionTitleMap.GoogleMap) as GoogleMapExtensionOutput}/>
                <GoogleTagManagerSetting data={findDataByTitle(extensionTitleMap.GoogleMap) as CreateGoogleTagMangerExtensionOutput}/>
                <TwakTooSetting data={findDataByTitle(extensionTitleMap.TwakTo) as TwakTooSettingOutput}/>
                <WhatsappSetting data={findDataByTitle(extensionTitleMap.Whatsapp) as WhatsappSettingOutput} />
            </div>

        </SettingsLayout>
    )
}

export default ExtensionPage