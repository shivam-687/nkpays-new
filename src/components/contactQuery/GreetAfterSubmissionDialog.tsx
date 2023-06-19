import React, { PropsWithChildren, useImperativeHandle, useState } from 'react'
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



export type HandleContactQueryGreetDialog = {
    openDialog: () => void,
    closeDialog: () => void,
    toggle: () => void;
}

export type GreetAfterSubmissionDialogProps = {
    trigger?: React.ReactNode,
}

const GreetAfterSubmissionDialog = React.forwardRef<HandleContactQueryGreetDialog, PropsWithChildren<GreetAfterSubmissionDialogProps>>((props, ref) => {
    const [open, setOpen] = useState(false) 

    const openDialog = () => {
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
        }, 4000);
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
                <AlertDialogTrigger>{props.trigger}</AlertDialogTrigger>
            }
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>We Contact you very soon!</AlertDialogTitle>
                    <AlertDialogDescription>
                    <Image width={500} height={340} src="/assets/images/thankyou.png" alt="" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={closeDialog}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
})

GreetAfterSubmissionDialog.displayName = 'GreetAfterSubmissionDialog';

export default GreetAfterSubmissionDialog