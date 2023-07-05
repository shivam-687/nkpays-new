/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useEffect } from 'react'
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
import { type UpdateExtensionInput,  WhatsappSettingOutput, CreateWhatsappSettingInput, UpdateWhatsappSettingInput, UpdateWhatsappSettingSchema, CreateWhatsappSettingSchema } from '@/schema/extension.schema'


const WhatsappSetting = ({ data }: { data?: WhatsappSettingOutput }) => {
    const title = 'whatsapp';
    const createExtensionMutation = api.extension.create.useMutation()
    const updateExtensionMutation = api.extension.update.useMutation()
    const ctx = api.useContext().extension;
    const form = useForm<CreateWhatsappSettingInput|UpdateWhatsappSettingInput>({
        resolver: zodResolver(data ? UpdateWhatsappSettingSchema : CreateWhatsappSettingSchema),
        defaultValues: data ? { ...data } : { title }
    });


    async function onSubmit(values: CreateWhatsappSettingInput|UpdateWhatsappSettingInput) {
        try {
            if (data) {
                await updateExtensionMutation.mutateAsync({ ...values as UpdateExtensionInput });
            } else {
                await createExtensionMutation.mutateAsync({ ...values as CreateWhatsappSettingInput });
            }
            toast.success('Whatsapp Setting saved')
            void ctx.invalidate()
        } catch (error: any) {
            toast(error.message)
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
                    <CardTitle>Whatsapp Setting</CardTitle>
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
                                name="data.number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Whatsapp Number</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="data.greetMessage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom Message</FormLabel>
                                        <FormControl>
                                            <Input placeholder='This message is autofilled when user click to whatsapp button on site.'  {...field} />
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

export default WhatsappSetting