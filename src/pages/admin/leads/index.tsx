import LeadsTable from '@/components/lead/LeadTable'
import { api } from '@/utils/api'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useState } from 'react'

const LeadsPage = () => {
    const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
    const {data: queries, isLoading} = api.leads.getAll.useQuery({pagination});
    
  
    return (
      <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold'>Leads</h1>
          </div>
  
          <div className='mt-10'>
              <LeadsTable loading={isLoading} data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
          </div>
      </div>
    )
}

export default LeadsPage