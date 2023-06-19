/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type CreateContactFormInput, CreateContactSchema, UpdateContactSchema } from '@/schema/contactForm.schema'
import React, { ReactNode, useRef } from 'react'
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import { CreateProductInput, CreateProductSchema, ProductListItem, UpdateProductSchema } from '@/schema/product.schema'
import { Product } from '@prisma/client'
import Editor from '../shared/Editor'
import FileInputArea from '../shared/FileInputArea'


export type MutateProductFormProps = {
    data?: ProductListItem | Product,
    trigger?: ReactNode,
    onMutate?: (product?: Product) => void
}


const MutateProductForm = ({
    data,
    trigger,
    onMutate
}: MutateProductFormProps) => {
    const createProductMutation = api.product.create.useMutation()
    const updateProductMutation = api.product.update.useMutation()
    const ctx = api.useContext().product;


    const form = useForm<z.infer<typeof CreateProductSchema> | z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(CreateProductSchema),
    });


    async function onSubmit(values: CreateProductInput | z.infer<typeof UpdateProductSchema>) {
        try {
            if (data) {
                const res = await updateProductMutation.mutateAsync(values as z.infer<typeof UpdateProductSchema>);
                onMutate?.(res);
                toast.success('Product created successfully!')
            } else {
                const res = await createProductMutation.mutateAsync(values as z.infer<typeof UpdateProductSchema>);
                onMutate?.(res);
                toast.success('Product Updated successfully!')
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Card className='border'>
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="col-auto md:col-span-2 space-y-4">
                            <Form {...form}
                            >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="desc"
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
                                    <FormField
                                        control={form.control}
                                        name="metaDesc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product meta description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='price'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input prefix='₹' placeholder="Product Price" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="slug"
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

                                    <div className="mt-10">
                                        <Button className='w-full' variant={'glow'} type="submit">{!data ? 'Create' : 'Update'}</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                        <Card>
                            <CardContent>
                                <div>
                                    <FileInputArea/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default MutateProductForm