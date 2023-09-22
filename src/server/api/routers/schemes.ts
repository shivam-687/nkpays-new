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
import { type Prisma } from '@prisma/client';
import { z } from 'zod';
import { CreateScemeSchema, DeleteShemeSchema, ListSchemeSchema, type SchemeData, UpdateSchemeSchema } from '@/schema/SchemeSchema';

const paginate = createPaginator({ perPage: 30 })

export const SchemaRouter = createTRPCRouter({
    create: publicProcedure
        .input(CreateScemeSchema)
        .mutation(async ({ ctx, input }) => {
            const {planId, ...rest} = input;
            try {
                const alredyExist = await ctx.prisma.scheme.findFirst({
                    where: { name: input.name, planId: input.planId }
                });

                if (alredyExist) {
                    return alredyExist;
                }
                const res = await ctx.prisma.scheme.create({
                    data: {
                        Plan: {
                            connect: {
                                id: planId
                            }
                        },
                        ...rest
                    }
                });

                return res;
            } catch (error) {
                ServerErrorHandler(error)
            }
        }),

    getAll: publicProcedure.input(ListSchemeSchema).query(async ({ ctx, input }) => {
        const { search, sortBy, pagination, planId } = input;
        const res = await paginate<SchemeData, Prisma.SchemeFindManyArgs>(ctx.prisma.scheme, {
            where: {
                OR: search ? {
                    name: {
                        contains: input.search,
                        mode: 'insensitive'
                    }
                }: undefined,
                AND:  {
                    planId
                }
            },
            orderBy: sortBy || { order: 'asc' },
            include: {
                _count: {
                    select: {
                        Leads: true
                    }
                }
            }
        }, pagination)

        return res;
    }),

    getAllByPlanId: publicProcedure.input(z.object({planId: z.number()})).query(async ({ctx, input}) => {
        return await ctx.prisma.scheme.findMany({
            where: {
                planId: input.planId
            }
        })
    }),

    delete: protectedProcedure.input(DeleteShemeSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.scheme.delete({ where: { id: input.id } })
    }),

    deleteMany: protectedProcedure.input(z.object({ ids: z.array(z.number()).default([]) })).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.scheme.deleteMany({
            where: {
                id: {
                    in: input.ids
                }
            }
        })
    }),

    update: protectedProcedure.input(UpdateSchemeSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.scheme.update({ where: { id: input.id }, data: input })
    })
});