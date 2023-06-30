import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { Page } from "@prisma/client";

export const CreatePageSchema = z.object({
    name: z.string(),
    content: z.string(),
    meta: z.object({
        seoTitle: z.string().optional(),
        seoDesc: z.string().optional(),
    }).optional().default({}),
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


export type PageData = z.TypeOf<typeof UpdatePageSchema> & {
    createdAt: Date,
    updatedAt: Date
}