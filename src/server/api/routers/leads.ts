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
import { Leads, type Prisma } from '@prisma/client';
import { z } from 'zod';
import { DeletePlanSchema, GetPlanByIdSchema, UpdatePlanSchema } from '@/schema/PlanSchema';
import { CreateLeadSchema, DeleteLeadSchema, GetSLeadByIdSchema, LeadData, ListLeadSchema, UpdateLeadSchema } from '@/schema/LeadSchema';

const paginate = createPaginator({ perPage: 30 })

export const LeadsRouter = createTRPCRouter({
    create: publicProcedure
        .input(CreateLeadSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const res = await ctx.prisma.leads.create({
                    data: input
                });

                return res;
            } catch (error) {
                ServerErrorHandler(error)
            }
        }),

    getAll: publicProcedure.input(ListLeadSchema).query(async ({ ctx, input }) => {
        const { search, sortBy, pagination } = input;
        const res = await paginate<LeadData, Prisma.LeadsFindManyArgs>(ctx.prisma.leads, {
            where: {
                OR: search ? {
                    name: {
                        contains: input.search,
                        mode: 'insensitive'
                    },
                    email: {
                        contains: input.search,
                        mode: 'insensitive'
                    }
                } : undefined
            },
            orderBy: sortBy || { createdAt: 'asc' },
            include: {
                Plan: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                Scheme: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }, pagination)

        return res;
    }),

    getById: publicProcedure.input(GetSLeadByIdSchema).query(async ({ ctx, input }) => {
        const { id } = input;
        const res = await ctx.prisma.leads.findFirst({
            where: { id },
            include: {
                Plan: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                Scheme: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return res;
    }),

    delete: protectedProcedure.input(DeleteLeadSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.leads.delete({ where: { id: input.id } })
    }),

    deleteMany: protectedProcedure.input(z.object({ ids: z.array(z.number()).default([]) })).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.leads.deleteMany({
            where: {
                id: {
                    in: input.ids
                }
            }
        })
    }),

    update: protectedProcedure.input(UpdateLeadSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.leads.update({
            where: { id: input.id },
            data: input,
            include: {
                Plan: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                Scheme: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    })
});
