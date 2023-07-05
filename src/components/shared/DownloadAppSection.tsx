import React from 'react'
import Section from './Section'
import Logo from './Logo'
import AppDownloadButton from './AppDownloadButton'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { nanoid } from 'nanoid'
import { Autoplay, EffectFade } from 'swiper'
import { Fade, Flip, Roll } from 'react-awesome-reveal'


const Slide = ({ imageUrl, link, titleArray = [], desc }: { imageUrl: string, link?: string, titleArray: string[], desc: string }) => {
    return (
        <Section className=' py-0 md:py-40 overflow-x-hidden'>
            <div className="bg-primary/30 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 container justify-items-center ">
                    <div className="max-w-sm overflow-hidden">
                        <div className='space-y-3'>
                            {
                                titleArray.map(title => {
                                    return (
                                        <div className="overflow-hidden" key={nanoid()}>
                                            <Fade direction='up' className='flex w-full'>
                                                <h3 className='text-3xl md:text-4xl font-bold'>{title}</h3>
                                            </Fade>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="overflow-hidden">
                            <Fade direction='down' delay={400}>
                            <p className='mt-4'>{desc}</p>
                            </Fade>
                        </div>
                        <Fade delay={500} className="mt-4"><a href={link||'#'}><AppDownloadButton /></a></Fade>
                    </div>

                    <div className='relative w-full pt-10 '>
                        <Fade delay={200} className="max-w-xs relative mx-auto  md:absolute  p-5 z-30  -translate-y-1/2 top-1/2"><Image alt="" src={imageUrl} width={500} height={1000} /></Fade>
                        <div  className='absolute max-w-sm w-full  z-20 top-0 left-0 translate-x-1/2 bg-center bg-no-repeat bg-contain aspect-square' style={{ backgroundImage: `url(${'/assets/images/shape-2.png'})` }}>
                        </div>
                    </div>
                </div>
            </div>
        </Section>

    )
}

const DownloadAppSection = () => {
    

    const slideContent = [
        {
            image: '/assets/images/app-1.png',
            titleArray: [
                'Download NKPays LITE',
                'Application',
            ],
            button: {
                link: 'https://play.google.com/store/apps/details?id=com.nkpaysapp',
                text: 'Download Now'
            },
            desc: `Nkpays LIte is a company specializes in Mobile, Data Card and Dth recharge technologies.`
        },
        {
            image: '/assets/images/app-2.png',
            titleArray: [
                'Download NKPays',
                'Banking Application',
                'From PlayStore'
            ],
            button: {
                link: 'https://play.google.com/store/apps/details?id=com.nkpays.nkpays',
                text: 'Download Now'
            },
            desc: `BBPS, Booking, Recharges, Bill Payments, FastTag, All in One Place`
        },
        {
            image: '/assets/images/app-1.png',
            titleArray: [
                'Download NKPays',
                'Application from',
                'Google PlayStore'
            ],
            button: {
                link: 'https://play.google.com/store/apps/details?id=com.nkpaysapp',
                text: 'Download Now'
            },
            desc: `Nkpays LIte is a company specializes in Mobile, Data Card and Dth recharge technologies.`
        },
        {
            image: '/assets/images/app-2.png',
            titleArray: [
                'Download NKPays',
                'Banking Application',
                'From PlayStore'
            ],
            button: {
                link: 'https://play.google.com/store/apps/details?id=com.nkpays.nkpays',
                text: 'Download Now'
            },
            desc: `BBPS, Booking, Recharges, Bill Payments, FastTag, All in One Place.`
        },

    ]
    return (

        <Swiper
            slidesPerView={1}
            loop
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{
                crossFade: true
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}

        >
            {
                slideContent.map(ct => {
                    return <SwiperSlide key={nanoid()}>
                        <Slide link={ct.button.link} imageUrl={ct.image} titleArray={ct.titleArray} desc={ct.desc}/>
                    </SwiperSlide>
                })
            }
        </Swiper>

    )
}

export default DownloadAppSection