import ContactSection from '@/components/landing-page/ContactSection'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import InfoCard from '@/components/shared/InfoCard'
import Section from '@/components/shared/Section'
import PageHero from '@/components/shared/page/PageHero'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const content = {
    hero: {
        titles: [
            'Seamless Travel Booking',
            'With Our',
            'IRCTC Booking API'
        ],
        desc: 'Integrate our IRCTC Travel Booking API to provide your users with a seamless and convenient way to book train tickets. Expand your travel services and enhance the user experience with our reliable and efficient API integration.',
        image: '/assets/images/tb-1.jpg'
    },
    info: [
        {
            title: 'Real-time Train Booking',
            desc: 'Enable your users to search, book, and instantly confirm train tickets with real-time availability and pricing information.',
            image: '/assets/images/icons/art-and-design.svg'
        },
        {
            title: 'PNR Status and Train Schedule',
            desc: 'Allow users to check their PNR status and access train schedules for planning their journeys effectively.',
            image: '/assets/images/icons/smartphone.svg',
            highlight: true
        },
        {
            title: 'Secure Payment Integration',
            desc: 'Facilitate secure and seamless payment transactions within your platform, ensuring a smooth booking experience for your users.',
            image: '/assets/images/icons/clock.svg'
        },
    ]
}

const TarvelBookingPage = () => {
    return (
        <>
            <PageHero
                titles={content.hero.titles}
                image={content.hero.image}
                desc={content.hero.desc}
                extra={<div className='mt-10'><Link href="contact"><Button variant={'glow'} size={'lg'}>Contact Us</Button></Link></div>}
            />

            <Section
                sectionTitle='Travel Booking API'
                sectionDesc={`By partnering with NKPays for IRCTC Travel Booking API integration, you gain access to a reliable and trusted API solution that enhances your travel platform's capabilities.`}
            >
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center ">
                    {
                        content.info.map(ct => {
                            return (
                                <div key={nanoid()}>
                                    <div className='max-w-sm w-full'>
                                        <InfoCard key={nanoid()} {...ct} />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </Section>

            <article className='max-w-6xl mx-auto space-y-10'>
                <Section>
                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4">
                        <div>
                            <div className="max-w-lg">
                                <h2 className='mb-3 text-3xl font-medium'>What is Travel Booking Api</h2>
                                <p className='text-gray-500'>At <span className='text-primary font-medium'>NKPays</span>, we offer a robust and reliable IRCTC Travel Booking API service that allows you to integrate the power of the Indian Railway Catering and Tourism Corporation (IRCTC) into your travel platform. With our API, you can provide your users with a seamless and hassle-free experience of booking train tickets, checking availability, and managing reservations.</p>
                            </div>
                        </div>

                        <div className='aspect-video relative '>
                            <Image className='object-contain' alt="What-is-irctc-booking-api" src="/assets/images/travel-api-2.webp" fill />
                        </div>
                    </div>
                </Section>

                <section className=''>
                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
                        <div>
                            <Image alt="What-is-AEPS" src="/assets/images/tb-2.jpg" width={500} height={500} />
                        </div>
                        <div>
                            <div className="max-w-lg">
                                <h2 className='mb-3 text-3xl font-medium'> Key Features and Benefits</h2>
                                <ul className='text-gray-500 mt-4'>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Enable your users to search, book, and instantly confirm train tickets with real-time availability and pricing information.</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Provide accurate and up-to-date seat availability status and fare information for different classes and train routes.</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Allow users to check their PNR status and access train schedules for planning their journeys effectively.</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Facilitate secure and seamless payment transactions within your platform, ensuring a smooth booking experience for your users.</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>{`Our API is designed to be user-friendly, providing easy integration with your existing travel platform or application.`}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='py-10'>
                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">

                        <div>
                            <div className="max-w-lg">
                                <h2 className='mb-3 text-3xl font-medium'> Partner with Us</h2>
                                <p className='text-gray-500'>By partnering with [Your Company Name] for IRCTC Travel Booking API integration, you gain access to a reliable and trusted API solution that enhances your travel platform &apos; s capabilities. Expand your services, improve user satisfaction, and stay competitive in the travel industry with our seamless integration options.</p>
                            </div>
                        </div>
                        <div>
                            <Image alt="What-is-AEPS" src="/assets/images/tb-3.jpg" width={500} height={500} />
                        </div>
                    </div>
                </section>
            </article>


            <DownloadAppSection />
            <ContactSection />
        </>
    )
}

export default TarvelBookingPage