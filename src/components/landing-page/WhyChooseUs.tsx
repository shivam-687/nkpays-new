import React from 'react'
import Section from '../shared/Section'
import { Check, CheckIcon } from 'lucide-react'
import Image from 'next/image'
import { nanoid } from 'nanoid'

const wcuContent = [
    {
        title: 'Comprehensive Services',
        desc: 'Access a wide range of comprehensive services including mobile recharge, travel booking, DTH recharges, bill payments etc.'
    },
    {
        title: 'Seamless User Experience',
        desc: 'User-friendly platform with hassle-free processes for smooth mobile recharge, travel booking, and secure transactions.'
    },
    {
        title: 'Reliable and Secure',
        desc: 'Trustworthy services with a focus on security and data protection for your peace of mind.'
    },
    {
        title: 'Expertise and Support',
        desc: 'Experienced team and dedicated support to provide tailored solutions and assistance for your needs.'
    },
]

const Triangle = () => {
    return (
        <Image src="/assets/images/shape-1.png" width={686} height={689} alt="" />

    )
}

const WhyChooseUsCard = ({
    title,
    desc
}: {
    title: string,
    desc: string
}) => {
    return (
        <div className="rounded-xl backdrop-blur border border-primary/70 p-5 max-w-full md:max-w-sm bg-white/25">
            <div className='mb-3 flex items-center justify-center'>
                <div className='w-14 h-14 rounded-full inline-flex items-center justify-center shadow bg-white'>
                    <Check className='w-10 h-10 text-primary ' />
                </div>
            </div>

            <div className='space-y-2 text-center'>
                <h3 className='font-bold'>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

const WhyChooseUs = () => {
    return (

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
            <div className='col-auto md:col-span-2'>
                <div className='max-w-2xl mx-auto'>
                    <div className='text-center mb-10'>
                        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Why Choose NKPays</h2>
                        <p>{` At NKPays, we stand out from the competition for several compelling reasons. Our commitment to excellence and customer satisfaction sets us apart as the preferred choice for integrated services.`}</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 relative mt-16 justify-items-center'>
                        {
                            wcuContent.map(ct => {
                                return <WhyChooseUsCard {...ct} key={nanoid()} />
                            })
                        }

                        <div className='absolute -top-10 -left-10 w-full h-full -z-10 bg-left-top bg-contain bg-no-repeat' style={{ backgroundImage: `url(/assets/images/shape-1.png)` }}>
                            {/* <div className='w-full h-full  bg-left bg-contain bg-no-repeat' style={{ backgroundImage: `url(/assets/images/shape-1.png)` }}></div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='max-w-xs mx-auto lg:mx-0'>
                <Image alt=""  src="/assets/images/app.png" width={500} height={1052} />
                </div>
            </div>
        </div>

    )
}

export default WhyChooseUs