import React from 'react'
import ContactForm from '../shared/ContactForm'
import { GraduationCap } from 'lucide-react'
import { BookOpen } from 'lucide-react'
import { User } from 'lucide-react'
import { Languages } from 'lucide-react'

const ContactSection = () => {
    return (
        <section className='px-4 py-16 bg-center bg-cover bg-no-repeat bg-primary/30 relative z-10' style={{ backgroundImage: `url(/assets/images/contact.jpg)` }}>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>
            <div className=' grid grid-cols-1 md:grid-cols-3 items-center container mx-auto gap-10 z-40'>
                <div><ContactForm /></div>
                <div className='md:col-start-2 md:col-end-4 col-auto space-y-5 text-primary-foreground'>

                    <div className="max-w-lg">
                        <h3 className='text-3xl md:text-4xl'>NKPays</h3>
                        <p>{`Become a part of the fastest growing network of Independent Business Owners and become financially independent.`}</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        <div className='max-w-[150px]'>
                            <div className='my-4'><GraduationCap className='w-10 h-10 ' /></div>
                            <div className="">
                                <h3 className='text-2xl font-medium'>500+</h3>
                                <p>Districts Covered</p>
                            </div>
                        </div>
                        <div className='max-w-[150px]'>
                            <div className='my-4'><BookOpen className='w-10 h-10' /></div>
                            <div className="">
                                <h3 className='text-2xl font-medium'>1 Lac+</h3>
                                <p>Retail Touch Points</p>
                            </div>
                        </div>
                        <div className='max-w-[150px]'>
                            <div className='my-4'><User className='w-10 h-10' /></div>
                            <div className="">
                                <h3 className='text-2xl font-medium'>10 Lac+</h3>
                                <p>Monthly Unique Customers</p>
                            </div>
                        </div>
                        <div className='max-w-[150px]'>
                            <div className='my-4'><Languages className='w-10 h-10' /></div>
                            <div className="">
                                <h3 className='text-2xl font-medium'>15Cr+</h3>
                                <p>Daily Transaction Volume</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </section>
    )
}

export default ContactSection