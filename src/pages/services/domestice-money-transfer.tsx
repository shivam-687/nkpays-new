import Section from '@/components/shared/Section'
import InfoGrid1 from '@/components/shared/page/InfoGrid1'
import PageHero from '@/components/shared/page/PageHero'
import { Button } from '@/components/ui/button'
import { Banknote, CheckCircle, DollarSign, Lock, LucideMonitor, SendIcon, Smartphone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import ContactSection from '@/components/landing-page/ContactSection'

const content = {
    hero: {
        titles: [
            'Domestice Money',
            'Transfer'
        ],
        desc: 'NKPays has introduced a Domestic Money Transfer Business opportunity for all its partners to assist customers who want to transfer money online to their near ones. This unique business model aims at helping the migrants, laborers, and underbanked population of India. Kick start your own agency to provide money remittance service to customers with NKPays to give a boost to your earnings.',
        image: '/assets/images/AEPS-hero-img.png'
    },
    info: [
        {
            title: 'Cash to Bank',
            desc: 'The sender need not have a bank account, just an active mobile number to do a transaction.',
            icon: <Banknote />
        },
        {
            title: 'High Limit',
            desc: 'A customer can transfer up to Rs.25,000 per month using a single unique phone number.',
            icon: <LucideMonitor />
        },
        {
            title: 'Instant Transfer',
            desc: 'Transfer money online to any bank account in the country 24/7, irrespective of banking hours.',
            icon: <SendIcon />
        },
        {
            title: 'Confirmation SMS',
            desc: 'Immediate confirmation to sender via SMS as soon as the transaction is successfully completed',
            icon: <Smartphone />
        },
        {
            title: 'Fully Secured',
            desc: 'Multiple security measures in place to ensure complete safety from start to end of transaction.',
            icon: <Lock />
        },
        {
            title: 'High Commission',
            desc: 'Get best commission in the industry on every transaction and that too real time in the wallet.',
            icon: <DollarSign />
        },
    ]
}

const DMTServicePage = () => {
    return (
        <>
            <PageHero
                titles={content.hero.titles}
                image={content.hero.image}
                desc={content.hero.desc}
                extra={<div className='mt-10'><Link href="contact"><Button variant={'glow'} size={'lg'}>Contact Us</Button></Link></div>}
            />

            <Section
                sectionTitle='Domestic Money Transfer Service'
                sectionDesc={`Money Transfer is easy to start business. All you need to do is to Sign up to NKPays by uploading KYC. After verification is completed, retailers can activate a Domestic Money Transfer Business free of cost.The service has numerous benefits which makes it a win-win for retailers as well as customers.`}
            >
                <div className='container mx-auto mt-20'>
                    <InfoGrid1 items={content.info} />
                </div>
            </Section>

            <article className='mx-auto max-w-6xl'>
            <section className='py-20 bg-primary/10'>
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
                    <div className='aspect-video relative'>
                        <Image alt="What-is-AEPS" src="/assets/images/Money-Transfer-2.png" width={500} height={500} />
                    </div>
                    <div>
                        <div className="max-w-lg ">
                            <h2 className='mb-3 text-3xl font-medium'>Benefits of starting your <span className='text-primary'>online Money Transfer</span> business</h2>
                            <div className='text-muted-foreground'>
                                <p className=''>Once the AEPS Agent registration is done, your NKPays AEPS Agent login id will be generated. The process of AEPS is very simple.</p>
                                <ul className=' mt-4 space-y-4'>
                                    <li className='flex  gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Instant and real-time commission on every transaction.</span>
                                    </li>
                                    <li className='flex  gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Great Income opportunity without any investment as Money Transfer Distributor.</span>
                                    </li>
                                    <li className='flex gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Money remittance service will attract more customers to your outlet by improving your service portfolio.</span>
                                    </li>
                                    <li className='flex  gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Save time conduct transactions through Biznext Mobile App or Web Portal.</span>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-10 '>
                <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
                    
                    <div>
                        <div className="max-w-lg ">
                            <h2 className='mb-3 text-3xl font-medium'>Benefits of starting your <span className='text-primary'>Why</span> NKPays</h2>
                            <div className='text-muted-foreground'>
                                <p className=''>Once the AEPS Agent registration is done, your NKPays AEPS Agent login id will be generated. The process of AEPS is very simple.</p>
                                <ul className=' mt-4 space-y-4'>
                                    <li className='flex  gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Instant and real-time commission on every transaction.</span>
                                    </li>
                                    <li className='flex  gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Great Income opportunity without any investment as Money Transfer Distributor.</span>
                                    </li>
                                    <li className='flex gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Money remittance service will attract more customers to your outlet by improving your service portfolio.</span>
                                    </li>
                                    <li className='flex  gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <span>Save time conduct transactions through Biznext Mobile App or Web Portal.</span>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='aspect-video relative'>
                        <Image alt="Why Nkpays?" src="/assets/images/why-nkpays.png" width={500} height={500} />
                    </div>
                </div>
            </section>

            </article>

            <DownloadAppSection/>
            <ContactSection/>
        </>
    )
}

export default DMTServicePage