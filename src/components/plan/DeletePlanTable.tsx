/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { type ReactNode, useRef } from 'react'
import ConfirmDialog, { type HandleConfirmDialog } from '../shared/ConfirmDialog'
import { api } from '@/utils/api';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { type Plan,  } from '@prisma/client';
import { toast } from 'react-toastify';
import { type PlanData } from '@/schema/PlanSchema';

const DeletePlanButton = ({
    children,
    data,
    onDelete
}: {
    data: PlanData,
    onDelete?: (query: Plan) => void,
    children?: React.ReactElement | ((params: {deleteQuery: () => Promise<void>, isLoading?: boolean, error: any}) => ReactNode)
}) => {
    const dialog = useRef<HandleConfirmDialog>(null);
    const deleteMutation = api.plans.delete.useMutation();
    const ctx = api.useContext().plans;

    const deleteQuery = async () => {
        if(deleteMutation.isLoading)return;
        try {
            const res = await deleteMutation.mutateAsync({id: data.id});
            if(res){
                onDelete?.(res)
                await ctx.invalidate();
            }
            toast("Plan deleted successfully!")
        } catch (error) {
            toast.error("Operation failed")
            console.error(error);
        }
    }


    return (
        <>
            <ConfirmDialog ref={dialog} confirmClassName='destructive' title="Are you sure to do this?">
                <p>This plan is deleted after you click this confirm.</p>
            </ConfirmDialog>

            {
                children && typeof children === 'function'
                    ?
                    children({
                        deleteQuery,
                        isLoading: deleteMutation.isLoading,
                        error: deleteMutation.error
                    })
                    :
                    <Button size={'sm'} variant={'destructive'}><Trash /></Button>
            }
        </>
    )
}

export default DeletePlanButton