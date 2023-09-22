/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { type PaginationMeta } from "@/lib/types/PaginationMeta"
import { type PlanData } from "@/schema/PlanSchema"
import { type PaginateOptions } from "prisma-pagination"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from "../ui/checkbox"
import Link from "next/link"
import { formateCurrency } from "@/lib/utils"
import dayjs from "dayjs"
import { Button } from "../ui/button"
import { EditIcon, MoreHorizontal } from "lucide-react"
import DeletePlanButton from "./DeletePlanTable"
import { api } from "@/utils/api"
import { toast } from "react-toastify"
import DataTable from "../ui/DataTable"
import PlanFormDialog from "./PlanFormDialog"


export type PlanTableProps = {
    data: PlanData[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    loading?: boolean
}

const Columns: ColumnDef<PlanData>[] = [
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
        accessorKey: 'title',
        header: 'Title',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                <Link href={`/admin/plans/${row.original.id}`}>{row.original.title}</Link>
            </div>
        },
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell({ row }) {
            return <div className='flex items-center justify-between'>
                {
                    row.original.price ? <span>{formateCurrency(parseInt(row.original.price))}</span> : <span>--</span>
                }
            </div>
        },
    },
    {
        accessorKey: 'schemes',
        header: 'Schemes',
        cell({ row }) {
            return row.original.schemes.length
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
                <div className="flex items-center justify-end gap-3" >

                    <PlanFormDialog 
                    plan={query}
                    trigger={<Button variant={'ghost'} size={'sm'}><EditIcon className="w-4 h-4"/></Button>}
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
                            <DropdownMenuItem >
                                <DeletePlanButton data={query} >
                                    {({ deleteQuery, isLoading }) => {
                                        return (
                                            <span onClick={() => void deleteQuery()} className='text-red-700'>Delete</span>
                                        )
                                    }}
                                </DeletePlanButton>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
]


const PlansTable = ({
    data,
    paginationData,
    onPaginationChange,
    loading
}: PlanTableProps) => {
    const deleteManyMutation = api.plans.deleteMany.useMutation();
    const ctx = api.useContext().product_enquiry;

    async function deleteManyProductEnquiry(ids: number[]) {
        try {
            await deleteManyMutation.mutateAsync({ ids });
            void ctx.invalidate();
            toast.success('Plan deleted successfully')
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            toast.error(error.message)
        }
    }
    return (
        <DataTable dataLoading={loading} onDeleteMany={d => deleteManyProductEnquiry(d.map(v => v.id))} columns={Columns} data={data} paginationData={paginationData} onPaginationChange={onPaginationChange} />
    )
}

export default PlansTable