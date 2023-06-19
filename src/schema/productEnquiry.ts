import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { ProductEnquiry } from "@prisma/client";

export const CreateProductEnquirySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().optional(),
    productId: z.number()
})


export type CreateProductEnquiryInput = z.TypeOf<typeof CreateProductEnquirySchema>;


export const UpdateProductEnquirySchema = z.object({
    id: z.number()
}).merge(CreateProductEnquirySchema);


export type UpdateProductInput = z.TypeOf<typeof UpdateProductEnquirySchema>;


export const DeleteProductEnquirySchema = z.object({
    id: z.number()
})


export const ProductEnquiryListSchema = WithPagination
.merge(WithSorting)
.merge(WithSearch)


export type ProductEnquiryListItem = ProductEnquiry & {
    product: {
        id: number;
        title: string;
        thumbnail: string | null;
    };
}