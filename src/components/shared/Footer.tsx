import React, { type PropsWithChildren } from 'react'
import Logo from './Logo'
import { ChevronRight, FacebookIcon, Instagram, Linkedin, TwitterIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'


const FooterSection = ({title, children}: PropsWithChildren<{title: string}>) => {
    return (
        <div>
            <h4 className='font-bold text-primary-foreground mb-4'>{title}</h4>
            <div>{children}</div>
        </div>
    )
}

const Footer = () => {
    const socialLink = [
        {
            icon: <FacebookIcon className='w-6 h-6 '/>,
            link: 'https://www.facebook.com/nkpays/',
            name: 'facbook'
        },
        {
            icon: <TwitterIcon className='w-6 h-6 '/>,
            link: 'https://twitter.com/NKPAYS',
            name: 'twitter'
        },
        {
            icon: <Linkedin className='w-6 h-6 '/>,
            link: 'https://www.instagram.com/nkpayspvtltd/',
            name: 'linkedin'
        },
        {
            icon: <Instagram className='w-6 h-6'/>,
            link: 'https://www.linkedin.com/in/nkpayspvtltd/',
            name: 'instagram'
        },
    ];

    const quickLinks = [
        {
            lable: 'Home',
            link: '/'
        },
        {
            lable: 'About Us',
            link: '/about'
        },
        {
            lable: 'Contact Us',
            link: '/contact'
        },
        {
            lable: 'Services',
            link: '/shop'
        },
        {
            lable: 'Shop',
            link: '/shop'
        },
    ]
    const legals = [
        {
            lable: 'Privacy Policy',
            link: '/privacy-policy'
        },
        {
            lable: 'Terms & Conditions',
            link: '/terms-and-conditions'
        },
        {
            lable: 'Refund Policy',
            link: 'refund-policy'
        }
    ]
  return (
    <footer className='px-4 py-10 bg-black text-white'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            <div className='space-y-2 max-w-xs'>
                <Logo/>
                <p>Simplify transactions with NKPays – your trusted partner for seamless payments and services.</p>

                <div className='flex gap-2'>
                    {
                        socialLink.map(sc => {
                            return <a href={sc.link} key={nanoid()} className='rounded-lg border border-primary hover:bg-primary text-primary hover:text-primary-foreground transition-all p-1'>{sc.icon}</a>
                        })
                    }
                </div>
            </div>

            <div className='grid grid-cols-2 w-full'>
                <FooterSection title="Quick Links">
                    {
                        quickLinks.map(ql => {
                            return <Link className='text-gray-400 hover:text-gray-200 transition-all flex items-center gap-2' href={ql.link} key={nanoid()}>
                                <span><ChevronRight/></span>
                                <span className='text-sm'>{ql.lable}</span>
                                </Link>
                        })
                    }
                </FooterSection>
                <FooterSection title="Legal Links">
                    {
                        legals.map(ql => {
                            return <Link className='text-gray-400 hover:text-gray-200 transition-all flex items-center gap-2' href={ql.link} key={nanoid()}>
                                <span><ChevronRight/></span>
                                <span className='text-sm'>{ql.lable}</span>
                                </Link>
                        })
                    }
                </FooterSection>
            </div>

            <div>
                <FooterSection title='Address'>
                    <div className="spac-y-2 text-sm text-gray-400">
                    <p className='font-semibold'>NK Pays</p>
                    <p className='text-gray-400 max-w-xs'>Titabar Na Ali, Opst Titabar Public Club, Jorhat, Assam- 785630</p>
                    <p className='font-semibold'>snkpays@gmail.com</p>
                    <p className='font-semibold'>+91-6003884457</p>
                    </div>
                </FooterSection>
            </div>
        </div>
    </footer>
  )
}

export default Footer