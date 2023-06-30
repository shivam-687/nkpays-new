/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { api } from '@/utils/api'
import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from 'next';
import React from 'react'
import { createInnerTRPCContext } from '~/server/api/trpc';
import { getServerAuthSession } from '~/server/auth';
import {createServerSideHelpers} from '@trpc/react-query/server'
import { appRouter } from '@/server/api/root';
import SuperJSON from 'superjson';
import {TailSpin} from 'react-loader-spinner';
import PageForm from '@/components/page/PageForm';
import { type Page } from '@prisma/client';

export async function getServerSideProps(
  context: GetServerSidePropsContext<{id: string}>
){
  const helpers = createServerSideHelpers({
    ctx: createInnerTRPCContext({session: await getServerAuthSession({...context})}),
    router: appRouter,
    transformer: SuperJSON,
  });

  const id = context.params?.id;
  if(!id || Number.isNaN(parseInt(id))) return {
    notFound: true
  };
  const res = await helpers.product.get.prefetch({id: Number(id)})
  // if(!res){
  //   return {
  //     notFound: true
  //   };
  // }

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    }
  }
}

const EditPage = ({id}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {data, isLoading} = api.page.getById.useQuery({id: Number(id)})

  if(isLoading){
    return <div className='min-h-[50vh] flex items-center justify-center'>
      <TailSpin
      width={50}
      height={50}
      color='black'
      />
    </div>
  }

  if(!data) {
    return <div className='min-h-[50vh] flex items-center justify-center'>
    <span>No Product Found</span>
  </div>
  }
  return (
    <div>
      <PageForm data={data as Page}/>
    </div>
  )
}

export default EditPage