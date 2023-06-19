import { z } from "zod";

export const WithSorting = z.object({
    sortBy: z.record(z.enum(['asc', 'desc'])).optional()
})