import { cn } from '@/lib/utils'
import React from 'react'

export type PageHeaderProps = {
    headerTitle?: string,
} & React.HTMLAttributes<HTMLDivElement>

const PageHeader = ({
    className,
    headerTitle,
    children,
    ...props
}: PageHeaderProps) => {
    return (

        <section 
        className={cn([
            'h-64 bg-primary/30  relative',
            className
        ])}
        >
            <div className='grid place-content-center z-20 backdrop-blur-lg w-full h-full'>
                <h1 className='text-6xl font-bold'>{headerTitle}</h1>
            </div>

            <div className='w-20 h-20 rounded-full top-10 left-20 absolute bg-primary -z-20' style={{}}></div>
            <div className='w-20 h-20 rounded-full top-20 right-1/2 absolute bg-primary -z-20' style={{}}></div>
            <div className='w-20 h-20 rounded-full left-1/3 bottom-0 absolute bg-primary -z-20' style={{}}></div>


        </section>
    )
}

export default PageHeader