import { nanoid } from 'nanoid'
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

const partners = [
    {
        title: 'BSNL',
        logoUrl: '/assets/images/logos/partner-1.png'
    },
    {
        title: 'Jio',
        logoUrl: '/assets/images/logos/partner-2.png'
    },
    {
        title: 'Artel',
        logoUrl: '/assets/images/logos/partner-3.png'
    },
    {
        title: 'VI',
        logoUrl: '/assets/images/logos/partner-4.png'
    },
    {
        title: 'Dishtv',
        logoUrl: '/assets/images/logos/partner-5.png'
    },
    {
        title: 'Tataplay',
        logoUrl: '/assets/images/logos/partner-6.png'
    },
    {
        title: 'Videocon',
        logoUrl: '/assets/images/logos/partner-7.png'
    },
]

const LogoCarousel = () => {


  return (
    <div className=' container'>
        <Swiper
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
            768: {
                slidesPerView:5
            }
        }}
        >
            {
                partners.map(p => {
                    return <SwiperSlide key={nanoid()}>
                        <div  className='my-2 max-w-[200px] w-full aspect-video  rounded-lg shadow-lg bg-center bg-cover bg-no-repeat ' style={{backgroundImage: `url(${p.logoUrl ||''})`}}></div>
                    </SwiperSlide>
                })
            }
        </Swiper>
    </div>
  )
}

export default LogoCarousel