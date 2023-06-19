import React, { type ReactNode, useRef } from 'react'

import { api } from '@/utils/api';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { LoginLink } from '@prisma/client';
import { toast } from 'react-toastify';

const DeleteLoginLinkButton = ({
    children,
    link,
    onDelete
}: {
    link: LoginLink,
    onDelete?: (link: LoginLink) => void,
    children?: React.ReactElement | ((params: {deleteQuery: () => Promise<void>, isLoading?: boolean, error: any}) => ReactNode)
}) => {
    const deleteMutation = api.loginlink.delete.useMutation();
    const ctx = api.useContext().loginlink;

    const deleteQuery = async () => {
        if(deleteMutation.isLoading)return;
        try {
            const res = await deleteMutation.mutateAsync({id: link.id});
            if(res){
                onDelete?.(res)
                await ctx.invalidate();
            }
            toast("Login link deleted successfully!")
        } catch (error) {
            toast.error("Operation failed")
            console.error(error);
        }
    }


    return (
        <>

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

export default DeleteLoginLinkButton