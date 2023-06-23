import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { ProductListSchema, CreateProductSchema, DeleteProductSchema, UpdateProductSchema, ProductListItem } from "@/schema/product.schema";
import {createPaginator} from 'prisma-pagination';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { ContactQuery, LoginLink, Prisma, Product } from '@prisma/client';
import { z } from 'zod';

const paginate = createPaginator({perPage: 30})

export const ProductRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateProductSchema)
    .mutation(async ({ctx, input }) => {
        try {

            const res = await ctx.prisma.product.create({
                data: input
            });

            return res;
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

  getAll: publicProcedure.input(ProductListSchema).query(async({ ctx, input }) => {
    const {search, sortBy, pagination} = input;
    const res = await paginate<ProductListItem, Prisma.ProductFindManyArgs>(ctx.prisma.product, {
        where: search ? {
            OR: {
                title: {
                    contains: search
                }
            }

        }: undefined,
        include: {
          _count: {
            select: {
              ProductEnquiry: true
            }
          }
        },
        orderBy: sortBy || {createdAt: 'desc'}
    }, pagination)

    return res;
  }),

  delete: protectedProcedure.input(DeleteProductSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.product.delete({where: {id: input.id}})
  }),

  deleteMany: protectedProcedure.input(z.object({ids: z.array(z.number()).default([])})).mutation(async ({ctx, input}) => {
    return await ctx.prisma.product.deleteMany({
      where: {
        id: {
          in: input.ids
        }
      }
    })
  }),

  update: protectedProcedure.input(UpdateProductSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.product.update({where: {id: input.id}, data: input})
  }),

  get: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
    const res = await ctx.prisma.product.findUnique({
      where: {id: input.id},
      include: {
        _count: {
          select: {
            ProductEnquiry: true
          }
        }
      }
    })

    return res;
  })
});