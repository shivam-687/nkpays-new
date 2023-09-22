/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'
import type { InferGetServerSidePropsType,GetServerSidePropsContext } from 'next'
import { api } from '@/utils/api';
import { PaginateOptions } from 'prisma-pagination';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ClientLeadForm from '@/components/lead/LeadForm';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    const { id } = context.query;

    if (typeof id !== 'string') {
        return {
            notFound: true
        }
    }

    if (isNaN(parseInt(id))) {
        return {
            notFound: true
        }
    }
    return { props: { id } }
}

const SelectePlan = ({
    id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data, isLoading } = api.plans.getById.useQuery({ id: parseInt(id) });
    const router = useRouter()

    if (!data && !isLoading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <h1 className='text-4xl font-bold'>Invalid plan!</h1>
        </div>
    }

    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <h1 className='text-xl font-bold'>Loading plan...</h1>
        </div>
    }
    return (
        <div className='container mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='w-full px-2 md:px-5'>
                <div className='flex items-center gap-5'>
                    <Link href="/plans"><Button variant={'outline'}><ArrowLeft /></Button></Link>
                    <p className='font-bold md:text-xl'>NKPAYS Plan Submission</p>
                </div>

                <div className="py-10">
                    <p className='w-full text-4xl font-bold'>{`Plan: ${data?.title}`}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className='rounded-xl shadow overflow-hidden'>
                        <Image alt="" src={'/assets/images/payment-qr-1.jpg'} width={800} height={400}/>
                    </div>
                    <div className='rounded-xl shadow overflow-hidden'>
                        <Image alt="" src={'/assets/images/payment-qr-2.jpg'} width={800} height={400}/>
                    </div>
                </div>
            </div>

            <div className=' md:p-10'>
                <Card >
                    <CardHeader></CardHeader>
                    <CardContent>
                        <ClientLeadForm planId={parseInt(id)} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SelectePlan