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


export type ProductEnquiryDrawerProps = {
    trigger?: ReactElement,
    query: ProductEnquiryListItem
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

const ProductEnquiryDrawer = ({
    trigger,
    query
}: ProductEnquiryDrawerProps) => {
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
                                <InfoSec title="Name">{query.name}</InfoSec>
                                <InfoSec title="Email">{query.email}</InfoSec>
                                <InfoSec title="Phone">{query.phone}</InfoSec>
                                <InfoSec title="Product">
                                    <div className='flex items-center gap-10'>
                                        <div className=' flex items-center gap-3 text-lg font-medium'>
                                            <Avatar>
                                                <AvatarImage src={query.product.thumbnail || ''}></AvatarImage>
                                            </Avatar>
                                            <span>{query.product.title}</span>
                                        </div>
                                        <Link className='font-medium hover:underline ' href={`admin/product/${query.productId}`}>View Product</Link>
                                    </div>
                                </InfoSec>
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

export default ProductEnquiryDrawer