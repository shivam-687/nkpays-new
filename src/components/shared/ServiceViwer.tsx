import React, { useContext, useEffect, useState } from 'react'
import { ServiceViwerContext, ServiceViwerContextProvider, type ServiceViwerItem, type ServiceViwerItemContentObject } from '@/context/ServiceViwerContext'
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link';
import { Button } from '../ui/button';

// LIST ITEM

const ListItem = ({
    title,
    id,
    onItemClick
}: {
    title: string,
    id: string,
    onItemClick?: (id: string) => void
}) => {

    const { currentActiveItem, setCurrentActiveItem } = useContext(ServiceViwerContext);

    return (
        <div
            className={cn(
                'p-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white flex items-center justify-between transition-all mb-2 ',
                { 'bg-primary text-primary-foreground shadow-lg shadow-primary/30': currentActiveItem && currentActiveItem.id === id }
            )}
            onClick={() => onItemClick?.(id)}
        >
            <span>{title}</span>
            <span><ChevronRight className='w-4 h-4' /></span>
        </div>
    )
}




const List = ({
    items
}: { items: ServiceViwerItem[] }) => {

    const { currentActiveItem, setCurrentActiveItem } = useContext(ServiceViwerContext);

    const setItem = (id: string) => {
        const ci = items.find(d => d.id === id);
        setCurrentActiveItem(ci);
    }

    useEffect(() => {
        if (!currentActiveItem && items.length > 0) {
            setCurrentActiveItem(items[0])
        }
    }, [])
    return (
        <div className='max-w-lg rounded-lg shadow p-4'>
            {
                items.map(item => {
                    return <ListItem {...item} key={nanoid()} onItemClick={setItem} />
                })
            }
        </div>
    )
}

const ServiceContent = ({
    title,
    desc,
    link,
    image
}: {
    title: string,
    desc: string,
    link?: string,
    image?: string
}) => {

    return (
        <div className="grid grid-col-1 lg:grid-cols-2 gap-5 items-center  ">
            <div className=''>
                <h3 className='text-3xl lg:text-4xl mb-3 font-bold' >{title}</h3>
                <p className='mb-5'>{desc}</p>

                {
                    link && <Link href={link} className=''>
                        <Button variant={'outline'}><span className='m-2'>Learn More</span> <ChevronRight className='w-4 h-4' /></Button>
                    </Link>
                }
            </div>

            <div className='bg-contain bg-center bg-no-repeat aspect-square ' style={{ backgroundImage: `url(${image || ''})` }}></div>
        </div>
    )
}

const serviceItems: ServiceViwerItem[] = [
    {
        title: 'Aeps Service',
        id: 'aeps',
        content: <ServiceContent
            title='Aadhaar Enabled Payment System'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
    {
        title: 'BBPS Service',
        id: 'bbps',
        content: <ServiceContent
            title='Bharat Bill Payment System'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
    {
        title: 'DTH Recharge',
        id: 'dth',
        content: <ServiceContent
            title='DTH Reacharge'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
    {
        title: 'Mobile Recharge',
        id: 'mobile',
        content: <ServiceContent
            title='Mobile Recharge'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
    {
        title: 'Travel Booking',
        id: 'tavel',
        content: <ServiceContent
            title='Travel Booking'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
    {
        title: 'General Insurance',
        id: 'general',
        content: <ServiceContent
            title='General Insurance'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
    {
        title: 'Domestic Money Transfer',
        id: 'dmt',
        content: <ServiceContent
            title='Domestic Money Transfer'
            desc='Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.'
            link="#"
            image={'/assets/images/aeps-illus.jpg'}
        />
    },
]



const ServiceViwerContent = () => {
    const { currentActiveItem } = useContext(ServiceViwerContext)
    const [parent, enableAnimations] = useAutoAnimate({
        duration: 300
    })
    const [items, setItems] = useState<ServiceViwerItem[]>([])

    useEffect(() => {
        if (currentActiveItem) {
            setItems(prev => [currentActiveItem])
        }
    }, [currentActiveItem])

    return (
        <>
            <div ref={parent}>
                {
                    items.map(it => {
                        return <div key={nanoid()}>{
                            React.isValidElement(it.content) && it.content
                        }</div>
                    })
                }
            </div>
        </>
    )
}

const ServiceViwer = () => {

    return (
        <ServiceViwerContextProvider>
            <div className="grid grid-col-1 md:grid-cols-3 gap-3">
                <div className="">
                    <List items={serviceItems} />
                </div>
                <div className=" col-auto md:col-start-2 md:col-span-3 ">
                    <div className="rounded-xl shadow bg-white px-4 py-10 lg:p-5">
                        <ServiceViwerContent />
                    </div>
                </div>
            </div>
        </ServiceViwerContextProvider>
    )
}

export default ServiceViwer