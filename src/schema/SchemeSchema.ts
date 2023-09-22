import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { Scheme } from "@prisma/client";

export const CreateScemeSchema = z.object({
    name: z.string(),
    desc: z.string().optional(),
    price: z.string().optional(),
    enabled: z.boolean().optional(),
    planId: z.number()
});

export type CreateSchemeInput = z.TypeOf<typeof CreateScemeSchema>;

export const UpdateSchemeSchema = z.object({
    id: z.number()
}).merge(CreateScemeSchema);

export type UpdateSchemeInput = z.TypeOf<typeof UpdateSchemeSchema>;

export const DeleteShemeSchema = z.object({
    id: z.number()
});

export const GetSchemeByIdSchema = z.object({
    id: z.number()
})

export const ListSchemeSchema = WithPagination
                        .merge(WithSorting)
                        .merge(WithSearch)
                        .merge(z.object({
                            planId: z.number().optional()
                        }))

export type SchemeData = Scheme & {
    _count: {
        Leads: number
    }
}