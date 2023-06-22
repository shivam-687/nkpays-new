/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type CreateContactFormInput, CreateContactSchema } from '@/schema/contactForm.schema'
import React, { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { type z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import GreetAfterSubmissionDialog, { type HandleContactQueryGreetDialog } from '../contactQuery/GreetAfterSubmissionDialog'
import { CreateContactConfigInput, CreateContactConfigSchema, UpdateContactConfigSchema } from '@/schema/contactConfig.schema'
import { UpdateContactConfigInput } from '@/schema/contactConfig.schema'
import { Contact } from '@prisma/client'
import { Trash } from 'lucide-react'
import { cn } from '@/lib/utils'



export type MutateContactInfoProps = {
    data?: Contact,
}


const MutateContactInfo = ({
    data,

}: MutateContactInfoProps) => {
    const createContactMutation = api.contactInfo.create.useMutation()
    const updateContactMutation = api.contactInfo.update.useMutation()
    const deleteContactMutation = api.contactInfo.delete.useMutation()
    const ctx = api.useContext().contactInfo;
    const form = useForm<CreateContactConfigInput>({
        resolver: zodResolver(data ? UpdateContactConfigSchema : CreateContactConfigSchema),
        defaultValues: data && {...data as any }
    });

    const emailField = useFieldArray({
        name: 'email' as never,
        control: form.control
    })
    const phoneField = useFieldArray({
        name: 'phone' as never,
        control: form.control
    })


     async function onSubmit(values: CreateContactConfigInput | UpdateContactConfigInput) {
        try {
            if (data) {
                const res = await updateContactMutation.mutateAsync(values as UpdateContactConfigInput);
                toast.success("Contact updated successfully")
            } else {
                await createContactMutation.mutateAsync(values as CreateContactConfigInput);
                toast.success("Contact created successfully")
                form.reset()
            }
            void ctx.invalidate()
        } catch (error: any) {
            toast(error.message)
        }

        
    }

    async function deleteContactInfo() {
        if (!data) return;
        try {
            await deleteContactMutation.mutateAsync({ id: data.id })
        } catch (error: any) {
            toast(error.message)
        }
    }

    return (
        <>
            <Card className='border'>
                <CardHeader>

                </CardHeader>
                <CardContent>
                    <Form {...form}
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-10">

                            <div className='space-y-4 flex-grow'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Contact Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address.addr"
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
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                                    <FormField
                                        control={form.control}
                                        name="address.state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address.country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address.zipcode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pincode</FormLabel>
                                                <FormControl>
                                                    <Input type='number'  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div >
                                    {emailField.fields.map((field, index) => (
                                        <FormField
                                            control={form.control}
                                            key={field.id}
                                            name={`email.${index}`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                        Email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-3"
                                        onClick={() => emailField.append('')}
                                    >
                                        Add Email
                                    </Button>
                                </div>
                                <div>
                                    {phoneField.fields.map((field, index) => (
                                        <FormField
                                            control={form.control}
                                            key={field.id}
                                            name={`phone.${index}`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                        Phone
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-1"
                                        onClick={() => phoneField.append('')}
                                    >
                                        Add Phone
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Button variant={'glow'} type="submit">{data ? 'Update' : 'Create'}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default MutateContactInfo