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
      'Simplify Bill Payments',
      'With BBPS',
    ],
    desc: 'Integrate our BBPS (Bharat Bill Payment System) solution to offer your users a convenient, secure, and streamlined way to pay their bills. Enhance your payment services and provide a comprehensive bill payment experience with our reliable BBPS integration.',
    image: '/assets/images/BBPS.webp'
  },
  info: [
    {
      title: 'Multiple Biller Integration',
      desc: 'Integrate with a diverse range of billers across different categories, including utility bills, telecom bills, insurance premiums, education fees, and more.',
      image: '/assets/images/icons/art-and-design.svg'
    },
    {
      title: 'Convenient Payment Modes',
      desc: 'Offer multiple payment modes such as net banking, debit cards, credit cards, UPI, and mobile wallets to provide flexibility and convenience to your users.',
      image: '/assets/images/icons/smartphone.svg',
      highlight: true
    },
    {
      title: 'Secure and Reliable',
      desc: 'Facilitate secure and seamless payment transactions within your platform, ensuring a smooth booking experience for your users.',
      image: '/assets/images/icons/clock.svg'
    },
  ]
}

const BBPSPage = () => {
  return (
    <>
      <PageHero
        titles={content.hero.titles}
        image={content.hero.image}
        desc={content.hero.desc}
        extra={<div className='mt-10'><Link href="contact"><Button variant={'glow'} size={'lg'}>Contact Us</Button></Link></div>}
      />

      <Section
        sectionTitle='Bharat Bill Payment System'
        sectionDesc={`Our BBPS solution offers seamless integration options, allowing businesses to integrate bill payment services into their existing platforms or applications with ease. We provide flexible customization options to match your branding and interface requirements, ensuring a seamless and consistent user experience.`}
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
                <h2 className='mb-3 text-3xl font-medium'>Introducing BBPS (Bharat Bill Payment System)</h2>
                <p className='text-gray-500'>{`We at NKPays provide the Bharat Bill Payment System API with 24*7 auto-billing Bharat Bill Payment System is a Reserve Bank of India (RBI)-conceptualized ecosystem driven by the National Payments Corporation of India (NPCI). It is an integrated bill payment system in India that offers an interoperable and accessible bill payment service to customers through a network of agents registered as "agent institutions," enables multiple payment modes, and provides instant confirmation of payment. It also offers an interoperable and accessible "Anytime Anywhere" recurring payment service to all customers across India with certainty, reliability, and safety of transactions.`}</p>
              </div>
            </div>

            <div className='aspect-video relative '>
              <Image className='object-contain' alt="What-is-bbps-api" src="/assets/images/bbps.png" fill />
            </div>
          </div>
        </Section>

        <section className=''>
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
            <div>
              <Image alt="What-is-AEPS" src="/assets/images/benefits.jpg" width={500} height={500} />
            </div>
            <div>
              <div className="max-w-lg">
                <h2 className='mb-3 text-3xl font-medium'> Key Features and Benefits</h2>
                <ul className='text-gray-500 mt-4'>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span> Integrate with a diverse range of billers across different categories, including utility bills, telecom bills, insurance premiums, education fees, and more.</span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>Offer multiple payment modes such as net banking, debit cards, credit cards, UPI, and mobile wallets to provide flexibility and convenience to your users.</span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>Enable users to view their bills, receive timely reminders, and stay informed about upcoming due dates, ensuring a hassle-free bill payment experience.</span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>Our BBPS solution adheres to industry security standards, ensuring the confidentiality and integrity of user data. </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                    <span>{`Gain valuable insights into customer behavior, payment patterns, and trends through comprehensive reporting and analytics, helping you make informed business decisions.`}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className=''>
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">

            <div>
              <div className="max-w-lg">
                <h2 className='mb-3 text-3xl font-medium'> BBPS Partners</h2>
                <p className='text-gray-500'>{`At MKPays, we understand the value of being an authorized BBPS partner. Once you become a listed partner, you open doors to a multitude of benefits for both your business and your customers. By offering the convenience of hassle-free bill payments through BBPS, you can enhance your customers' experience and build trust in your brand. BBPS provides a robust platform for you to establish and nurture healthy customer relationships, while also expanding your business network.`}</p>
              </div>
            </div>
            <div>
              <Image alt="bbps-partners" src="/assets/images/tb-3.jpg" width={500} height={500} />
            </div>
          </div>
        </section>
        <section className=''>
          <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
            <div>
              <Image alt="What-is-AEPS" src="/assets/images/bbps-3.jpg" width={500} height={500} />
            </div>
            <div>
              <div className="max-w-lg">
                <h2 className='mb-3 text-3xl font-medium'>Billers</h2>
                <p className='text-gray-500'>{`Gone are the days of chasing after bills and dealing with manual payment processes. With BBPS, you can streamline your bill collection and stay on top of all payments effortlessly. Our comprehensive BBPS platform enables you to collect bills from a wide range of billers, covering various categories. This ensures that you have access to a diverse set of payment options, meeting the needs of your customers effectively. By utilizing BBPS, you can offer a wider reach through different channels of payment, making it convenient for your customers to settle their bills. This enhanced accessibility not only simplifies their lives but also earns their trust in your services.`}</p>
              </div>
            </div>

          </div>
        </section>
      </article>


      <DownloadAppSection />
      <ContactSection />
    </>
  )
}

export default BBPSPage