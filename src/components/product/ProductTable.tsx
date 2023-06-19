import React from 'react'
import {type ColumnDef} from '@tanstack/react-table'
import { type ProductListItem } from '@/schema/product.schema'
import DataTable from '../ui/DataTable'
import { PaginationMeta } from '@/lib/types/PaginationMeta'
import { PaginateOptions } from 'prisma-pagination'
import dayjs from 'dayjs'

export type ProductTableProps = {
    data: ProductListItem[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void
}

const Columns: ColumnDef<ProductListItem>[] = [
    {
        accessorKey: 'thumbnail',
        header: 'Image',
        cell({row}) {
            return <div className='w-6 h-6 rounded bg-slate-500 bg-center bg-contain bg-no-repeat' style={{backgroundImage: `url(${row.original?.thumbnail||''})`}}></div>
        },
    },
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: '_count.ProductEnquiry',
        header: 'Enquiries'
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell({row}) {
            const data = row.original;
            return dayjs(data.createdAt).format('DD/MM/YYYY')
        },
    },
    

]

const ProductTable = ({
    data,
    paginationData,
    onPaginationChange
}: ProductTableProps) => {
  return (
    <DataTable columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
  )
}

export default ProductTable