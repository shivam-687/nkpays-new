import React from 'react'
import { type ColumnDef } from "@tanstack/react-table"
import { type ContactQuery } from '@prisma/client'
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import DeleteContactQueryButton from '../DeleteContactQueryButton'
import { Checkbox } from '@/components/ui/checkbox'
import ContactQueryDrawer from '../ContactQueryDrawer'
import CopyButton from '@/components/shared/CopyButton'

export const ContactQueryColumns: ColumnDef<ContactQuery>[] = [
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
        accessorKey: "name",
        header: "Name",
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <ContactQueryDrawer query={row.original} trigger={<span className='font-medium hover:underline cursor-pointer'>{row.original.name}</span>} />
            </div>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <span>{row.original.email}</span>
                <CopyButton  size={'sm'} text={row.original.email}/>
                
            </div>
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <span>{row.original.phone}</span>
                {
                    row.original.phone && <CopyButton  size={'sm'} text={row.original.phone}/>
                }
            </div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        
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
                        <DropdownMenuItem >
                            <DeleteContactQueryButton contactQuery={query} >
                                {({deleteQuery, isLoading}) => {
                                    return (
                                        <span onClick={() => void deleteQuery()} className='text-red-700'>Delete</span>
                                    )
                                }}
                            </DeleteContactQueryButton>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]