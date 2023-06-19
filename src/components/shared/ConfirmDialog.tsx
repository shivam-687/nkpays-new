import React, { PropsWithChildren, ReactNode, useImperativeHandle, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';



export type HandleConfirmDialog = {
    openDialog: () => void,
    closeDialog: () => void,
    toggle: () => void;
}

export type GreetAfterSubmissionDialogProps = {
    trigger?: React.ReactNode,
    title?: ReactNode,
    desc?: ReactNode,
    onConfirm?: () => void,
    onChancel?: () => void,
    confirmText?: string,
    confirmClassName?: string,
    cancleText?: string,
    cancleClassName?: string
}

const ConfirmDialog = React.forwardRef<HandleConfirmDialog, PropsWithChildren<GreetAfterSubmissionDialogProps>>((props, ref) => {
    const [open, setOpen] = useState(false) 

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
    }

    const toggle = () => {
        setOpen(prev => !prev)
    }

    const handleOnOpen = (openState: boolean) => {
        if(open !== openState) setOpen(openState);
    }

    const handleCancle = () => {
        props.onChancel ? props.onChancel() : closeDialog()
    }
    const handleOk = () => {
        props.onConfirm ? props.onConfirm() : closeDialog()
    }
    useImperativeHandle(
      ref,
      () => ({
        openDialog,
        closeDialog,
        toggle
      }),
      [],
    )

    return ( 
        <AlertDialog open={open}>
            {
                props.trigger
                &&
                <AlertDialogTrigger onClick={openDialog}>{props.trigger}</AlertDialogTrigger>
            }
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                    {props.children}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={props.cancleClassName} onClick={handleCancle}></AlertDialogCancel>
                    <AlertDialogAction className={props.confirmClassName} onClick={handleOk}>{props.confirmText||'Ok'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
})

ConfirmDialog.displayName = 'ConfirmationDialog';

export default ConfirmDialog