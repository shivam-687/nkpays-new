/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import DataTable from '../ui/DataTable'
import { type PaginationMeta } from '@/lib/types/PaginationMeta'
import { type PaginateOptions } from 'prisma-pagination'
import dayjs from 'dayjs'
import { type ProductEnquiryListItem } from '@/schema/productEnquiry'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Eye, MoreHorizontal, View } from 'lucide-react'
import DeleteProductEnquiryButton from './ProductEnquiryDeleteButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from '../ui/checkbox'
import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import ProductEnquiryDialog from './ProductEnquiryFormDialog'
import ProductEnquiryDrawer from './ProductEnquiryDrawer'

export type ProductTableProps = {
    data: ProductEnquiryListItem[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    loading?: boolean
}

const Columns: ColumnDef<ProductEnquiryListItem>[] = [
    {
        id: "select",
        accessorKey: 'id',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'name',
        header: 'Name',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <ProductEnquiryDrawer query={row.original} trigger={<span className='font-medium hover:underline cursor-pointer'>{row.original.name}</span>} />
            </div>
        },
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'product',
        header: 'Product',
        cell({ row }) {
            const data = row.original;
            return (
                <div className='flex justify-between items-center group'>
                    <Link className='font-medium group-hover:underline' href={`/admin/products/${data.product.id}`}>
                        {data.product.title}
                    </Link>
                </div>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell({ row }) {
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
                        <DropdownMenuItem>
                            <Link href={`/admin/products/${query.productId}`}>View Product</Link>
                        </DropdownMenuItem>


                        <DropdownMenuSeparator />


                        <DropdownMenuItem >
                            <DeleteProductEnquiryButton enquiry={query} >
                                {({ deleteQuery, isLoading }) => {
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
    onPaginationChange,
    loading
}: ProductTableProps) => {
    const deleteManyMutation = api.product_enquiry.deleteMany.useMutation();
    const ctx = api.useContext().product_enquiry;

    async function deleteManyProductEnquiry(ids: number[]) {
        try {
            await deleteManyMutation.mutateAsync({ ids });
            void ctx.invalidate();
            toast.success('Products Enquiry deleted successfully')
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            toast.error(error.message)
        }
    }
    return (
        <DataTable dataLoading={loading} onDeleteMany={d => deleteManyProductEnquiry(d.map(v => v.id))} columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
    )
}

export default ProductEnquiryTable