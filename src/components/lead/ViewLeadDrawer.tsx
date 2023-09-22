/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { type PropsWithChildren, type ReactElement, useState } from 'react'
import Drawer from 'react-modern-drawer';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { formateDate } from '@/lib/utils';
import { type LeadData } from '@/schema/LeadSchema';


export type LeadDrawerProps = {
    trigger?: ReactElement,
    data: LeadData
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

const ViewLeadDrawer = ({
    trigger,
    data
}: LeadDrawerProps) => {
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
                                <CardTitle>Product Enquiry Info</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InfoSec title="Name">{data.name}</InfoSec>
                                <InfoSec title="Email">{data.email}</InfoSec>
                                <InfoSec title="Phone">{data.phone}</InfoSec>
                                <InfoSec title="Shop Name">{data.shopName}</InfoSec>
                                <InfoSec title="Aadhaar No.">{data.aadhaarNo}</InfoSec>
                                <InfoSec title="Pancard No.">{data.pancard}</InfoSec>
                                
                                <InfoSec title="Address">
                                    <div className='max-w-lg'>
                                        <p>{data.address}</p>
                                    </div>
                                </InfoSec>
                                <InfoSec title="Date">
                                    <p>{formateDate(data.createdAt!)}</p>
                                </InfoSec>

                                
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default ViewLeadDrawer