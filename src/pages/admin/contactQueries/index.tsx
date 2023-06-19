
import { ContactQueryColumns } from '@/components/contactQuery/table/Columns'
import DataTable from '@/components/ui/DataTable'
import { api } from '@/utils/api'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useEffect, useState } from 'react'

const ContactQueryPage = () => {
  const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
  const {data: queries, refetch} = api.contact_query.getAll.useQuery({pagination});
  

  return (
    <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Contact Query</h1>

            <div>

            </div>
        </div>

        <div className='mt-10'>
            <DataTable columns={ContactQueryColumns} data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
        </div>
    </div>
  )
}

export default ContactQueryPage