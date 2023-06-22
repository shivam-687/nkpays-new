import MutateContactInfo from '@/components/setting/MutateContactInfo'
import SettingsLayout from '@/components/setting/SettingPageLayout'
import Loading from '@/components/shared/Loading'
import { api } from '@/utils/api'
import { nanoid } from 'nanoid'
import React from 'react'

const SettingPage = () => {
  const {data, isLoading } = api.contactInfo.getAll.useQuery({})

  return (
    <SettingsLayout>
      <div className='space-y-10'>
        {
          isLoading ?
          <div className='py-20'>
            <Loading/>
          </div>
          :
          data?.map(d => {
            return <MutateContactInfo key={nanoid()} data={d}/>
          })
        }
      </div>
    </SettingsLayout>
  )
}

export default SettingPage