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
import { type CreateGoogleMapExtensionInput, CreateGoogleMapExtensionSchema, type GoogleMapExtensionOutput, type UpdateExtensionInput, UpdateExtensionSchema, TwakTooSettingOutput } from '@/schema/extension.schema'


const GoogleMapSetting = ({ data }: { data?: GoogleMapExtensionOutput }) => {
    const title = 'google_map';
    const createExtensionMutation = api.extension.create.useMutation()
    const updateExtensionMutation = api.extension.update.useMutation()
    const ctx = api.useContext().extension;
    const form = useForm<z.infer<typeof CreateGoogleMapExtensionSchema> | UpdateExtensionInput>({
        resolver: zodResolver(data ? UpdateExtensionSchema : CreateGoogleMapExtensionSchema),
        defaultValues: data ? { ...data } : { title }
    });


    async function onSubmit(values: CreateGoogleMapExtensionInput | UpdateExtensionInput) {
        try {
            if (data) {
                await updateExtensionMutation.mutateAsync({ ...values as UpdateExtensionInput });
            } else {
                await createExtensionMutation.mutateAsync({ ...values as CreateGoogleMapExtensionInput });
            }
            toast.success('Setting saved successfully')
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
                    <CardTitle>Google Map</CardTitle>
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
                                name="data.apiKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Api Key</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid-cols-2 gap-5">
                                <FormField
                                    control={form.control}
                                    name="data.latitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location Latitude</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="data.longitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location Longitude</FormLabel>
                                            <FormControl>
                                                <Input    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

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

export default GoogleMapSetting