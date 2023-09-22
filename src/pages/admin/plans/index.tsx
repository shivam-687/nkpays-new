import PlanFormDialog from '@/components/plan/PlanFormDialog'
import PlansTable from '@/components/plan/PlansTable'
import { Button } from '@/components/ui/button'
import { api } from '@/utils/api'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useState } from 'react'

const PlansPage = () => {
    const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
    const {data: queries, isLoading} = api.plans.getAll.useQuery({pagination});
    
  
    return (
      <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold'>Plans</h1>
              <PlanFormDialog/>
          </div>
  
          <div className='mt-10'>
              <PlansTable loading={isLoading} data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
          </div>
      </div>
    )
}

export default PlansPage