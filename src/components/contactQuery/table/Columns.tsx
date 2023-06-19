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

export const ContactQueryColumns: ColumnDef<ContactQuery>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
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
                        <DropdownMenuItem><Link href={`/admin/contactQuery/${query.id}`}>View Query</Link></DropdownMenuItem>
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