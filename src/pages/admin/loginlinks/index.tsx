import LoginLinkTable from '@/components/loginlink/LoginLinkTable'
import MutateLoginLinkDialog from '@/components/loginlink/MutateLoginLinkDialog'
import ProductEnquiryTable from '@/components/productEnquiry/ProductEnquiryTable'
import { Button } from '@/components/ui/button'
import { api } from '@/utils/api'
import { Plus } from 'lucide-react'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useState } from 'react'

const LoginLinkPage = () => {
  const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
  const {data: queries} = api.loginlink.getAll.useQuery({pagination});
  

  return (
    <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Login Links</h1>

            <div>
                <MutateLoginLinkDialog 
                trigger={<Button><Plus/> Create</Button>}
                 />
            </div>
        </div>

        <div className='mt-10'>
            <LoginLinkTable data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
        </div>
    </div>
  )
}

export default LoginLinkPage