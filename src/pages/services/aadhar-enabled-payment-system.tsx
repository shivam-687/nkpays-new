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
            'Aadhar Enabled Payment',
            'System (AEPS Services)'
        ],
        desc: 'NKPays has integrated with all the available banks to enable cash withdrawal and other AEPS services for all its partners.',
        image: '/assets/images/AEPS-hero-img.png'
    },
    info: [
        {
            title: 'Balance Inquiry',
            desc: 'AEPS Agent can check the balance of the customer simply in less than a minute by using Biznext portal or mobile application. We have the best mobile App to do AEPS.',
            image: '/assets/images/icons/art-and-design.svg'
        },
        {
            title: 'Balance Inquiry',
            desc: 'AEPS Agent can check the balance of the customer simply in less than a minute by using Biznext portal or mobile application. We have the best mobile App to do AEPS.',
            image: '/assets/images/icons/smartphone.svg',
            highlight: true
        },
        {
            title: 'Balance Inquiry',
            desc: 'AEPS Agent can check the balance of the customer simply in less than a minute by using Biznext portal or mobile application. We have the best mobile App to do AEPS.',
            image: '/assets/images/icons/clock.svg'
        },
    ]
}

const AepsPage = () => {
    return (
        <>
            <PageHero
                titles={content.hero.titles}
                image={content.hero.image}
                desc={content.hero.desc}
                extra={<div className='mt-10'><Link href="contact"><Button variant={'glow'} size={'lg'}>Contact Us</Button></Link></div>}
            />

            <Section
                sectionTitle='AEPS Services in NKPays'
                sectionDesc={`Customers can visit their nearest Biznext AEPS agent and do all these transactions using only their Aadhaar Number and Biometric Authentication.`}
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
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4">
                    <div>
                        <div className="max-w-lg">
                            <h2 className='mb-3 text-3xl font-medium'>What is AEPS?</h2>
                            <p className='text-gray-500'>Aadhaar Enabled Payment System(AEPS Service), is an Aadhaar based payment solution which empowers bank users to carry out financial transactions (without any debit card/credit card/ cheque book) using only their Aadhaar card, registered with their bank account, and biometric authentication. AEPS agents and distributors can provide basic banking services to their customers such as cash withdrawal, balance inquiry and obtaining a mini statement. It is an initiative by NPCI (National Payments Corporation of India) to support unbanked and underbanked sections of India.</p>
                            <p className='text-gray-500'>At Biznext, we not only add the AEPS Agent or AEPS Distributor to our network, but also take steps to guide them in earning more. Anyone can join our network with a simple AEPS Agent registration form that needs to be filled.</p>
                        </div>
                    </div>

                    <div>
                        <Image alt="What-is-AEPS" src="/assets/images/What-is-AEPS.png" width={500} height={500} />
                    </div>
                </div>
            </Section>
            <section className='py-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
                    <div>
                        <Image alt="What-is-AEPS" src="/assets/images/How-does-it-work.png" width={500} height={500} />
                    </div>
                    <div>
                        <div className="max-w-lg">
                            <h2 className='mb-3 text-3xl font-medium'>How Does It Works?</h2>
                            <p className='text-gray-500'>Once the AEPS Agent registration is done, your NKPays AEPS Agent login id will be generated. The process of AEPS is very simple.</p>
                            <ul className='text-gray-500 mt-4'>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>The AEPS Agent connects and installs a biometric device to their Computer or Smart phone.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Agent inputs the Customer Aadhaar number and the bank name.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Agent selects the transaction type: Cash withdrawal or Balance Inquiry.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>The customer then inputs their thumb print (same as per Aadhaar) to authenticate the transaction.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>The customer’s account is debited and merchant’s NKPays wallet account is credited real time along with additional commission amount.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>The AEPS Agent then receives a transaction receipt and customer receives an SMS confirmation from bank.</span>
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
                            <h2 className='mb-3 text-3xl font-medium'>Top Features</h2>
                           
                            <ul className='text-gray-500 mt-4'>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Real Time Transaction Settlement along with commission.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Safe & Secure system.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>No need to carry a Debit or Credit card, Only the Aadhaar number and fingerprint authentication required.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Easily withdraw money, avoid long queues at the bank or ATM.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>{`Quick process, doesn't take more than a minute to complete a transaction.`}</span>
                                </li>
                                
                            </ul>
                        </div>
                    </div>

                    <div>
                        <Image alt="What-is-AEPS" src="/assets/images/top-feature-AEPS.png" width={500} height={500} />
                    </div>
                </div>
            </section>
            <section className='py-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center items-center">
                <div>
                        <Image alt="What-is-AEPS" src="/assets/images/Benefits-to-AEPS-Agents.png" width={500} height={500} />
                    </div>
                    <div>
                        <div className="max-w-lg">
                            <h2 className='mb-3 text-3xl font-medium'>Benefits to AEPS agent</h2>
                           
                            <ul className='text-gray-500 mt-4'>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Minimum Investment with Maximum Return.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Only requirements to set up business, are a Smart phone or Computer (as per ease and availability) & Biometric Device.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Earn Attractive Commission per transaction.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Quick process, takes less than a minute to complete the transaction.</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>{`Full utilisation of cash in hand.`}</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>{`Increase in customer base due to additional service provided.`}</span>
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
                            <h2 className='mb-3 text-3xl font-medium'>Acivation Process</h2>
                            <p className='text-gray-500'>Any new or existing business partner can do AEPS free portal registration with a simple documentation process. All you need to do is to submit your PAN Card and Aadhar Card and fill the Aadhar Enable Payment System / Aeps registration form. Earn a handsome income on every transaction!</p>
                            <p className='text-gray-500'>Things required to start AEPS Business?</p>
                            <ul className='text-gray-500 mt-4'>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Smart Phone or Computer with an active internet connection</span>
                                </li>
                                <li className='flex items-center gap-3'>
                                    <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                    <span>Biometric Device</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <Image alt="What-is-AEPS" src="/assets/images/deal-hend.svg" width={500} height={500} />
                    </div>
                </div>
            </section>

            <DownloadAppSection/>
            <ContactSection/>
        </>
    )
}

export default AepsPage