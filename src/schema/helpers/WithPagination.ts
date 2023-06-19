import { z } from "zod";

export const WithPagination = z.object({
    pagination: z.object({
        perPage: z.number().or(z.string()).optional(),
        page:  z.number().or(z.string()).optional(),
    }).optional()
})

export type WithPaginationInput = z.TypeOf<typeof WithPagination>;