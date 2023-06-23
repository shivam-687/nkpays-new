import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import {createPaginator} from 'prisma-pagination';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { CreateContactConfigSchema, UpdateContactConfigSchema } from '@/schema/contactConfig.schema';
import { ContactListSchema, DeleteContactSchema } from '@/schema/contactForm.schema';


export const ContactConfigRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateContactConfigSchema)
    .mutation(async ({ctx, input }) => {
        try {
            const res = await ctx.prisma.contact.create({
                data: input
            });

            return res;
        } catch (error) {
            ServerErrorHandler(error)
        }
    }),

  getAll: publicProcedure.input(ContactListSchema).query(async({ ctx, input }) => {
    const res = await ctx.prisma.contact.findMany();
    return res;
  }),

  delete: protectedProcedure.input(DeleteContactSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.contact.delete({where: {id: input.id}})
  }),

  deleteMany: protectedProcedure.input(z.object({ids: z.array(z.number()).default([])})).mutation(async ({ctx, input}) => {
    return await ctx.prisma.contact.deleteMany({
      where: {
        id: {
          in: input.ids
        }
      }
    })
  }),

  update: protectedProcedure.input(UpdateContactConfigSchema).mutation(async ({ctx, input}) => {
    return await ctx.prisma.contact.update({where: {id: input.id}, data: input})
  }),
  get: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
    const res = await ctx.prisma.contact.findUnique({
      where: {id: input.id},
    })
    return res
  })
  
});