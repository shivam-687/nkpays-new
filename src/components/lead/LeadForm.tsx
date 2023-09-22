/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { CreatePlanInput, UpdatePlanInput } from '@/schema/PlanSchema'
import { api } from '@/utils/api'
import { CreateLeadInput, CreateLeadSchema, UpdateLeadInput } from '@/schema/LeadSchema'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { nanoid } from 'nanoid'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'

type LeadData = {
    image?: string,
    title: string,
    offers: {
        name?: string,
        desc?: string,
        price?: number
    }[],
    bestOffer?: boolean,
    active?: boolean
}

const data: LeadData[] = [
    {
        title: 'NKPays Distributer ID',
        offers: [
            {
                name: 'NKPAYS LITE',
                desc: 'Only Recharge & Bill payment',
                price: 5000
            },
            {
                name: 'NKPAYS BC',
                desc: 'DMT/AEPS/MATM/POS/BBPS',
                price: 10000
            },
            {
                name: 'Application DT ID Combo',
                desc: '10 MATM Device free',
                price: 20000
            },
            {
                name: 'Application DT ID Combo',
                desc: '10 MATM Device and 10 MANTRA device free',
                price: 50000
            }
        ],
    },
    {
        title: 'NKPAYS Master Distributer ID',
        offers: [
            {
                name: 'NKPAYS LITE',
                desc: 'Only Recharge & Bill Payment LIC',
                price: 15000
            },
            {
                name: 'NKPAYS BC',
                desc: 'DMT/AEPS/MATM/POS/BBPS',
                price: 25000
            },
            {
                name: 'Application DT ID Combo',
                desc: '25 Pcs MATM Device free',
                price: 50000
            },
            {
                name: 'Application DT ID Combo',
                desc: '20 pcs MATM Device and 20 MANTRA device free',
                price: 100000
            }
        ],
        bestOffer: true
    },
    {
        title: 'NKPAYS RETAILERSHIP',
        offers: [
            {
                name: 'NKPAYS LITE',
                desc: 'Only Recharge & Bill Payment LIC',
                price: 1000
            },
            {
                name: 'NKPAYS BC',
                desc: 'DMT/AEPS/MATM/POS/BBPS',
                price: 2000
            },
            {
                name: 'Both id combo pack BC AND LITE',
                desc: '1 Pcs MATM Device free',
                price: 2500
            },
            {
                name: 'Both id combo pack BC AND LITE',
                desc: '1 pcs MATM Device and 1 MANTRA device free',
                price: 5500
            }
        ]
    },
    {
        title: 'Recharge API',
        offers: [
            {
                name: 'Recharge Api',
                desc: 'Only echarge API',
                price: 5000
            }
        ]
    },
    {
        title: 'Recharge And Bill payment API',
        offers: [
            {
                name: 'Recharge And Bill payment API',
                desc: 'Recharge And Bill payment API',
                price: 10000
            }
        ]
    },
]

type ClientLeadFormProps = {
    planId: number
}

const ClientLeadForm = ({
    planId
}: ClientLeadFormProps) => {
    const { data, isLoading } = api.plans.getById.useQuery({ id: planId });
    const router = useRouter();
    const createMutation = api.leads.create.useMutation();
    const form = useForm<CreateLeadInput>({
        resolver: zodResolver(CreateLeadSchema),
        defaultValues: {
            planId
        }
    })

    const save = async (value: CreateLeadInput) => {
        try {
            const res = await createMutation.mutateAsync(value);
            toast.success('Thank You For selecting our plans');
            await router.push('/plans')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const onSubmit = (value: CreateLeadInput) => {
        void save(value)
    }



    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shopName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shop Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Shop Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='schemeId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Schemes</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={`${field.value}`}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select any scheme" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        data?.schemes.map(scheme => {
                                            return (
                                                <SelectItem className='capitalize' key={nanoid()} value={`${scheme.id}`}>{scheme.name}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name='aadhaarNo'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Aadhaar Card No.</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aadhaar Card No." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='pancard'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pan Card No.</FormLabel>
                                <FormControl>
                                    <Input placeholder="Pan Card No." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                                <Input placeholder="Area Pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="planId"
                    render={({ field }) => (
                        <FormItem hidden>
                            <FormLabel>Plan</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={`${field.value || data?.id}`}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        data && <SelectItem className='capitalize' key={nanoid()} value={`${data.id}`}>{data.title}</SelectItem>
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='utrNo'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>UTR Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter utr number " {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter UTR(Unique Transaction Request) Number if you do payment with given QR.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={createMutation.isLoading} type="submit" className='w-full'>
                    {
                        createMutation.isLoading && <Loader2 className='w-4 h-4 animate-spin' />
                    }
                    <span>Submit</span>
                </Button>
            </form>
        </Form>
    )
}

export default ClientLeadForm