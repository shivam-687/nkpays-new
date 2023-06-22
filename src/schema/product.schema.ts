import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { Product } from "@prisma/client";

export const CreateProductSchema = z.object({
    title: z.string(),
    desc: z.string().optional(),
    metaDesc: z.string().optional(),
    thumbnail: z.string().optional(),
    gallery: z.array(z.string()).default([]).optional(),
    info: z.object({
        sku: z.string().optional(),
        weight: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        color: z.string().optional(),
        dimUnit: z.string().default('cm').optional(),
        massUnit: z.string().default('kg').optional()
    }).optional(),
    slug: z.string(),
    price: z.string().optional(),
})


export type CreateProductInput = z.TypeOf<typeof CreateProductSchema>;


export const UpdateProductSchema = z.object({
    id: z.number()
}).merge(CreateProductSchema);


export type UpdateProductInput = z.TypeOf<typeof UpdateProductSchema>;


export const DeleteProductSchema = z.object({
    id: z.number()
})


export const ProductListSchema = WithPagination
.merge(WithSorting)
.merge(WithSearch)


/** 
 *  id: number;
    title: string;
    desc: string | null;
    metaDesc: string | null;
    thumbnail: string | null;
    info: Prisma.JsonValue | null;
    gallery: Prisma.JsonValue | null;
    slug: string;
    price: string | null;
    createdAt: Date;
    updatedAt: Date;
*/

export type ProductListItem = CreateProductInput& {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    _count: {
        ProductEnquiry: number;
    };
}