/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { type ReactNode, useRef } from 'react'
import ConfirmDialog, { type HandleConfirmDialog } from '../shared/ConfirmDialog'
import { api } from '@/utils/api';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { Scheme, type Plan,  } from '@prisma/client';
import { toast } from 'react-toastify';
import { type PlanData } from '@/schema/PlanSchema';

const DeleteSchemeButton = ({
    children,
    data,
    onDelete
}: {
    data: Scheme,
    onDelete?: (query: Scheme) => void,
    children?: React.ReactElement | ((params: {deleteQuery: () => Promise<void>, isLoading?: boolean, error: any}) => ReactNode)
}) => {
    const dialog = useRef<HandleConfirmDialog>(null);
    const deleteMutation = api.schemes.delete.useMutation();
    const ctx = api.useContext().schemes;

    const deleteQuery = async () => {
        if(deleteMutation.isLoading)return;
        try {
            const res = await deleteMutation.mutateAsync({id: data.id});
            if(res){
                onDelete?.(res)
                await ctx.invalidate();
            }
            toast("Scheme deleted successfully!")
        } catch (error) {
            toast.error("Operation failed")
            console.error(error);
        }
    }


    return (
        <>
            <ConfirmDialog ref={dialog} confirmClassName='destructive' title="Are you sure to do this?">
                <p>This scheme is deleted after you click this confirm.</p>
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

export default DeleteSchemeButton