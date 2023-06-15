import React from 'react'
import Section from './Section'
import Logo from './Logo'
import AppDownloadButton from './AppDownloadButton'
import Image from 'next/image'

const DownloadAppSection = () => {
    const image = '/assets/image/app.png'
    return (

        <Section className=' py-20 md:py-40 overflow-x-hidden'>
            <div className="bg-primary/30 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 container justify-items-center ">
                    <div className="max-w-sm">
                        <div className='space-y-3'>
                            <div className="flex">
                                <h3 className='text-3xl md:text-4xl font-bold'>Download</h3>
                                <div className='max-w-[120px] md:max-w-[120px]'><Logo /></div>
                            </div>
                            <h3 className='text-3xl md:text-4xl font-bold'>Application From</h3>
                            <h3 className='text-3xl md:text-4xl font-bold'>Google Play Store</h3>
                        </div>
                        <p className='mt-4'>Signup and create your account. In 48 hours you can start your own business and increase your income</p>
                        <div className="mt-4"><AppDownloadButton /></div>
                    </div>

                    <div className='relative w-full pt-10 '>
                        <div className="max-w-xs relative mx-auto  md:absolute  p-5 z-30  -translate-y-1/2 top-1/2"><Image alt="" src={'/assets/images/app.png'} width={500} height={1000} /></div>
                        <div className='absolute max-w-sm w-full  z-20 top-0 left-0 translate-x-1/2 bg-center bg-no-repeat bg-contain aspect-square' style={{backgroundImage: `url(${'/assets/images/shape-2.png'})`}}>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default DownloadAppSection