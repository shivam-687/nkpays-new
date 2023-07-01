/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { api } from '@/utils/api';
import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import { Button } from '../ui/button';
import Loading from '../shared/Loading';
import { TwakTooSettingOutput } from '@/schema/extension.schema';

//@ts-ignore
const TawkMessenger = dynamic<any>(() => import('@tawk.to/tawk-messenger-react'))

const TwakToWidget = () => {
  const tawkMessengerRef = useRef<any>();
  const {data, isLoading} = api.extension.get.useQuery<TwakTooSettingOutput, TwakTooSettingOutput>({title: 'twak_to'})

  const handleMinimize = () => {
    tawkMessengerRef.current?.minimize();
  };

  if(isLoading){
    return <span className='w-12 h-12 rounded-full bg-muted'>
      <Loading width={20} height={20}/>
    </span>
  }

  // if(!data){
  //   return null;
  // }


  return (
    <>
      {/* <button onClick={handleMinimize}> Minimize the Chat </button> */}
      <TawkMessenger
        propertyId={data?.data.propertyId || process.env.NEXT_PUBLIC_TWAKTO_PROPERTY_ID}
        widgetId={data?.data.widgetId ||process.env.NEXT_PUBLIC_TWAKTO_WIDGET_ID}
        useRef={tawkMessengerRef}
      />
    </>
  );
}

export default TwakToWidget