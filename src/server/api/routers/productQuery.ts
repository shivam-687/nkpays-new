import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { ProductEnquiryListSchema, CreateProductEnquirySchema, DeleteProductEnquirySchema, UpdateProductEnquirySchema, ProductEnquiryListItem } from "@/schema/productEnquiry";
import {createPaginator} from 'prisma-pagination';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Prisma, ProductEnquiry } from '@prisma/client';
import { z } from 'zod';

const paginate = createPaginator({perPage: 30})

export const ProductEnquiryRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateProductEnquirySchema)
    .mutation(async ({ctx, input }) => {
        try {
          const alreadyExists = await ctx.prisma.productEnquiry.findFirst({
            where: {
              email: input.email,
              productId: input.productId
            }
          })
          if(alreadyExists){
            return alreadyExists;
          }
            const res = await ctx.prisma.productEnquiry.create({
                data: input
            });

            return res;
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

  getAll: protectedProcedure.input(ProductEnquiryListSchema).query(async({ ctx, input }) => {
    const {search, sortBy, pagination} = input;
    const res = await paginate<ProductEnquiryListItem, Prisma.ProductEnquiryFindManyArgs>(ctx.prisma.productEnquiry, {
        where: search ? {
            OR: {
                name: {
                    contains: search
                },
                product: {
                  slug: {
                    contains: search
                  }
                }
            }

        }: undefined,
        include: {
          product: {
            select: {
              id: true,
              title: true,
              thumbnail: true
            }
          }
        },
        orderBy: sortBy || {createdAt: 'desc'}
    }, pagination)

    return res;
  }),

  delete: protectedProcedure.input(DeleteProductEnquirySchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.productEnquiry.delete({where: {id: input.id}})
  }),

  deleteMany: protectedProcedure.input(z.object({ids: z.array(z.number()).default([])})).mutation(async ({ctx, input}) => {
    return await ctx.prisma.productEnquiry.deleteMany({
      where: {
        id: {
          in: input.ids
        }
      }
    })
  }),

  update: protectedProcedure.input(UpdateProductEnquirySchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.productEnquiry.update({where: {id: input.id}, data: input})
  }),
  get: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
    const res = await ctx.prisma.productEnquiry.findUnique({
      where: {id: input.id},
      include: {
        product: {
          select: {
            id: true,
            title: true,
            thumbnail: true
          }
        }
      }
    })

    return res;
  }),

  
});