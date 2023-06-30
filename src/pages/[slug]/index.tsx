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
import { NextSeo } from 'next-seo';
import { PageData } from '@/schema/page.schema';
import { env } from '@/env.mjs';

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
            page: JSON.parse(JSON.stringify(res)) as PageData
        }
    }
}

const ViewPage = ({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    return (
        <div>
            
            <NextSeo
                title={page.meta?.seoTitle||''}
                description={page.meta?.seoDesc}
                openGraph={{
                    title: page.meta?.seoTitle,
                    description: page.meta?.seoTitle,
                    url: env.NEXT_PUBLIC_SITE_URL,
                    images: []
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <PageViwer page={page} />
        </div>
    )
}

export default ViewPage