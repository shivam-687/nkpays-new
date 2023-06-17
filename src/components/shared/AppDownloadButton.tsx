import React, { AnchorHTMLAttributes, Attributes } from 'react'
import {PlayIcon} from 'lucide-react'
import Image from 'next/image'

const AppDownloadButton = ({...props}: AnchorHTMLAttributes<any>) => {
  return (
    <a {...props} className='px-4 py-2 text-base bg-black inline-flex items-center gap-2 text-white rounded cursor-pointer'>
        <span><Image alt="" width={30} height={30} src="/assets/images/icons/play-icon.svg"/></span>
        <div className='flex flex-col'>
            <span className='font-bold'>Google Play</span>
        </div>
    </a>
  )
}

export default AppDownloadButton