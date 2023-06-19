
import React from 'react'
import {type ColumnDef} from '@tanstack/react-table'
import DataTable from '../ui/DataTable'
import { type PaginationMeta } from '@/lib/types/PaginationMeta'
import { type PaginateOptions } from 'prisma-pagination'
import dayjs from 'dayjs'
import { type ProductEnquiryListItem } from '@/schema/productEnquiry'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Eye, MoreHorizontal } from 'lucide-react'
import DeleteProductEnquiryButton from './ProductEnquiryDeleteButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ProductTableProps = {
    data: ProductEnquiryListItem[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void
}

const Columns: ColumnDef<ProductEnquiryListItem>[] = [
   
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'product',
        header: 'Product',
        cell({row}) {
            const data = row.original;
            return <div className='flex justify-between items-center'>
                <p className='line-clamp-1'>{data.product.title}</p>
                <Link href={`/admin/products/${data.product.id}`}>
                    <Button size={'sm'} variant={'outline'} title={'View Product'}><Eye/></Button>
                </Link>
                </div>
        },
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
                        <DropdownMenuItem
                            onClick={() => void navigator.clipboard.writeText(query.email)}
                        >
                            Copy Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={`/admin/contactQuery/${query.id}`}>View Query</Link></DropdownMenuItem>
                        <DropdownMenuItem >
                            <DeleteProductEnquiryButton enquiry={query} >
                                {({deleteQuery, isLoading}) => {
                                    return (
                                        <span onClick={() => void deleteQuery()} className='text-red-700'>Delete</span>
                                    )
                                }}
                            </DeleteProductEnquiryButton>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
    

]

const ProductEnquiryTable = ({
    data,
    paginationData,
    onPaginationChange
}: ProductTableProps) => {
  return (
    <DataTable columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
  )
}

export default ProductEnquiryTable