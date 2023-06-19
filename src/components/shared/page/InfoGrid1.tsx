import { cn } from '@/lib/utils'
import { nanoid } from 'nanoid'
import React, { ReactComponentElement, ReactElement, ReactNode } from 'react'

export type InfoGrid1Props = React.HTMLAttributes<HTMLDivElement> & {
    items: {
        title: string,
        desc: string,
        icon?: ReactElement,
        image?: string
    }[]
}

const InfoGrid1 = ({
    className,
    items
}: InfoGrid1Props) => {
    return (
        <div className={cn([
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-center',
            className
        ])}>
            {
                items.map(item => {
                    return (
                        <div key={nanoid()} className='flex relative gap-5'>
                            <div className='flex-grow-0'>
                                <div
                                    className='rounded aspect-square w-16 bg-primary/20 inline-flex text-primary items-center justify-center bg-center bg-cover bg-no-repeat'
                                    style={{ backgroundImage: `url(${item.image || ""})` }}
                                >
                                    {
                                        item.icon
                                    }
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h3 className='font-medium text-lg'>{item.title}</h3>
                                <p className='text-muted-foreground'>{item.desc}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default InfoGrid1