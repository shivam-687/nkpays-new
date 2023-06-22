import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { ProductEnquiryListSchema, CreateProductEnquirySchema, DeleteProductEnquirySchema, UpdateProductEnquirySchema, ProductEnquiryListItem } from "@/schema/productEnquiry";
import { createPaginator } from 'prisma-pagination';
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { CreateExtensionSchema, DeleteExtensionSchema, UpdateExtensionSchema } from '@/schema/extension.schema';
import { TRPCError } from '@trpc/server';


export const ExtensionRouter = createTRPCRouter({
    create: protectedProcedure
        .input(CreateExtensionSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const alreadyExists = await ctx.prisma.extension.findFirst({
                    where: {
                        title: input.title
                    }
                })
                if (alreadyExists) {
                    throw new TRPCError({code: 'BAD_REQUEST', message: 'extension already exists'})
                }
                const res = await ctx.prisma.extension.create({
                    data: input
                });

                return res;
            } catch (error) {
                ServerErrorHandler(error)
            }
        }),

    getAll: protectedProcedure.query(async ({ ctx, input }) => {
      
        const res = await ctx.prisma.extension.findMany()
        return res;
    }),

    delete: protectedProcedure.input(DeleteExtensionSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.extension.delete({ where: { id: input.id } })
    }),

    update: protectedProcedure.input(UpdateExtensionSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.extension.update({ where: { id: input.id }, data: input })
    }),
    get: publicProcedure.input(z.object({ title: z.string() })).query(async ({ ctx, input }) => {
        const res = await ctx.prisma.extension.findFirst({
            where: { title: input.title },
        });
        return res
    })

});