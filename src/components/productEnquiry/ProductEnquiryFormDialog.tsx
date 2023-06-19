/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { type ProductListItem } from "@/schema/product.schema"
import { type CreateProductEnquiryInput, CreateProductEnquirySchema } from "@/schema/productEnquiry"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import {  type ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { type Product } from "@prisma/client"

export type ProductEnquiryDialog = {
    trigger?: ReactNode,
    product: ProductListItem|Product
}


function ProductEnquiryDialog({
    trigger,
    product
}: ProductEnquiryDialog) {

    const [open, setOpen] = useState(false);
    const createEnquiryMutation = api.product_enquiry.create.useMutation();
    const form = useForm<CreateProductEnquiryInput>({
        resolver: zodResolver(CreateProductEnquirySchema),
        defaultValues: {
            productId: product.id
        },
        
    })

    async function onSubmit(values: CreateProductEnquiryInput) {
        try {
            const res = await createEnquiryMutation.mutateAsync({ ...values });
            toast.success("Your enquiry submitted successfully!, we'll contact you very soon")
            form.reset();
            setOpen(false);
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            toast.error(error.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    trigger || <Button>Enquiry</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product.title} Enquiry</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        
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
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default ProductEnquiryDialog;
