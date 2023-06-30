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
import DeletePageButton from './DeletePageButton';
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
import { Page } from '@prisma/client'


export type ProductTableProps = {
    data: Page[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    loading?: boolean
}

const Columns: ColumnDef<Page>[] = [
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
            return <Link href={`/admin/page/${row.original.id}`} className='capitalize hover:underline'>{row.original.name}</Link>
        },
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
        cell({ row }) {
            return <Link title={row.original.slug||'#'}  href={`/admin/page/${row.original.id}`} className=' hover:underline line-clamp-1'>{row.original.slug}</Link>
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
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell({ row }) {
            const data = row.original;
            return dayjs(data.updatedAt).format('DD/MM/YYYY')
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
                        <DropdownMenuItem>
                            <Link href={`/admin/page/${query.id}`}>Edit Page</Link>
                        </DropdownMenuItem>


                        <DropdownMenuSeparator />


                        <DropdownMenuItem >
                            <DeletePageButton page={query} >
                                {({ deleteQuery, isLoading }) => {
                                    return (
                                        <span onClick={() => void deleteQuery()} className='text-red-700'>Delete</span>
                                    )
                                }}
                            </DeletePageButton>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }


]

const PageTable = ({
    data,
    paginationData,
    onPaginationChange,
    loading
}: ProductTableProps) => {
    const deleteManyMutation = api.page.deleteMany.useMutation();
    const ctx = api.useContext().page;

    async function deleteManyPages(ids: number[]) {
        try {
            await deleteManyMutation.mutateAsync({ ids });
            void ctx.invalidate();
            toast.success('Page Content deleted successfully')
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            toast.error(error.message)
        }
    }
    return (
        <DataTable dataLoading={loading} onDeleteMany={d => deleteManyPages(d.map(v => v.id))} columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
    )
}

export default PageTable