import React, { type ReactNode, useRef } from 'react'
import ConfirmDialog, { type HandleConfirmDialog } from '../shared/ConfirmDialog'
import { api } from '@/utils/api';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { type Product } from '@prisma/client';
import { toast } from 'react-toastify';
import { type ProductListItem } from '@/schema/product.schema';

const DeleteProductButton = ({
    children,
    product,
    onDelete
}: {
    product: ProductListItem,
    onDelete?: (query: Product) => void,
    children?: React.ReactElement | ((params: {deleteQuery: () => Promise<void>, isLoading?: boolean, error: any}) => ReactNode)
}) => {
    const dialog = useRef<HandleConfirmDialog>(null);
    const deleteMutation = api.product.delete.useMutation();
    const ctx = api.useContext().contact_query;

    const deleteQuery = async () => {
        if(deleteMutation.isLoading)return;
        try {
            const res = await deleteMutation.mutateAsync({id: product.id});
            if(res){
                onDelete?.(res)
                await ctx.invalidate();
            }
            toast("Product deleted successfully!")
        } catch (error) {
            toast.error("Operation failed")
            console.error(error);
        }
    }


    return (
        <>
            <ConfirmDialog ref={dialog} confirmClassName='destructive' title="Are you sure to do this?">
                <p>This row is deleted after you click this confirm.</p>
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

export default DeleteProductButton