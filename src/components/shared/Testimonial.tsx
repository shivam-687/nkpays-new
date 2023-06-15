import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';

type TestimonialData = {
    avatarUrl?: string,
    name: string,
    desc: string
}

const testimonials = [
    {
        name: "Sarah G.",
        desc: "I have been using NKPays for all my mobile recharges and bill payments, and I must say it's been a game-changer. Highly recommended!",
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        name: "Mark R.",
        desc: "NKPays has made my travel bookings a breeze. It has simplified my travel planning, and I couldn't be happier!",
        avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        name: "Lisa M.",
        desc: "As a small business owner, I rely on NKPays for my domestic money transfers and AEPS transactions. It has truly transformed my financial transactions.",
        avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        name: "David H.",
        desc: "NKPays has become my go-to platform for DTH recharges and general insurance. I highly recommend NKPays for their reliable services.",
        avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        name: "Emily S.",
        desc: "I love using NKPays for all my bill payments. The platform is so convenient and user-friendly. It has saved me a lot of time and hassle.",
        avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    },
];

const TestimonialItem = ({
    data
}: {
    data: TestimonialData
}) => {

    return (
        <div>
            <div className="">
                <div className='aspect-square rounded-lg overflow-hidden bg-center bg-cover bg-no-repeat mb-2' style={{ backgroundImage: `url(${data.avatarUrl || ''})`, width: '50px' }}></div>
                <div className='rounded-lg p-4 shadow-md space-y-2 flex-grow'>
                    <p>{data.desc}</p>
                    <span className='italic text-primary'>{data.name}</span>
                </div>
            </div>
        </div>
    )
}

const Testimonial = () => {
    return (
        <div >
            <Swiper
            slidesPerView={1}
            spaceBetween={50}
            breakpoints={{
                '768': {
                    slidesPerView: 3,
                },
            }}
        >
            {
                testimonials.map(t => {
                    return <SwiperSlide key={nanoid()}><div className="py-4"><TestimonialItem data={t} /></div></SwiperSlide>
                })
            }
        </Swiper>
        </div>
    )
}

export default Testimonial