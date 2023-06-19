import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";

export const CreateContactSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().optional()
})


export type CreateContactFormInput = z.TypeOf<typeof CreateContactSchema>;


export const UpdateContactSchema = z.object({
    id: z.number()
}).merge(CreateContactSchema);


export type UpdateContactnput = z.TypeOf<typeof UpdateContactSchema>;


export const DeleteContactSchema = z.object({
    id: z.number()
})


export const ContactListSchema = WithPagination
                                .merge(WithSorting)
                                .merge(WithSearch)