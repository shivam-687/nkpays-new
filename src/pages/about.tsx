import Section from '@/components/shared/Section'
import React from 'react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { Fade } from 'react-awesome-reveal'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import LogoCarousel from '@/components/shared/LogoCarousel'
import ContactSection from '@/components/landing-page/ContactSection'
import InfoCard from '@/components/shared/InfoCard'
import { NextSeo } from 'next-seo'
import { env } from '@/env.mjs'


const content = {
    about: [
        `NKPays is a trusted provider of comprehensive insurance solutions, dedicated to serving individuals and businesses with integrity and excellence. With a strong focus on customer satisfaction, we aim to be the preferred choice for all insurance needs.`,
        `With a wide range of insurance services, NKPays offers customized solutions designed to protect our clients' assets and mitigate risks. Our team of experienced professionals works diligently to assess the unique needs of each client, providing tailored coverage options and personalized service.`,
        `At NKPays, we pride ourselves on our commitment to excellence and continuous innovation. We stay updated with the latest industry trends and technologies to ensure that our clients receive the best possible insurance solutions. Our team undergoes regular training and development programs to stay knowledgeable and equipped to handle complex insurance requirements.`,
        `As a client-centric company, we prioritize transparency and open communication. We believe in educating our clients about their insurance options, helping them make informed decisions that align with their specific needs and budget. Our dedicated support team is always available to address queries and provide timely assistance throughout the insurance process.`,

    ],

    info: [
        {
            title: 'Comprehensive Coverage',
            desc: 'We offer a wide range of insurance products that span various sectors, including automobile, homeowners, travel, health, and more. ',
            image: '/assets/images/icons/art-and-design.svg'
        },
        {
            title: 'Personalized Service',
            desc: 'We believe in building strong relationships with our clients. Our dedicated team takes the time to understand their individual needs and goals, offering personalized service and guidance throughout the insurance process. ',
            image: '/assets/images/icons/smartphone.svg',
            highlight: true
        },
        {
            title: 'Trusted Partnerships',
            desc: 'We have established strong partnerships with reputable insurance providers, enabling us to offer our clients trusted and reliable insurance policies. ',
            image: '/assets/images/icons/clock.svg'
        },
    ],

    whatwedo: [
        {
            title: 'Our Mission',
            desc: 'Driven by a passion for innovation, our mission is to empower individuals and businesses by providing user-friendly, reliable, and secure solutions that simplify everyday transactions.'
        },
        {
            title: 'Our Values',
            desc: 'At the core of our operations are our values of integrity, customer-centricity, and continuous improvement. We strive to build strong relationships with our customers and deliver excellence in all that we do.'
        },
        {
            title: 'Our Team',
            desc: 'Our dedicated team of experienced professionals is committed to delivering the highest standards of service. With diverse expertise and a customer-first approach, we work together to meet your needs and exceed expectations.'
        },
    ]
}

const AboutPage = () => {

    const title = '';
  const desc = ''; 
  
    return (
        <>
        <NextSeo
        title={title}
        description={desc}
        openGraph={{
          title: title,
          description: desc,
          url: env.NEXT_PUBLIC_SITE_URL,
          images: []
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
            <section className='h-64 bg-primary/30  relative'>
                <div className='grid place-content-center z-20 backdrop-blur-lg w-full h-full'><h1 className='text-6xl font-bold'>About Us</h1></div>

                <div className='w-20 h-20 rounded-full top-10 left-20 absolute bg-primary -z-20' style={{}}></div>
                <div className='w-20 h-20 rounded-full top-20 right-1/2 absolute bg-primary -z-20' style={{}}></div>
                <div className='w-20 h-20 rounded-full left-1/3 bottom-0 absolute bg-primary -z-20' style={{}}></div>


            </section>
            <Section>
                <div className='mx-auto max-w-6xl px-4 space-y-5'>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        <div className="rounded-xl text-muted-foreground font-medium leading-relaxed space-y-5 text-lg col-auto md:col-span-2">
                            {
                                content.about.map(text => {
                                    return <p key={nanoid()} className=''>{text}</p>
                                })
                            }
                        </div>

                        <div className="rounded-xl overflow-hidden">
                            <Image src="/assets/images/Image-1-About-Us (1).png" alt={'Why Nkpays'} width={750} height={1393} />
                        </div>
                    </div>
                </div>

            </Section>
            <Section
                sectionTitle='What We Do'
                sectionDesc={`At NKPays, we specialize in providing comprehensive insurance solutions that offer complete protection and peace of mind. With a wide range of insurance services tailored to meet individual and business needs, we strive to ensure that our clients have the coverage they need when it matters most.`}
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

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10 container items-center">
                    <div><Image alt="" width={700} height={522} src={'/assets/images/about-illus.png'} /></div>
                    <div className='max-w-lg space-y-5'>
                        {
                            content.whatwedo.map((w, index) => {
                                return (
                                    <div key={nanoid()} className='overflow-hidden'>
                                        <Fade delay={100 * (index + 1)} className='space-y-2'>
                                            <h2 className='text-2xl font-medium'>{w.title}</h2>
                                            <p className='text-muted-foreground'>{w.desc}</p>
                                        </Fade>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Section>


            <div className="mt-20">
                <LogoCarousel />
                <DownloadAppSection />
            </div>
            <ContactSection />
        </>
    )
}

export default AboutPage