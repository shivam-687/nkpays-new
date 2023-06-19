import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { ContactListSchema, CreateContactSchema, DeleteContactSchema, UpdateContactSchema } from "@/schema/contactForm.schema";
import {createPaginator} from 'prisma-pagination';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { ContactQuery, Prisma } from '@prisma/client';

const paginate = createPaginator({perPage: 30})

export const ContactQueryRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateContactSchema)
    .mutation(async ({ctx, input }) => {
        try {
            const alredyExist = await ctx.prisma.contactQuery.findUnique({
              where: {email: input.email}
            });

            if(alredyExist){
              return alredyExist;
            }
            const res = await ctx.prisma.contactQuery.create({
                data: input
            });

            return res;
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

  getAll: protectedProcedure.input(ContactListSchema).query(async({ ctx, input }) => {
    const {search, sortBy, pagination} = input;
    const res = await paginate<ContactQuery, Prisma.ContactQueryFindManyArgs>(ctx.prisma.contactQuery, {
        where: search ? {
            OR: {
                email: {
                    contains: search,
                },
                name: {
                    contains: search
                }
            }

        }: undefined,
        orderBy: sortBy || {createdAt: 'desc'}
    }, pagination)

    return res;
  }),

  delete: protectedProcedure.input(DeleteContactSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.contactQuery.delete({where: {id: input.id}})
  }),

  update: protectedProcedure.input(UpdateContactSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.contactQuery.update({where: {id: input.id}, data: input})
  })
});
