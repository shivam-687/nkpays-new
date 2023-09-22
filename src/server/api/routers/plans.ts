/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { createPaginator } from 'prisma-pagination';
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { type Plan, type Prisma } from '@prisma/client';
import { z } from 'zod';
import { CreatePlanSchema, DeletePlanSchema, GetPlanByIdSchema, ListPlanSchema, PlanData, UpdatePlanSchema } from '@/schema/PlanSchema';

const paginate = createPaginator({ perPage: 30 })

export const PlansRouter = createTRPCRouter({
    create: publicProcedure
        .input(CreatePlanSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const alredyExist = await ctx.prisma.plan.findFirst({
                    where: { title: input.title }
                });

                if (alredyExist) {
                    return alredyExist;
                }
                const res = await ctx.prisma.plan.create({
                    data: input
                });

                return res;
            } catch (error) {
                ServerErrorHandler(error)
            }
        }),

    
    getAll: publicProcedure.input(ListPlanSchema).query(async ({ ctx, input }) => {
        const { search, sortBy, pagination } = input;
        const res = await paginate<PlanData, Prisma.PlanFindManyArgs>(ctx.prisma.plan, {
            where: {
                OR: search ? {
                    title: {
                        contains: input.search,
                        mode: 'insensitive'
                    }
                } : undefined
            },
            orderBy: sortBy || { order: 'asc' },

            include: {
                schemes: true,
                _count: {
                    select: {
                        Leads: true
                    }
                }
            }
        }, pagination)

        return res;
    }),

    getById: publicProcedure.input(GetPlanByIdSchema).query(async ({ ctx, input }) => {
        const { id } = input;

        const res = await ctx.prisma.plan.findFirst({
            where: { id },
            include: {
                schemes: true,
                _count: {
                    select: {
                        Leads: true
                    }
                }
            },

        })
        return res;
    }),

    delete: protectedProcedure.input(DeletePlanSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.plan.delete({ where: { id: input.id } })
    }),

    deleteMany: protectedProcedure.input(z.object({ ids: z.array(z.number()).default([]) })).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.plan.deleteMany({
            where: {
                id: {
                    in: input.ids
                }
            }
        })
    }),

    update: protectedProcedure.input(UpdatePlanSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.plan.update({
            where: { id: input.id },
            data: input,
            select: {
                schemes: true
            }
        })
    })
});
