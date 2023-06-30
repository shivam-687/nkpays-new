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
      'Seamless Recharge Service',
      'API Integration for',
      'Mobile and DTH Recharges',
    ],
    desc: 'Integrate our Recharge Service API to offer your users a seamless and convenient way to recharge their mobile phones and DTH services. Enhance your service offerings and provide a comprehensive recharge experience with our reliable API integration.',
    image: '/assets/images/recharge-1.jpg'
  },
  info: [
    {
      title: 'Real-time Recharge',
      desc: 'Enable users to recharge their devices instantly with real-time transaction processing, ensuring quick and efficient top-ups.',
      image: '/assets/images/icons/art-and-design.svg'
    },
    {
      title: 'Secure and Reliable',
      desc: 'Our API adheres to industry security standards, ensuring the confidentiality and integrity of user data and payment transactions.',
      image: '/assets/images/icons/smartphone.svg',
      highlight: true
    },
    {
      title: 'Flexible Payment Options',
      desc: 'Offer users a variety of payment options, including credit cards, debit cards, net banking, and digital wallets, providing convenience and flexibility.',
      image: '/assets/images/icons/clock.svg'
    },
  ]
}

const RechargeServicePage = () => {
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
        sectionTitle='NKPays Recharge Api'
        sectionDesc={`We understand the importance of customization and scalability for your business. Our Recharge Service API offers flexibility in terms of customization, allowing you to align the recharge functionality with your brand and user interface seamlessly. Additionally, our API is designed to handle high volumes of transactions, ensuring smooth and uninterrupted service as your user base grows.`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 items-center">
            <div>
              <div className="max-w-lg">
                <h2 className='mb-3 text-3xl font-medium'>Introducing Recharge Service API</h2>
                <p className='text-gray-500'>{`At NKPays, we offer a robust and efficient Recharge Service API that enables businesses to provide a wide range of recharge services to their customers. Our API allows you to seamlessly integrate mobile recharge and DTH recharge functionality into your platform or application, providing users with a hassle-free experience to recharge their devices.`}</p>
              </div>
            </div>

            <div className='aspect-square relative '>
              <Image className='object-contain' alt="What-is-bbps-api" src="/assets/images/recharge-2.jpg" fill />
            </div>
          </div>
        </Section>

        <section className=''>
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
            <div>
              <Image alt="What-is-reacharge-api" src="/assets/images/benefits.jpg" width={500} height={500} />
            </div>
            <div>
              <div className="max-w-lg">
                <h2 className='mb-3 text-3xl font-medium'> Key Features and Benefits</h2>
                <ul className='text-gray-500 mt-4'>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span> Our API supports popular mobile networks in India, including Vi, Airtel, BSNL, Jio, and more, allowing users to recharge their mobile phones instantly.</span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>Expand your services by offering DTH recharge functionality. Our API covers service providers like Tata Sky, Dish TV, Sun Direct, Videocon D2H, and Big TV, enabling users to recharge their DTH services conveniently.</span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>Enable users to recharge their devices instantly with real-time transaction processing, ensuring quick and efficient top-ups.</span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>Our API adheres to industry security standards, ensuring the confidentiality and integrity of user data and payment transactions. </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>{`Offer users a variety of payment options, including credit cards, debit cards, net banking, and digital wallets, providing convenience and flexibility.`}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className=''>
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center items-center">

            <div>
              <div className="max-w-lg">
                <h2 className='mb-3 text-3xl font-medium'>Partner with Us</h2>
                <p className='text-gray-500'>{`By partnering with NKPays for Recharge Service API integration, you gain access to a reliable and efficient solution that enhances your service offerings. Simplify the recharge process for your users, increase customer satisfaction, and stay ahead in the competitive market by leveraging the power of our Recharge Service API.`}</p>
              </div>
            </div>
            <div>
              <Image alt="bbps-partners" src="/assets/images/tb-3.jpg" width={500} height={500} />
            </div>
          </div>
        </section>

      </article>


      <DownloadAppSection />
      <ContactSection />
    </>
  )
}

export default RechargeServicePage