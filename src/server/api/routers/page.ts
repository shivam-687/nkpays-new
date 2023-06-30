import { Prisma } from '@prisma/client';
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CreatePageSchema, DeletePageSchema, GetPageSchemaById, GetPageSchemaByName, PageListPageSchema, UpdatePageSchema } from "@/schema/page.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ServerErrorHandler } from "../error-handler/ServerErrorHandler";
import { Page } from "@prisma/client";
import { createPaginator } from 'prisma-pagination';
import { z } from 'zod';


const paginate = createPaginator({perPage: 30})

export const PageRouter = createTRPCRouter({
    create: protectedProcedure.input(CreatePageSchema).mutation(async ({ctx, input}) => {
        try {
            const res = await ctx.prisma.page.create({
                data: input
            });

            return res;
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

    delete: protectedProcedure.input(DeletePageSchema).mutation(async ({ctx, input}) => {
        try {
            return await ctx.prisma.page.delete({where: {id: input.id}});
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

    update: protectedProcedure.input(UpdatePageSchema).mutation(async ({ctx, input}) => {
        try {
            return await ctx.prisma.page.update({where: {id: input.id}, data: input});
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

    getByName: publicProcedure.input(GetPageSchemaByName).query(async ({ctx, input}) => {
        try {
            return await ctx.prisma.page.findUnique({where: {name: input.name}});
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

    getById: publicProcedure.input(GetPageSchemaById).query(async ({ctx, input}) => {
        try {
            return await ctx.prisma.page.findUnique({where: {id: input.id}});
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),
    get: publicProcedure.input(z.object({slug: z.string()})).query(async ({ctx, input}) => {
        try {
            return await ctx.prisma.page.findFirst({where: {slug: input.slug}});
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

    list: publicProcedure.input(PageListPageSchema).query(async({ ctx, input }) => {
        const {search, sortBy, pagination} = input;
        const res = await paginate<Page, Prisma.PageFindManyArgs>(ctx.prisma.page, {
            where: search ? {
                OR: {
                    name: {
                        contains: search
                    }
                }
    
            }: undefined,
            orderBy: sortBy || {createdAt: 'desc'}
        }, pagination)
    
        return res;
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

})