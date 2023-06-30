/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from 'next';
import React from 'react'
import { createInnerTRPCContext } from '~/server/api/trpc';
import { getServerAuthSession } from '~/server/auth';
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '@/server/api/root';
import SuperJSON from 'superjson';

import PageViwer from '@/components/page/PageViwer';

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ slug: string }>
) {
    const helpers = createServerSideHelpers({
        ctx: createInnerTRPCContext({ session: await getServerAuthSession({ ...context }) }),
        router: appRouter,
        transformer: SuperJSON,
    });

    const slug = context.params?.slug;

    const res = await helpers.page.get.fetch({ slug: slug || '' })

    if (!res) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            trpcState: helpers.dehydrate(),
            page: JSON.parse(JSON.stringify(res))
        }
    }
}

const ViewPage = ({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    return (
        <div>
            <PageViwer page={page} />
        </div>
    )
}

export default ViewPage