import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";

export const CreatePageSchema = z.object({
    name: z.string(),
    content: z.string(),
    meta: z.any().optional().default(undefined),
    slug: z.string()
})

export const UpdatePageSchema = z.object({
    id: z.number()
}).merge(CreatePageSchema);

export const DeletePageSchema = z.object({
    id: z.number()
});

export const GetPageSchemaById = z.object({
    id: z.number()
})
export const GetPageSchemaByName = z.object({
    name: z.string()
})

export const PageListPageSchema = WithPagination
.merge(WithSorting)
.merge(WithSearch)