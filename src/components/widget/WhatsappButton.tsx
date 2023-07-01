import { api } from '@/utils/api'
import React, { type PropsWithChildren } from 'react'
import Loading from '../shared/Loading';
import { type WhatsappSettingOutput } from '@/schema/extension.schema';
import { WhatsAppOutlined } from '@ant-design/icons'

const WhatsappButton = ({
  children
}: PropsWithChildren) => {
  const { data, isLoading } = api.extension.get.useQuery<WhatsappSettingOutput, WhatsappSettingOutput>({ title: 'whatsapp' });


  if (isLoading) {
    return (
      <span className='inline-flex items-center justify-center p-2'>
        <Loading width={20} height={20} />
      </span>
    )
  }
  if (!data || !data.data.number || !data.active) {
    return <span></span>
  }
  return (
    <a
      href={`https://wa.me/${data.data?.number || ''}${data.data.greetMessage ? '?text=' + encodeURI(data.data.greetMessage) : ''}`}
    >
      {
        children
          ?
          children
          :
          <span className='p-2 rounded bg-green-800 flex gap-2 hover:bg-green-900 active:bg-green-700 transition-all duration-200 text-white font-medium items-center justify-center'>
            <WhatsAppOutlined />
            <span>Whatsapp</span>
          </span>
      }
    </a>
  )
}

export default WhatsappButton