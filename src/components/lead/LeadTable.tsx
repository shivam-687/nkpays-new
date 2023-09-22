/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { type PaginationMeta } from "@/lib/types/PaginationMeta"
import { type PaginateOptions } from "prisma-pagination"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from "../ui/checkbox"
import { formateCurrency } from "@/lib/utils"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { api } from "@/utils/api"
import { toast } from "react-toastify"
import DataTable from "../ui/DataTable"
import DeleteLeadButton from "./DeleteLeadButton"
import { LeadData } from "@/schema/LeadSchema"
import CopyButton from "../shared/CopyButton"
import LeadStatusChanger from "./LeadStatusChanger"
import ViewLeadDrawer from "./ViewLeadDrawer"



export type LeadTableProps = {
    data: LeadData[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    loading?: boolean
}

const Columns: ColumnDef<LeadData>[] = [
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
                <ViewLeadDrawer data={row.original} trigger={<span className='font-medium hover:underline cursor-pointer'>{row.original.name}</span>} />
            </div>
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <span>{row.original.email}</span>
                {
                    row.original.email && <CopyButton size={'sm'} text={row.original.email} />
                }
            </div>
        }
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
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
        accessorKey: 'Plan',
        header: 'Plan',
        cell({ row }) {
            return row.original.Plan?.title
        },
    },
    {
        accessorKey: 'utrNo',
        header: 'UTR No.',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <span>{row.original.utrNo || '__'}</span>
                {
                    row.original.utrNo && <CopyButton  size={'sm'} text={row.original.utrNo}/>
                }
            </div>
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <LeadStatusChanger lead={row.original}/>
            </div>
        },
    },
    {
        id: "actions",
        cell: ({ row, column, table }) => {
            const query = row.original

            return (
                <div className="flex items-center justify-end gap-3" >

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem >
                                <DeleteLeadButton data={query} >
                                    {({ deleteQuery, isLoading }) => {
                                        return (
                                            <span onClick={() => void deleteQuery()} className='text-red-700'>Delete</span>
                                        )
                                    }}
                                </DeleteLeadButton>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
]


const LeadsTable = ({
    data,
    paginationData,
    onPaginationChange,
    loading
}: LeadTableProps) => {
    const deleteManyMutation = api.leads.deleteMany.useMutation();
    const ctx = api.useContext().schemes;

    async function deleteManyProductEnquiry(ids: number[]) {
        try {
            await deleteManyMutation.mutateAsync({ ids });
            void ctx.invalidate();
            toast.success('Lead deleted successfully')
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            toast.error(error.message)
        }
    }
    return (
        <DataTable dataLoading={loading} onDeleteMany={d => deleteManyProductEnquiry(d.map(v => v.id))} columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
    )
}

export default LeadsTable