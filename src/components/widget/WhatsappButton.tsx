import { api } from '@/utils/api'
import Link from 'next/link';
import React, { type PropsWithChildren } from 'react'
import Loading from '../shared/Loading';
import { WhatsappSettingOutput } from '@/schema/extension.schema';

const WhatsappButton = ({
    children
}: PropsWithChildren) => {
    const {data, isLoading} = api.extension.get.useQuery<WhatsappSettingOutput, WhatsappSettingOutput>({title: 'whatsapp'});


    if(isLoading) {
      return (
        <span className='inline-flex items-center justify-center p-2'>
          <Loading width={20} height={20}/>
        </span>
      )
    }
    if(!data) {
      return <span></span>
    }
  return (
    <Link href={`https://wa.me/${data.data?.number||''}?text=${encodeURI(data.data?.greetMessage||'')}`}>
      {/* {
        children
        ?
        {children}
        :
        <span></span>
      } */}
    </Link>
  )
}

export default WhatsappButton