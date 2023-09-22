/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { api } from '@/utils/api';
import SchemeFormDialog from '@/components/schemes/SchemeFormDialog';
import SchemeTable from '@/components/schemes/SchemeTable';
import { PaginateOptions } from 'prisma-pagination';

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  if (typeof id !== 'string') {
    return {
      notFound: true
    }
  }

  if (isNaN(parseInt(id))) {
    return {
      notFound: true
    }
  }
  return { props: { id } }
}

const SinglePlan = ({
  id
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
  const { data, isLoading } = api.plans.getById.useQuery({ id: parseInt(id) });
  const { data: schemes, isLoading: schemeLoading } = api.schemes.getAll.useQuery({ planId: parseInt(id), pagination });

  if (!data && !isLoading) {
    return <div className='min-h-screen flex justify-center items-center'>
      <h1 className='text-4xl font-bold'>Plan not found!</h1>
    </div>
  }

  if (isLoading) {
    return <div className='min-h-screen flex justify-center items-center'>
      <h1 className='text-xl font-bold'>Plan schemes loading...</h1>
    </div>
  }
  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{`${data?.title||''} Plan`}</h1>
        <SchemeFormDialog planId={parseInt(id)} />
      </div>

      <div className='mt-10'>
        <SchemeTable loading={schemeLoading} data={schemes?.data || []} paginationData={schemes?.meta} onPaginationChange={(value) => setPagination(value)} />
      </div>
    </div>
  )
}

export default SinglePlan