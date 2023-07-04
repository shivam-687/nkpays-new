import React, { useState } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, CopyCheck } from 'lucide-react';
export type CopyButtonProps = {
    text?: string,
    onCopied?: (text: string) => void,
} & ButtonProps;

const CopyButton = ({
    text,
    onCopied,
    variant='ghost',
    ...props
}: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if(!text) return;
        await copyToClipboard(text)
        setCopied(true);
        onCopied?.(text);
        setTimeout(() => {
            setCopied(false)
        }, 2000);
    }
    
  return (
    <Button {...props} variant={variant} onClick={() => void handleCopy()} >
        {
            copied ? 
            <Check className="w-4 h-4"/> :
            <Copy  className="w-4 h-4"/>
        }
    </Button>
  )
}

export default CopyButton