import { z } from "zod";

export const CreateContactSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().optional()
})


export type CreateContactFormInput = z.TypeOf<typeof CreateContactSchema>;


export const UpdateContactSchema = z.object({
    id: z.string()
}).merge(CreateContactSchema);


export type UpdateContactnput = z.TypeOf<typeof UpdateContactSchema>;


export const DeleteContactSchema = z.object({
    id: z.string()
})


export const ContactListSchema = z.object({
    page: z.number(),
    pageSize: z.number(),
    search: z.string(),
    sort: z.record(z.enum(['asc', 'desc'])).or(z.object({'_count': z.record(z.enum(['asc', 'desc']))})),
})