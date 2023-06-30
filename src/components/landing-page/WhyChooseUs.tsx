import React from 'react'
import { Check, CheckIcon } from 'lucide-react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { useTrail, animated, useSpring, useInView } from '@react-spring/web'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Autoplay, EffectCube } from "swiper";
import { Fade, Zoom } from 'react-awesome-reveal'
import AppDownloadButton from '../shared/AppDownloadButton'
import "swiper/css";
import "swiper/css/effect-fade";

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
        <div className="rounded-xl backdrop-blur border border-primary/70 p-5  md:max-w-sm bg-white/25">
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


const MobilePan = ({ imageUrl, link }: { imageUrl: string, link?: string }) => {
    return (
        <div className='max-w-xs mx-auto lg:mx-0 relative'>
            <Image alt="" src={imageUrl} width={500} height={1052} />
            <Fade direction='down' className='absolute w-full bottom-0 left-0 flex justify-center'>
                <div className='max-w-xs mx-auto rounded-xl border border-primary/60 backdrop-blur-md bg-white/30 flex items-center justify-center p-5 '>
                    <AppDownloadButton href={link} />
                </div>
            </Fade>
        </div>
    )
}

const WhyChooseUs = () => {
    const [ref, inView] = useInView()
    const [trail, api] = useTrail(4, () => ({ delay: 2000, from: { opacity: 0, scale: '0.7' }, to: { opacity: 1, scale: '1' } }), [inView])


    const appSlides = [
        {
            imageUrl: '/assets/images/app-2.png',
            link: 'https://play.google.com/store/apps/details?id=com.nkpays.nkpays',
            title: 'NKPays Banking Services'
        },
        {
            imageUrl: '/assets/images/app-1.png',
            link: 'https://play.google.com/store/apps/details?id=com.nkpaysapp',
            title: 'NKPays Lite Recharge & Bill Payment'
        },
        {
            imageUrl: '/assets/images/app-2.png',
            link: 'https://play.google.com/store/apps/details?id=com.nkpays.nkpays',
            title: 'NKPays Banking Services'
        },
        {
            imageUrl: '/assets/images/app-1.png',
            link: 'https://play.google.com/store/apps/details?id=com.nkpaysapp',
            title: 'NKPays Lite Recharge & Bill Payment'
        },
        {
            imageUrl: '/assets/images/app-2.png',
            link: 'https://play.google.com/store/apps/details?id=com.nkpays.nkpays',
            title: 'NKPays Banking Services'
        },
        {
            imageUrl: '/assets/images/app-1.png',
            link: 'https://play.google.com/store/apps/details?id=com.nkpaysapp',
            title: 'NKPays Lite Recharge & Bill Payment'
        },
    ]

    return (

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
            <div className='col-auto md:col-span-2'>
                <div className='max-w-2xl mx-auto'>
                    <div className='text-center mb-10'>
                        <div className="overflow-hidden">
                            <Fade triggerOnce direction="up"><h2 className='text-3xl md:text-4xl font-bold mb-4'>Why Choose NKPays</h2></Fade>
                        </div>
                        <div className="overflow-hidden">
                            <Fade triggerOnce direction="down">
                            <p>{` At NKPays, we stand out from the competition for several compelling reasons. Our commitment to excellence and customer satisfaction sets us apart as the preferred choice for integrated services.`}</p>
                            </Fade>
                        </div>
                        
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 relative mt-16 justify-items-center' ref={ref}>
                        {
                            wcuContent.map((ct, index) => {
                                return <Zoom triggerOnce delay={100 * (index+1)} key={nanoid()} ><WhyChooseUsCard {...ct} /></Zoom>
                            })
                        }

                        <animated.div className='absolute -top-10 -left-10 w-full h-full -z-10 bg-left-top bg-contain bg-no-repeat' style={{ backgroundImage: `url(/assets/images/shape-1.png)` }}>
                            {/* <div className='w-full h-full  bg-left bg-contain bg-no-repeat' style={{ backgroundImage: `url(/assets/images/shape-1.png)` }}></div> */}
                        </animated.div>
                    </div>
                </div>
            </div>
            <div className=''>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop
                    navigation={false}
                    effect='cube'
                    cubeEffect={{shadow: false, slideShadows: false}}
                    modules={[Autoplay, EffectCube]}
                >

                    {
                        appSlides.map(slide => {
                            return <SwiperSlide key={nanoid()}>
                                 <MobilePan imageUrl={slide.imageUrl} link={slide.link} />
                            </SwiperSlide>
                        })
                    }
                    
                </Swiper>
            </div>
        </div>

    )
}

export default WhyChooseUs