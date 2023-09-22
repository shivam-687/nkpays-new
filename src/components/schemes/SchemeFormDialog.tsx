/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CreatePlanInput, CreatePlanSchema, PlanData, UpdatePlanInput, UpdatePlanSchema } from '@/schema/PlanSchema';
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { convertNullToUndefined } from '@/lib/utils';
import { Scheme } from '@prisma/client';
import { CreateScemeSchema, CreateSchemeInput, UpdateSchemeInput, UpdateSchemeSchema } from '@/schema/SchemeSchema';

const SchemeFormDialog = ({
    scheme,
    trigger,
    planId
}: {
    trigger?: ReactNode
    scheme?: Scheme,
    planId: number
}) => {
    const [open, setOpen] = useState(false);
    const createMutation = api.schemes.create.useMutation();
    const updateMuation = api.schemes.update.useMutation();
    const ctx = api.useContext().schemes;

    const form = useForm<CreateSchemeInput | UpdateSchemeInput>({
        resolver: zodResolver(scheme ? UpdateSchemeSchema : CreateScemeSchema),
        defaultValues: scheme ? convertNullToUndefined(scheme) : {planId}
    })

    async function onSubmit(values: CreateSchemeInput | UpdateSchemeInput) {
        try {
            if (scheme) {
                const res = await updateMuation.mutateAsync(values as UpdateSchemeInput);
                toast.success("Scheme updated successfully!")
            } else {
                const res = await createMutation.mutateAsync(values as CreateSchemeInput);
                toast.success("Scheme created successfully!")
                form.reset();
            }
            await ctx.invalidate();
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    trigger || <Button size={'lg'}>Create Scheme</Button>
                }
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{scheme ? 'Edit Scheme' : 'Create Scheme'}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Scheme Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='desc'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Plan description" {...field} />
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
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Scheme price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                        <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default SchemeFormDialog