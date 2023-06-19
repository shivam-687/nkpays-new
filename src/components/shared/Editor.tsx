'use client'

import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})


const Editor = ({
    value,
    onChange,
    className
}: {
    value?: string,
    className?: string
    onChange: (value?: string) => void
}) => {

    return (
        <QuillNoSSRWrapper className={cn([
            className
        ])} theme="snow" value={value} onChange={onChange} />
    )
}

export default Editor