import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";

export const CreateSocialLinkSchema = z.object({
    title: z.string(),
    link: z.string()
})


export type CreateSocialLinkInput = z.TypeOf<typeof CreateSocialLinkSchema>;


export const UpdateScialLinkInput = z.object({
    id: z.number()
}).merge(CreateSocialLinkSchema);


export type UpdateProductInput = z.TypeOf<typeof UpdateScialLinkInput>;


export const DeleteScialLinkSchema = z.object({
    id: z.number()
})

export const ListSocialLinkSchema = WithPagination
.merge(WithSorting)
.merge(WithSearch)