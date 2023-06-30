import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { ListLoginLinkSchema, CreateLoginLinkSchema, DeleteLoginLinkSchema, UpdateLoginLinkSchema } from "@/schema/loginLink";
import {createPaginator} from 'prisma-pagination';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { ContactQuery, LoginLink, Prisma } from '@prisma/client';
import { z } from 'zod';

const paginate = createPaginator({perPage: 30})

export const LoginLinkRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateLoginLinkSchema)
    .mutation(async ({ctx, input }) => {
        try {

            const res = await ctx.prisma.loginLink.create({
                data: input
            });

            return res;
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

  getAll: publicProcedure.input(ListLoginLinkSchema).query(async({ ctx, input }) => {
    const {search, sortBy, pagination} = input;
    const res = await paginate<LoginLink, Prisma.LoginLinkFindManyArgs>(ctx.prisma.loginLink, {
        where: search ? {
            OR: {
                title: {
                    contains: search
                }
            }

        }: undefined,
        orderBy: sortBy || {createdAt: 'desc'}
    }, pagination)

    return res;
  }),

  delete: protectedProcedure.input(DeleteLoginLinkSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.loginLink.delete({where: {id: input.id}})
  }),

  deleteMany: protectedProcedure.input(z.object({ids: z.array(z.number()).default([])})).mutation(async ({ctx, input}) => {
    return await ctx.prisma.loginLink.deleteMany({
      where: {
        id: {
          in: input.ids
        }
      }
    })
  }),

  update: protectedProcedure.input(UpdateLoginLinkSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.loginLink.update({where: {id: input.id}, data: input})
  })
});
