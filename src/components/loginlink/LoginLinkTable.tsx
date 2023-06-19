
import React from 'react'
import {type ColumnDef} from '@tanstack/react-table'
import DataTable from '../ui/DataTable'
import { type PaginationMeta } from '@/lib/types/PaginationMeta'
import { type PaginateOptions } from 'prisma-pagination'
import dayjs from 'dayjs'
import { type ProductEnquiryListItem } from '@/schema/productEnquiry'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Edit, Eye, MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteLoginLinkButton from './DeleteLoginLink'
import { LoginLink } from '@prisma/client'
import MutateLoginLinkDialog from './MutateLoginLinkDialog'

export type LoginLinkTableProps = {
    data: LoginLink[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void
}

const Columns: ColumnDef<LoginLink>[] = [
   
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'link',
        header: 'Link'
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
                <div className='flex items-center gap-3 justify-end'>
                    <MutateLoginLinkDialog 
                            link={query}
                            trigger={<Button size={'sm'} variant={'ghost'}><Edit className='w-4 h-4'/></Button>}
                            />

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
                            onClick={() => void navigator.clipboard.writeText(query.link)}
                        >
                            Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >
                            <DeleteLoginLinkButton link={query} >
                                {({deleteQuery, isLoading}) => {
                                    return (
                                        <span onClick={() => void deleteQuery()} className='text-red-700 cursor-pointer w-full'>Delete</span>
                                    )
                                }}
                            </DeleteLoginLinkButton>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            )
        },
    }
    

]

const LoginLinkTable = ({
    data,
    paginationData,
    onPaginationChange
}: LoginLinkTableProps) => {
  return (
    <DataTable columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
  )
}

export default LoginLinkTable