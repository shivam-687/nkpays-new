import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'
import { Fade } from 'react-awesome-reveal'

export type SectionProps = {
    sectionTitle?: string,
    sectionDesc?: string,
    titleClassnames?: string
} & React.HTMLAttributes<HTMLDivElement>

export const SectionTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h2 className={cn(
            'text-4xl font-bold text-center ',
            className
        )} {...props}>{children}</h2>
    )
}

const Section = ({
    sectionTitle,
    sectionDesc,
    titleClassnames,
    className,
    ...props
}: SectionProps) => {
    return (
        <section
            {...props}
            className={cn(
                'py-10',
                className
            )}>

            {
                sectionTitle && <div className='overflow-hidden mb-10'>
                    <Fade triggerOnce delay={200} direction='up'><SectionTitle className={titleClassnames}>{sectionTitle}</SectionTitle></Fade>
                </div>
            }

            {props.children}

        </section>
    )
}

export default Section