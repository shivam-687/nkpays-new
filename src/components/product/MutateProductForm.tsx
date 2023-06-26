/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, type ReactNode } from 'react'
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
import { type CreateProductInput, CreateProductSchema, type ProductListItem, UpdateProductSchema } from '@/schema/product.schema'
import { type Product } from '@prisma/client'
import Editor from '../shared/Editor'
import ThumbnailUploader from '../shared/FileInputArea'
import StickyBox from "react-sticky-box";
import WeightUnitSelector from '../shared/inputs/WeightUnitSelector'
import DimensionUnitSelector from '../shared/inputs/DimensionUnitSelector'
import slugify from 'slugify'


export type MutateProductFormProps = {
    data?: ProductListItem,
    trigger?: ReactNode,
    onMutate?: (product?: Product) => void
}


const MutateProductForm = ({
    data,
    onMutate
}: MutateProductFormProps) => {
    const createProductMutation = api.product.create.useMutation()
    const updateProductMutation = api.product.update.useMutation()
    const ctx = api.useContext().product;


    const form = useForm<z.infer<typeof CreateProductSchema> | z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(data ? UpdateProductSchema : CreateProductSchema),
        defaultValues: data ? {
            ...data,
            gallery: []
        } : {
            info: {
                dimUnit: 'cm',
                massUnit: 'gram'
            }
        }
    });


    async function onSubmit(values: CreateProductInput | z.infer<typeof UpdateProductSchema>) {

        try {
            if (data) {
                const res = await updateProductMutation.mutateAsync(values as z.infer<typeof UpdateProductSchema>);
                onMutate?.(res);
                toast.success('Product update successfully!')
            } else {
                const res = await createProductMutation.mutateAsync(values as z.infer<typeof CreateProductSchema>);
                onMutate?.(res);
                toast.success('Product Created successfully!')
                form.reset({});
            }
            void ctx.invalidate()
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
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        name="title"
                                        render={({ field: { onChange, ...rest } }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product title" {...rest} onChange={e => {
                                                        onChange(e);
                                                        form.setValue('slug', slugify(e.target.value || ''))
                                                    }} />
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
                                    <div className='mt-5'>


                                        <FormField
                                            control={form.control}
                                            name="metaDesc"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meta Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Product meta description" {...field} />
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
                                                    <FormLabel>Slug</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Product Slug" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name='thumbnail'
                                        render={({ field }) => (
                                            <FormItem hidden>
                                                <FormLabel>Thumbnail</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Thumbnail image url" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='info'
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Extra Info</FormLabel>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                                                    <FormField
                                                        control={form.control}
                                                        name='price'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Price</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type='number'
                                                                        placeholder="Product Price"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name='info.color'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Color</FormLabel>
                                                                <FormControl>
                                                                    <Input

                                                                        placeholder="Provide understandable color name"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                    <FormControl>
                                                        <FormField
                                                            control={form.control}
                                                            name='info.sku'
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>SKU</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Product SKU" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormField
                                                            control={form.control}
                                                            name='info.weight'
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>Weight</FormLabel>
                                                                    <FormControl>
                                                                        <Input type='number' placeholder="Product Weight" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormField
                                                            control={form.control}
                                                            name='info.massUnit'
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>Weight Unit</FormLabel>
                                                                    <WeightUnitSelector {...field} />
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                    <div className="grid grid-cols-3 col-auto md:col-span-2 gap-5">
                                                        <FormControl>
                                                            <FormField
                                                                control={form.control}
                                                                name='info.width'
                                                                render={({ field }) => (
                                                                    <FormItem >
                                                                        <FormLabel>Width</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" placeholder="Product Width" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormField
                                                                control={form.control}
                                                                name='info.height'
                                                                render={({ field }) => (
                                                                    <FormItem >
                                                                        <FormLabel>Height</FormLabel>
                                                                        <FormControl>
                                                                            <Input type='number' placeholder="Product Height" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormField
                                                                control={form.control}
                                                                name='info.length'
                                                                render={({ field }) => (
                                                                    <FormItem >
                                                                        <FormLabel>Length</FormLabel>
                                                                        <FormControl>
                                                                            <Input type='number' placeholder="Product Length" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormControl>
                                                        <FormField
                                                            control={form.control}
                                                            name='info.dimUnit'
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>Dimension Unit</FormLabel>
                                                                    <DimensionUnitSelector {...field} />
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="mt-10">
                                        <Button className='w-full' variant={'glow'} type="submit" disabled={createProductMutation.isLoading || updateProductMutation.isLoading}>{!data ? 'Create' : 'Update'}</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>

                        <StickyBox offsetTop={20} offsetBottom={20}>
                            <div>
                                <ThumbnailUploader value={data?.thumbnail} onImageUpload={(img) => {
                                    form.setValue('thumbnail', img)

                                }} />
                            </div>
                        </StickyBox>

                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default MutateProductForm