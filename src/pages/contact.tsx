import ContactForm from '@/components/shared/ContactForm'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import { Mail, Phone } from 'lucide-react'
import { nanoid } from 'nanoid'
import React from 'react'

export const ContactContent = {
    address: {
        title: 'NKPays Private Limited',
        addr: 'Head office No.02, Mezenga Gaon, PO: Purana Titbar, Titbar Jorhat Assam 785632',
        addr2: `NA Ali Titbar Ward No.02 Near Titbar Public Club, PO: Titbar PS Titbar Jorhat Assam IN 785630`
    },
    email: 'support@nkpays.co.in',
    phone: [
        '7099523164',
        '7099523169',
        '7099523173',
    ]
}

const ContactPage = () => {
    return (
        <>
            <div className='px-4 py-10 md:py-20 bg-primary/30'><h1 className='text-4xl text-center md:text-5xl font-bold'>Contact Us</h1></div>
            <section className='px-4 py-20'>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
                    <div><ContactForm /></div>
                    <div>
                        <h2 className='text-3xl md:text-4xl mb-5'>{ContactContent.address.title}</h2>
                        <p className='max-w-xs mb-3'>{ContactContent.address.addr}</p>
                        <div className='space-y-5'>
                            <div className='flex items-center gap-3'>
                                <div className='flex-grow-0'><Mail className='w-10 h-10' /></div>
                                <div className='flex-grow'>
                                    <p className='font-bold text-lg'>Email</p>
                                    <a className='text-primary' href={`mailto:${ContactContent.email}`}>{ContactContent.email}</a>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='flex-grow-0'><Phone className='w-10 h-10' /></div>
                                <div className='flex-grow'>
                                    <p className='font-bold text-lg'>Phone</p>
                                    <div className="space-y-1">
                                        {
                                            ContactContent.phone.map(phone => {
                                                return <a key={nanoid()} className='text-primary flex' href={`tel:${phone}`}>{phone}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center mt-20">
                    <div>
                        <h2 className='text-3xl md:text-4xl mb-5'>Branch Office</h2>
                        <p className='max-w-xs mb-3'>{ContactContent.address.addr2}</p>
                    </div>

                    <div className='aspect-square bg-primary/30 flex items-center justify-center text-6xl font-bold w-full'>Map</div>
                </div>

            </section>

            <DownloadAppSection/>
        </>
    )
}

export default ContactPage