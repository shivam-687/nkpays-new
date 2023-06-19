import { PaginationMeta } from '@/lib/types/PaginationMeta'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { PaginateOptions } from 'prisma-pagination'

const TablePagination = ({
    paginationData,
    onPaginationChange,
    className
}: {
    paginationData?: PaginationMeta,
    onPaginationChange?: (value?: PaginateOptions) => void,
    className?: string
}) => {



    const handleNext = () => {
        const val = paginationData && {
            perPage: paginationData.perPage,
            page: paginationData?.next === null ? undefined : paginationData?.next
        }
        onPaginationChange?.(val);
    }
    const handlePrev = () => {
        const val = paginationData && {
            perPage: paginationData.perPage,
            page: paginationData?.prev === null ? undefined : paginationData?.prev
        }
        onPaginationChange?.(val);
    }
    return (
        <div className={cn([
            'flex justify-between ',
            className
        ])}>
            <div>
                <p className='text-gray-500 text-sm'>Total: {paginationData?.total || 0}</p>
            </div>
            <div className="flex gap-3">
                <Button onClick={() => handlePrev()} variant={'outline'} disabled={!Boolean(paginationData?.prev)}>Prev</Button>
                <Button onClick={() => handleNext()} variant={'outline'} disabled={!Boolean(paginationData?.next)}>Next</Button>
            </div>
        </div>
    )
}

export default TablePagination