import React, { PropsWithChildren, ReactElement, useState } from 'react'
import Drawer from 'react-modern-drawer';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { ProductEnquiryListItem } from '@/schema/productEnquiry';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import { formateDate } from '@/lib/utils';
import { ContactQuery } from '@prisma/client';


export type ContactQueryDrawerProps = {
    trigger?: ReactElement,
    query: ContactQuery
}


export const InfoSec = ({
    title,
    children
}: PropsWithChildren<{ title: string }>) => {
    return (
        <div className='mb-3'>
            <p className='text-lg text-muted-foreground font-medium capitalize'>{title}</p>
            <Separator />
            <div className='py-2'>
                {children}
            </div>
        </div>
    )
}

const ContactQueryDrawer = ({
    trigger,
    query
}: ContactQueryDrawerProps) => {
    const [open, setOpen] = useState(false)

    const close = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <>

            {
                trigger
                    ?
                    React.cloneElement(trigger, {
                        onClick: handleOpen
                    })
                    :
                    <Button onClick={handleOpen} variant={'ghost'}>View</Button>
            }
            <Drawer
                open={open}
                onClose={close}
                direction='right'
                className='border border-primary  backdrop-blur bg-white/30'
                size={'60vw'}
            >
                <div className='p-4'>
                    <div className='flex items-center'>
                        <Button onClick={close} variant={'ghost'}><X /></Button>
                    </div>

                    <div className='mt-5'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Query Info</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InfoSec title="Name">{query.name}</InfoSec>
                                <InfoSec title="Email">{query.email}</InfoSec>
                                <InfoSec title="Phone">{query.phone}</InfoSec>
                                <InfoSec title="Message">
                                    <div className='max-w-lg'>
                                        <p>{query.message}</p>
                                    </div>
                                </InfoSec>
                                <InfoSec title="Date">
                                    <p>{formateDate(query.createdAt)}</p>
                                </InfoSec>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default ContactQueryDrawer