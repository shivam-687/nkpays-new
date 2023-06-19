
import ProductEnquiryTable from '@/components/productEnquiry/ProductEnquiryTable'
import { api } from '@/utils/api'
import { type PaginateOptions } from 'prisma-pagination'
import React, { useState } from 'react'

const ProductEnquiryPage = () => {
  const [pagination, setPagination] = useState<PaginateOptions|undefined>({page: 1, perPage: 10})
  const {data: queries} = api.product_enquiry.getAll.useQuery({pagination});
  

  return (
    <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Product Enquiries</h1>
            
        </div>

        <div className='mt-10'>
            <ProductEnquiryTable data={queries?.data||[]} paginationData={queries?.meta} onPaginationChange={(value) => setPagination(value)} />
        </div>
    </div>
  )
}

export default ProductEnquiryPage