import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { Plan, Scheme } from "@prisma/client";

export const CreatePlanSchema = z.object({
    title: z.string(),
    desc: z.string().optional(),
    order: z.number().optional(),
    price: z.string().optional(),
    enabled: z.boolean().optional()
});

export type CreatePlanInput = z.TypeOf<typeof CreatePlanSchema>;


export const UpdatePlanSchema = z.object({
    id: z.number()
}).merge(CreatePlanSchema);
export type UpdatePlanInput = z.TypeOf<typeof UpdatePlanSchema>;

export const DeletePlanSchema = z.object({
    id: z.number()
});

export const GetPlanByIdSchema = z.object({
    id: z.number()
})


export const ListPlanSchema = WithPagination
                        .merge(WithSorting)
                        .merge(WithSearch)



export type PlanData = Plan & {
    schemes: Scheme[],
    _count: {
        Leads: number
    }
}