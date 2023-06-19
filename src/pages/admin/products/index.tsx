
import ProductTable from '@/components/product/ProductTable'
import { Button } from '@/components/ui/button'
import { api } from '@/utils/api'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useEffect, useState } from 'react'

const ProductAdminPage = () => {
  const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
  const {data: queries} = api.product.getAll.useQuery({pagination});
  

  return (
    <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Products</h1>
            <div>
              <Link href={'/admin/products/create'}><Button  variant={'glow'}><span><Plus/></span> Create</Button></Link>
            </div>
        </div>

        <div className='mt-10'>
            <ProductTable data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
        </div>
    </div>
  )
}

export default ProductAdminPage