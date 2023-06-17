import Section from '@/components/shared/Section'
import React from 'react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { Fade } from 'react-awesome-reveal'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import LogoCarousel from '@/components/shared/LogoCarousel'


const content = {
    about: `At NKPays, we are dedicated to providing exceptional services and solutions that simplify your everyday transactions. With a strong focus on innovation, reliability, and customer satisfaction, we strive to be your trusted partner in navigating the ever-changing digital landscape. Our mission is to empower individuals and businesses by offering user-friendly platforms and secure payment solutions that streamline processes and enhance convenience.
    Integrity lies at the heart of our operations. We believe in conducting business with the utmost transparency, honesty, and ethical standards. Our customer-centric approach ensures that we consistently deliver personalized experiences, tailored to meet your unique needs. We value your trust and work tirelessly to exceed your expectations, building long-lasting relationships based on mutual respect and satisfaction.
    Our team comprises highly skilled professionals with extensive industry expertise. We are passionate about what we do and are committed to staying ahead of the curve in an ever-evolving digital landscape. Through continuous improvement and innovation, we strive to provide cutting-edge solutions that address your specific requirements. We understand the importance of staying connected and provide seamless platforms that make your transactions smooth, secure, and efficient.`,

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
  return (
    <Section>
        <div className='mx-auto max-w-xl px-4 space-y-5'>
            <h1 className='text-4xl md:text-5xl font-bold'>About Us</h1>

            <div className="rounded-xl border border-primary p-5">
            <p className='text-lg leading-relaxed  '>{content.about}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10 container items-center">
            <div><Image alt="" width={700} height={522} src={'/assets/images/about-illus.png'}/></div>
            <div className='max-w-lg space-y-5'>
                {
                    content.whatwedo.map((w, index) => {
                        return (
                            <div key={nanoid()} className='overflow-hidden'>
                                <Fade delay={100 * (index + 1)} className='space-y-1'>
                                    <h2 className='text-2xl font-bold'>{w.title}</h2>
                                    <p>{w.desc}</p>
                                </Fade>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <div className="mt-20">
            <LogoCarousel/>
            <DownloadAppSection/>
        </div>
    </Section>
  )
}

export default AboutPage