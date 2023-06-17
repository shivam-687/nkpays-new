import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import Section from '../shared/Section'
import { Fade } from 'react-awesome-reveal'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { ChevronRightIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'


type OppData = {
    id: string,
    label: string
    content: {
        title: string,
        desc: string,
        benefitList: string[],
        image: string,
        link: string
    },
}

const OppButton = ({
    isActive = false,
    className,
    children,
    ...props
}: {
    isActive: boolean,
} & React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <div
            className={cn([
                'px-6 py-3 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-200',
                { 'bg-primary text-primary-foreground hover:bg-primary shadow-lg shadow-primary/30': isActive },
                className
            ])}
            {...props}
        >
            {children}
        </div>
    )
}


const OppButtonList = ({ data = [], onSelect, active }: { data: OppData[], active?: OppData, onSelect?: (data: OppData) => void }) => {

    useEffect(() => {
        if (!active && data.length > 0) {
            onSelect?.(data[0]!)
        }
    }, [])
    return (
        <div className='bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-3 '>
            {
                data.map(d => {
                    return <OppButton onClick={() => onSelect?.(d)} isActive={active && active.id === d.id || false} key={d.id}>{d.label}</OppButton>
                })
            }
        </div>
    )
}


const OppContent = ({
    title,
    link,
    desc,
    benefitList,
    image
}: {
    title: string,
    link: string,
    desc: string,
    benefitList: string[],
    image: string
}) => {
    return (

        <div className="grid grid-1 md:grid-cols-2 gap-5 items-center">
            <div className='w-full'>
                <Image src={image} alt={title} width={500} height={500} />
            </div>

            <div>
                <h3 className='text-2xl font-medium'>{title}</h3>

                <div className='mt-5'>
                    <p>{desc}</p>

                    <ul className='list-none mt-5' >
                        {
                            benefitList.map((bn, index) => {
                                return <li key={nanoid()} className='overflow-hidden'>
                                    <div className='flex gap-3 font-medium'>
                                        <span><ChevronRightIcon className='text-primary w-6 h-6' /></span>
                                        <span>{bn}</span>
                                    </div>
                                </li>
                            })
                        }
                    </ul>

                    <div className='mt-6'>
                        <Link href={link}><Button variant={'glow'} className="flex w-full md:inline-flex md:w-auto" size={'lg'}>Login</Button></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}


const OppContentList: OppData[] = [
    {
        id: 'retailer',
        label: 'Retailer',
        content: {
            title: `Join NKPays as a Retailer`,
            desc: `More than 1 lac retailers across India have joined Biznext and offer financial and digital commerce services to their customers and earn commission. The most unique feature of this platform is single wallet - multiple services with unlimited income opportunity.`,
            benefitList: [
                'Become Aatmanirbhar & Earn Up-To 50000 every month',
                'Completely Free Zero Charge Activation of All the Services',
                'Earn Real Time Commission on Every Transaction',
                'One Android Application with All the Services',
                'Most Advanced & Secured Platform for Transactions',
                'Complete Reports & Dedicated Support Team'
            ],
            link: '#',
            image: '/assets/images/retailer-img.png',
        },

    },
    {
        id: 'distributer',
        label: 'Distributer',
        content: {
            title: `Distributer`,
            desc: `More than 1 lac retailers across India have joined Biznext and offer financial and digital commerce services to their customers and earn commission. The most unique feature of this platform is single wallet - multiple services with unlimited income opportunity.`,
            benefitList: [
                'Become Aatmanirbhar & Earn Up-To 50000 every month',
                'Completely Free Zero Charge Activation of All the Services',
                'Earn Real Time Commission on Every Transaction',
                'One Android Application with All the Services',
                'Most Advanced & Secured Platform for Transactions',
                'Complete Reports & Dedicated Support Team'
            ],
            link: '#',
            image: '/assets/images/distrubter-img.png',
        },
    },
    {
        id: 'api&whitelable_partner',
        label: 'API & Whitelable Partner',
        content: {
            title: `API & Whitelable Partner`,
            desc: `More than 1 lac retailers across India have joined Biznext and offer financial and digital commerce services to their customers and earn commission. The most unique feature of this platform is single wallet - multiple services with unlimited income opportunity.`,
            benefitList: [
                'Become Aatmanirbhar & Earn Up-To 50000 every month',
                'Completely Free Zero Charge Activation of All the Services',
                'Earn Real Time Commission on Every Transaction',
                'One Android Application with All the Services',
                'Most Advanced & Secured Platform for Transactions',
                'Complete Reports & Dedicated Support Team'
            ],
            link: '#',
            image: '/assets/images/api-partner.png',
        },
    },
]


const Opportunities = () => {
    const [activeItem, setActive] = useState<OppData>()
    const [list, setList] = useState<OppData[]>([])

    useEffect(() => {
        if (activeItem) {
            setList(prev => [activeItem])
        }
    }, [activeItem])

    return (
        <Section sectionTitle='NKPays Business Opportunities'>
            <div className="flex items-center justify-center">
                <div className="w-full md:w-auto"><OppButtonList onSelect={(data) => setActive(data)} active={activeItem} data={OppContentList} /></div>
            </div>

            <Fade delay={300} className='p-4 mt-10'>
                {
                    list.map(l => {
                        return <OppContent {...l.content} key={nanoid()} />
                    })
                }
            </Fade>
        </Section>
    )
}

export default Opportunities