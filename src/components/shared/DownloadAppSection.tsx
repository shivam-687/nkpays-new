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
                        <Fade delay={500} className="mt-4"><AppDownloadButton /></Fade>
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
    const images = [
        '/assets/images/app.png',
        '/assets/images/app.png',
        '/assets/images/app.png',
        '/assets/images/app.png',
        '/assets/images/app.png',
        '/assets/images/app.png',
    ]

    const slideContent = [
        {
            image: '/assets/images/app.png',
            titleArray: [
                'Download NKPays',
                'Application from',
                'Google PlayStore'
            ],
            button: {
                link: '#',
                text: 'Download Now'
            },
            desc: `Signup and create your account. In 48 hours you can start your own business and increase your income`
        },
        {
            image: '/assets/images/app.png',
            titleArray: [
                'Download NKPays',
                'Banking Application',
                'From PlayStore'
            ],
            button: {
                link: '#',
                text: 'Download Now'
            },
            desc: `Signup and create your account. In 48 hours you can start your own business and increase your income`
        },
        {
            image: '/assets/images/app.png',
            titleArray: [
                'Download NKPays',
                'Application from',
                'Google PlayStore'
            ],
            button: {
                link: '#',
                text: 'Download Now'
            },
            desc: `Signup and create your account. In 48 hours you can start your own business and increase your income`
        },
        {
            image: '/assets/images/app.png',
            titleArray: [
                'Download NKPays',
                'Banking Application',
                'From PlayStore'
            ],
            button: {
                link: '#',
                text: 'Download Now'
            },
            desc: `Signup and create your account. In 48 hours you can start your own business and increase your income`
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
            autoplay={{ delay: 2000, disableOnInteraction: false }}

        >
            {
                slideContent.map(ct => {
                    return <SwiperSlide key={nanoid()}>
                        <Slide imageUrl={ct.image} titleArray={ct.titleArray} desc={ct.desc}/>
                    </SwiperSlide>
                })
            }
        </Swiper>

    )
}

export default DownloadAppSection