import ContactSection from '@/components/landing-page/ContactSection'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import InfoCard from '@/components/shared/InfoCard'
import Section from '@/components/shared/Section'
import PageHero from '@/components/shared/page/PageHero'
import { Button } from '@/components/ui/button'
import { env } from '@/env.mjs'
import { CheckCircle } from 'lucide-react'
import { nanoid } from 'nanoid'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const content = {
    hero: {
        titles: [
            'Become a Trusted General',
            'Insurance Partner with',
            'NKPays',
        ],
        desc: 'Join us as a General Insurance Partner and unlock a world of opportunities. Leverage our expertise, products, and support to provide your clients with comprehensive insurance coverage. Together, we can build a strong partnership and deliver exceptional value to customers.',
        image: '/assets/images/gi-1.jpg'
    },
    info: [
        {
            title: 'Extensive Insurance Portfolio',
            desc: 'Gain access to a wide range of insurance products, including automobile, homeowners, travel, health, and more. ',
            image: '/assets/images/icons/art-and-design.svg'
        },
        {
            title: 'Competitive Commissions',
            desc: 'Enjoy competitive commissions and incentives for your business, ensuring a mutually beneficial partnership that rewards your efforts.',
            image: '/assets/images/icons/smartphone.svg',
            highlight: true
        },
        {
            title: 'Robust Technology Platform',
            desc: 'Access our advanced technology platform, which streamlines insurance processes, facilitates policy management.',
            image: '/assets/images/icons/clock.svg'
        },
    ]
}

const AepsPage = () => {
    return (
        <>
            <NextSeo
                title={content.hero.titles.join(' ')}
                description={content.hero.desc}
                openGraph={{
                    title: content.hero.titles.join(' '),
                    description: content.hero.desc,
                    url: env.NEXT_PUBLIC_SITE_URL,
                    images: []
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />

            <PageHero
                titles={content.hero.titles}
                image={content.hero.image}
                desc={content.hero.desc}
                extra={<div className='mt-10'><Link href="contact"><Button variant={'glow'} size={'lg'}>Contact Us</Button></Link></div>}
            />

            <Section
                sectionTitle='General Insurance with NKPays'
                sectionDesc={`Ready to become a trusted General Insurance Partner? Join our network and unlock a world of opportunities. Together, we can provide clients with reliable insurance coverage and exceptional service. Contact us today to discuss partnership possibilities and take the first step towards a successful collaboration.`}
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


            <section className='py-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center items-center">
                    <div>
                        <Image alt="why-partner-with-us" src="/assets/images/gi-4.jpg" width={500} height={500} />
                    </div>
                    <div>
                        <div className="max-w-lg">
                            <h2 className='mb-3 text-3xl font-medium'>Why Partner with Us?</h2>
                            <p className='text-gray-500'>Partnering with NKPays as a General Insurance Partner offers numerous advantages. Here are some key reasons why you should choose us:</p>
                            <ul className='text-gray-500 mt-4'>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Gain access to a wide range of insurance products, including automobile, homeowners, travel, health, and more. Offer your clients comprehensive coverage tailored to their needs.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Enjoy competitive commissions and incentives for your business, ensuring a mutually beneficial partnership that rewards your efforts.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Access our advanced technology platform, which streamlines insurance processes, facilitates policy management, and provides real-time updates for enhanced efficiency.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Benefit from our marketing and sales support, including promotional materials, training resources, and customer acquisition strategies to boost your business growth.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span> We have partnerships with trusted insurance providers, ensuring that you can offer reliable and reputable insurance policies to your clients.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center items-center">

                    <div>
                        <div className="max-w-lg">
                            <h2 className='mb-3 text-3xl font-medium'>Partnership Benefits</h2>

                            <ul className='text-gray-500 mt-4'>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span> Expand your service offerings and cater to the insurance needs of your clients. Provide them with a comprehensive range of insurance solutions under one roof.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Stand out from your competitors by offering a diverse range of insurance products, ensuring your clients have access to the coverage they need.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Receive expert guidance and support from our experienced team. We offer training programs, product knowledge sessions, and ongoing assistance to help you serve your clients effectively.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>By partnering with [Your Company Name], you leverage our reputation and expertise, instilling trust and confidence in your clients. This leads to long-term relationships and client loyalty.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>{`As a General Insurance Partner, you can tap into a growing market, capitalize on cross-selling opportunities, and achieve sustainable business growth.`}</span>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div>
                        <Image alt="features" src="/assets/images/gi-3.jpg" width={500} height={500} />
                    </div>
                </div>
            </section>


            <DownloadAppSection />
            <ContactSection />
        </>
    )
}

export default AepsPage