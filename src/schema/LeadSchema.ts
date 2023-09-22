import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { Leads } from "@prisma/client";

export const LeadStatusEnumSchema = z.enum([
    'OPEN',
    'CLOSED',
    'DECLINED'
])

export const CreateLeadSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    shopName: z.string(),
    planId: z.number(),
    aadhaarNo: z.string(),
    pancard: z.string(),
    address: z.string(),
    pincode: z.string(),
    utrNo: z.string().optional(),
    status: LeadStatusEnumSchema.default('OPEN').optional(),
    schemeId: z.number().optional(),
});

export type CreateLeadInput = z.TypeOf<typeof CreateLeadSchema>;

export const UpdateLeadSchema = z.object({
    id: z.number()
}).merge(CreateLeadSchema);

export type UpdateLeadInput = z.TypeOf<typeof UpdateLeadSchema>;

export const DeleteLeadSchema = z.object({
    id: z.number()
});

export const GetSLeadByIdSchema = z.object({
    id: z.number()
})

export const ListLeadSchema = WithPagination
                        .merge(WithSorting)
                        .merge(WithSearch)


export type LeadData = Leads & {
    Plan: {
        id: number;
        title: string;
    } | null;
    Scheme: {
        id: number;
        name: string;
    } | null;
}