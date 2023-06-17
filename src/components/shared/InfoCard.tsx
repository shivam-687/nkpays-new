import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { cn } from '@/lib/utils'

const InfoCard = ({
    title,
    image,
    desc,
    icon,
    highlight
}: {
    title: string,
    desc?: string,
    image: string,
    icon?: React.ReactNode,
    highlight?: boolean
}) => {
    return (
        <Card className={cn([{ 'bg-primary text-primary-foreground shadow-lg shadow-primary/30': highlight }])}>
            <CardHeader>
                <div className="flex items-center justify-center py-5">
                    {
                        image
                        &&
                        <div className='bg-white rounded-lg p-3'>
                            <div
                            className='w-20 h-20  aspect-square bg-center bg-cover bg-no-repeat'
                            style={{ backgroundImage: `url(${image || ''})` }}
                        ></div>
                        </div>
                    }
                </div>

                {icon}
            </CardHeader>

            <CardContent>
                <h2 className='text-3xl mb-3 text-center'>{title}</h2>
                <p className={cn([
                    'text-center leading-relaxed',
                    {'text-gray-500': !highlight}
                ])}>{desc}</p>
            </CardContent>
        </Card>
    )
}

export default InfoCard