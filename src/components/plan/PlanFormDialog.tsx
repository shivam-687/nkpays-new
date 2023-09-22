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

const PlanFormDialog = ({
    plan,
    trigger
}: {
    trigger?: ReactNode
    plan?: PlanData
}) => {
    const [open, setOpen] = useState(false);
    const createPlanMutation = api.plans.create.useMutation();
    const updatePlanMuation = api.plans.update.useMutation();
    const ctx = api.useContext().plans;

    const form = useForm<CreatePlanInput | UpdatePlanInput>({
        resolver: zodResolver(plan ? UpdatePlanSchema : CreatePlanSchema),
        defaultValues: plan ? convertNullToUndefined(plan) : {}
    })

    async function onSubmit(values: CreatePlanInput | UpdatePlanInput) {
        try {
            if (plan) {
                const res = await updatePlanMuation.mutateAsync(values as UpdatePlanInput);
                toast.success("Plan updated successfully!")
            } else {
                const res = await createPlanMutation.mutateAsync(values as CreatePlanInput);
                toast.success("Plan created successfully!")
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
                    trigger || <Button size={'lg'}>Create Plan</Button>
                }
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{plan ? 'Edit Plan' : 'Create Plan'}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Plan Title" {...field} />
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
                        {/* <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Plan price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        <div className="flex justify-end">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default PlanFormDialog