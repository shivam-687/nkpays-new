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
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { type LoginLink } from "@prisma/client"
import { type CreateLoginLinkInput, CreateLoginLinkSchema, type UpdateLoginLinkInput, UpdateLoginLinkSchema } from "@/schema/loginLink"

export type MutateLoginLinkDialogProps = {
    trigger?: ReactNode,
    link?: LoginLink
}


function MutateLoginLinkDialog({
    trigger,
    link
}: MutateLoginLinkDialogProps) {

    const [open, setOpen] = useState(false);
    const createLoginLinkMutation = api.loginlink.create.useMutation();
    const updateLoginLinkMutation = api.loginlink.update.useMutation();
    const ctx = api.useContext().loginlink;
    const form = useForm<CreateLoginLinkInput | UpdateLoginLinkInput>({
        resolver: zodResolver(link ? UpdateLoginLinkSchema : CreateLoginLinkSchema),
        defaultValues: {
            ...link
        },

    })

    async function onSubmit(values: CreateLoginLinkInput | UpdateLoginLinkInput) {
        try {
            console.log({values})
            let res: LoginLink|undefined = undefined;
            if (link) {
                res = await updateLoginLinkMutation.mutateAsync({ ...values as UpdateLoginLinkInput });
            }else{
                res = await createLoginLinkMutation.mutateAsync({ ...values });
            }
            void ctx.invalidate();
            toast.success(`Link link ${link ? 'Updated' : 'Created'} successfully`)
            form.reset({});
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
                    trigger || <Button>{link ? 'Update' : 'Create'}</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{link ? 'Update' : 'Create'} Login link</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {
                            link
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
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Login link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>{link ? 'Update' : 'Create'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default MutateLoginLinkDialog;
