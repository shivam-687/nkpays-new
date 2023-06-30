import { z } from "zod";

export const CreateContactConfigSchema = z.object({
    title: z.string().optional(),
    address: z.object({
        addr: z.string().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        zipcode: z.string().optional()
    }),
    email: z.array(z.string().email()).default([]).optional(),
    phone: z.array(z.string()).optional(),
})

export type CreateContactConfigInput = z.TypeOf<typeof CreateContactConfigSchema>;

export const UpdateContactConfigSchema = z.object({
    id: z.number()
}).merge(CreateContactConfigSchema);

export type UpdateContactConfigInput = z.TypeOf<typeof UpdateContactConfigSchema>;

export const DeleteProductEnquirySchema = z.object({
    id: z.number()
})

export type ContactData = z.TypeOf<typeof CreateContactConfigSchema>






