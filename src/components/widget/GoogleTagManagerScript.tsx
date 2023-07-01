import { type CreateGoogleTagMangerExtensionOutput } from '@/schema/extension.schema';
import { api } from '@/utils/api'
import React, { useEffect } from 'react'
import TagManager from 'react-gtm-module';

const GoogleTagManagerScript = () => {
    const {data} = api.extension.get.useQuery<CreateGoogleTagMangerExtensionOutput, CreateGoogleTagMangerExtensionOutput>({title: 'google_tag_manager'});

    useEffect(() => {
      
        if(data && data.data.code && data.data.code !== ''){
            
            TagManager.initialize({gtmId: data.data.code})
        }
    }, [data])
  return (
    <></>
  )
}

export default GoogleTagManagerScript