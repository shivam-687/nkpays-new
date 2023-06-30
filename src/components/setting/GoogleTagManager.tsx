/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type CreateContactFormInput, CreateContactSchema } from '@/schema/contactForm.schema'
import React, { useEffect, useRef } from 'react'
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import { type UpdateExtensionInput, UpdateExtensionSchema, CreateGoogleTagMangerExtensionSchema, CreateGoogleTagMangerExtensionInput, CreateGoogleTagMangerExtensionOutput } from '@/schema/extension.schema'


const GoogleTagManagerSetting = ({ data }: { data?: CreateGoogleTagMangerExtensionOutput }) => {
    const title = 'google_tag_manager';
    const createExtensionMutation = api.extension.create.useMutation()
    const updateExtensionMutation = api.extension.update.useMutation()
    const ctx = api.useContext().extension;
    const form = useForm<z.infer<typeof CreateGoogleTagMangerExtensionSchema> | UpdateExtensionInput>({
        resolver: zodResolver(data ? UpdateExtensionSchema : CreateGoogleTagMangerExtensionSchema),
        defaultValues: data ? { ...data } : { title }
    });


    async function onSubmit(values: CreateGoogleTagMangerExtensionInput | UpdateExtensionInput) {
        try {
            if (data) {
                await updateExtensionMutation.mutateAsync({ ...values as UpdateExtensionInput });
            } else {
                await createExtensionMutation.mutateAsync({ ...values as CreateGoogleTagMangerExtensionInput });
            }
            toast.success('Google Tag Manager Setting saved successfully')
            void ctx.invalidate()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(data ){
            form.setValue('active', data.active)
            form.setValue('id', data.id);
            form.setValue('title', data.title);
            form.setValue('data', data.data)
        }
    }, [data])


    return (
        <>
            <Card className='border-0'>
                <CardHeader>
                    <CardTitle>Google Tag Manager</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {
                                data
                                &&
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem hidden>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem hidden>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="data.code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            

                            <Button
                                className=''
                                variant={'secondary'}
                                disabled={createExtensionMutation.isLoading || updateExtensionMutation.isLoading}
                                type="submit">Save</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default GoogleTagManagerSetting