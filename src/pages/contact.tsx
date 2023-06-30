/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ContactForm from '@/components/shared/ContactForm'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GoogleMapWidget from '@/components/widget/GoogleMapWidget'
import { ContactData } from '@/schema/contactConfig.schema'
import { appRouter } from '@/server/api/root'
import { Contact } from '@prisma/client'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { Mail, Phone } from 'lucide-react'
import { nanoid } from 'nanoid'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import SuperJSON from 'superjson'
import { createInnerTRPCContext } from '~/server/api/trpc';
import { getServerAuthSession } from '~/server/auth';


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

export async function getServerSideProps(
    context: GetServerSidePropsContext
) {
    const helpers = createServerSideHelpers({
        ctx: createInnerTRPCContext({ session: await getServerAuthSession({ ...context }) }),
        router: appRouter,
        transformer: SuperJSON,
    });

    const res = await helpers.contactInfo.getAll.fetch({})



    return {
        props: {
            trpcState: helpers.dehydrate(),
            contacts: res ? JSON.parse(JSON.stringify(res)) as ContactData[] : [] as ContactData[]
        }
    }
}


const ContactCard = ({
    contact
}: { contact?: ContactData }) => {

    if (!contact) {
        return <div></div>
    }
    return (
        <div>
            <h2 className='text-3xl md:text-4xl mb-5'>{contact.title}</h2>
            <p className='max-w-xs mb-3'>
                {contact.address.addr}, {contact.address.state}, {contact.address.country}, ({contact.address.zipcode})
            </p>
            <div className='space-y-5'>
                <div className='flex items-center gap-3'>
                    <div className='flex-grow-0'><Mail className='w-8 h-8' /></div>
                    <div className='flex-grow'>
                        <p className='font-bold text-lg'>Email</p>
                        {
                            contact.email && contact.email.map(mail => {
                                return <a key={nanoid()} className='text-primary' href={`mailto:${mail}`}>{mail}</a>
                            })
                        }
                    </div>
                </div>
                <div className='flex items-start gap-3'>
                    <div className='flex-grow-0'><Phone className='w-10 h-10' /></div>
                    <div className='flex-grow'>
                        <p className='font-bold text-lg'>Phone</p>
                        <div className="space-y-1">
                            {
                                contact.phone && contact.phone.map(phone => {
                                    return <a key={nanoid()} className='text-primary flex' href={`tel:${phone}`}>{phone}</a>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ContactPage = ({ contacts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <div className='px-4 py-10 md:py-20 bg-primary/30'><h1 className='text-4xl text-center md:text-5xl font-bold'>Contact Us</h1></div>
            <section className='px-4 py-20'>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Us Now!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        {
                            contacts.length > 0 && <ContactCard contact={contacts[1]} />
                        }
                    </div>
                </div>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center mt-20">
                    <div>

                        {
                            contacts.length > 1 && <ContactCard contact={contacts[0]} />
                        }
                    </div>

                    <div className='aspect-square bg-primary/30 text-6xl font-bold w-full'>
                        <GoogleMapWidget />
                    </div>
                </div>

            </section>

            <DownloadAppSection />
        </>
    )
}

export default ContactPage