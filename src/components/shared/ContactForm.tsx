/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type CreateContactFormInput, CreateContactSchema } from '@/schema/contactForm.schema'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'

import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import GreetAfterSubmissionDialog, { type HandleContactQueryGreetDialog } from '../contactQuery/GreetAfterSubmissionDialog'
import { cn } from '@/lib/utils'


const ContactForm = ({
    onSubmit
}: {
    onSubmit?: () => void
}) => {
    const createContactMutation = api.contact_query.create.useMutation()
    const form = useForm<z.infer<typeof CreateContactSchema>>({
        resolver: zodResolver(CreateContactSchema),
    });
    const dialogRef = useRef<HandleContactQueryGreetDialog>(null);


    async function onFormSubmit(values: CreateContactFormInput) {
        try {
            const res = await createContactMutation.mutateAsync({ ...values });
            if (res) {
                dialogRef.current?.openDialog();
                void onSubmit?.();
            }
            form.reset({});
        } catch (error: any) {
            toast(error.message)
        }
    }

    return (
        <>
            <GreetAfterSubmissionDialog ref={dialogRef} />

            <Form {...form}
            >
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className='grid grid-cols-2 gap-5'>
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
                    </div>
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
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Message..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='w-full' variant={'glow'} type="submit">Submit</Button>
                </form>
            </Form>

        </>
    )
}

export default ContactForm