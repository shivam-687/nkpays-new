import React from 'react'
import {type ColumnDef} from '@tanstack/react-table'
import { type ProductListItem } from '@/schema/product.schema'
import DataTable from '../ui/DataTable'
import { PaginationMeta } from '@/lib/types/PaginationMeta'
import { PaginateOptions } from 'prisma-pagination'
import dayjs from 'dayjs'
import { formateCurrency } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import DeleteProductButton from './DeleteProductButton'

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
        accessorKey: 'price',
        header: 'Price',
        cell({row}){
            return formateCurrency(Number(row.original.price)||0)
        }
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

    {
        id: "actions",
        cell: ({ row, column, table }) => {
            const query = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={`/admin/products/${query.id}`}>Edit</Link></DropdownMenuItem>
                        <DropdownMenuItem >
                            <DeleteProductButton product={query} >
                                {({deleteQuery, isLoading}) => {
                                    return (
                                        <span onClick={() => void deleteQuery()} className='text-red-700'>Delete</span>
                                    )
                                }}
                            </DeleteProductButton>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
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