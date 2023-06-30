/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

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
import Editor from '../shared/Editor'
import { CreatePageSchema, UpdatePageSchema } from '@/schema/page.schema'
import { type Page } from '@prisma/client'
import { Button } from '../ui/button'

import slugify from 'slugify'
import { convertNullToUndefined } from '@/lib/utils'


export type MutatePageFormProps = {
    data?: Page,
    trigger?: ReactNode,
    onMutate?: (product?: Page) => void
}


const PageForm = ({
    data,
    onMutate
}: MutatePageFormProps) => {
    const createPageMutation = api.page.create.useMutation()
    const updatePageMutation = api.page.update.useMutation()
    const ctx = api.useContext().page;


    const form = useForm<z.infer<typeof CreatePageSchema> | z.infer<typeof UpdatePageSchema>>({
        resolver: zodResolver(data ? UpdatePageSchema : CreatePageSchema),
        defaultValues: data && { ...convertNullToUndefined(data) }
    });


    async function onSubmit(values: z.infer<typeof CreatePageSchema> | z.infer<typeof UpdatePageSchema>) {

        try {
            if (data) {
                const res = await updatePageMutation.mutateAsync({ ...values as z.infer<typeof UpdatePageSchema> });
                onMutate?.(res);
                toast.success('Page content update successfully!')
            } else {
                const res = await createPageMutation.mutateAsync({ ...values as z.infer<typeof CreatePageSchema> });
                onMutate?.(res);
                toast.success('Page content successfully!')
                form.reset({});
            }
            void ctx.invalidate()
        } catch (error: any) {
            toast.error(error.message)
        }
    }


    return (
        <>
            <Form {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Card className='border'>
                        <CardHeader>
                            <div className='flex justify-between items-center '>
                                <CardTitle>{data ? 'Update Page Content' : 'Create Page content'}</CardTitle>
                                <Button disabled={createPageMutation.isLoading || updatePageMutation.isLoading} type='submit'>Save</Button>
                            </div>
                        </CardHeader>
                        <CardContent>


                            {
                                data
                                &&
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem hidden>
                                            <FormLabel>Id</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field: { onChange, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Page Title" {...rest} onChange={e => {
                                                onChange(e);
                                                form.setValue('slug', slugify(e.target.value.toLowerCase() || ''))
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field: { ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Page Slug" {...rest} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Editor {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <div className='flex justify-end items-center'>
                                <Button disabled={createPageMutation.isLoading || updatePageMutation.isLoading} type='submit'>Save</Button>
                            </div> */}
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default PageForm;