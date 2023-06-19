import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";

export const CreateLoginLinkSchema = z.object({
    title: z.string(),
    link: z.string()
})


export type CreateLoginLinkInput = z.TypeOf<typeof CreateLoginLinkSchema>;


export const UpdateLoginLinkSchema = z.object({
    id: z.number()
}).merge(CreateLoginLinkSchema);

export type UpdateLoginLinkInput = z.TypeOf<typeof UpdateLoginLinkSchema>;


export type UpdateProductInput = z.TypeOf<typeof UpdateLoginLinkSchema>;


export const DeleteLoginLinkSchema = z.object({
    id: z.number()
})


export const ListLoginLinkSchema = WithPagination
                                .merge(WithSorting)
                                .merge(WithSearch)