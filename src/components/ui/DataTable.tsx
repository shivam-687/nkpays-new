
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { type PaginationMeta } from "@/lib/types/PaginationMeta"
  import React from "react"
  import TablePagination from "@/components/shared/TablePagination"
  import { type PaginateOptions } from "prisma-pagination"
  
  interface ContactQueryTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void
  }
  
  function DataTable<TData, TValue>({
    columns,
    data,
    paginationData,
    onPaginationChange
  }: ContactQueryTableProps<TData, TValue>) {
    // const [pgState, setPgState] = useState<PaginationState>({ pageIndex: paginationData?.currentPage ? paginationData?.currentPage-1 :0,pageSize: paginationData?.perPage||10,})
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
     
    })
  
    return (
      <div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="py-4">
          <TablePagination paginationData={paginationData} onPaginationChange={onPaginationChange}/>
        </div>
      </div>
    )
  }
  
  
  export default DataTable;
  