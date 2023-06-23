/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { ContactQueryColumns } from '@/components/contactQuery/table/Columns'
import DataTable from '@/components/ui/DataTable'
import { api } from '@/utils/api'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ContactQueryPage = () => {
  const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
  const {data: queries, refetch} = api.contact_query.getAll.useQuery({pagination});
  const deleteManyMutation = api.product.deleteMany.useMutation();
    const ctx = api.useContext().product;

    async function deleteMany(ids: number[]) {
        try {
            await deleteManyMutation.mutateAsync({ ids });
            void ctx.invalidate();
            toast.success('Queries deleted successfully')
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            toast.error(error.message)
        }
    }

  return (
    <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Contact Query</h1>

            <div>

            </div>
        </div>

        <div className='mt-10'>
            <DataTable onDeleteMany={d => deleteMany(d.map(v => v.id))} columns={ContactQueryColumns} data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
        </div>
    </div>
  )
}

export default ContactQueryPage