import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import React from 'react'
import LoginDropdown from './LoginDropdown'
import { Button } from '../ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



const MobileNav = ({
    links,
    onLinkClick
}: {
    links: {
        lable: string,
        link: string,
        children?: {
            lable: string,
            link: string,
        }[]
    }[],
    onLinkClick?: () => void
}) => {

    return (
        <div className='p-4'>
            {
                links.map(link => {
                    return (<>
                        {
                            link.children
                                ?
                                <div className="px-4">
                                    <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>{link.lable}</AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                link.children.map(l => {
                                                    return <Link onClick={() => onLinkClick?.()} key={nanoid()} href={l.link} className={cn(
                                                        'flex w-full cursor-pointer px-4 py-2 mb-2 text-base rounded hover:bg-primary hover:text-primary-foreground justify-between capitalize items-center'
                                                    )}>
                                                        <span>{l.lable}</span>
                                                        <span><ChevronRight className='w-4 h-4' /></span>
                                                    </Link>
                                                })
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                </div>
                                :
                                <Link onClick={() => onLinkClick?.()} key={nanoid()} href={link.link} className={cn(
                                    'flex w-full cursor-pointer px-4 py-2 mb-2 text-base rounded hover:bg-primary hover:text-primary-foreground justify-between capitalize items-center'
                                )}>
                                    <span>{link.lable}</span>
                                    <span><ChevronRight className='w-4 h-4' /></span>
                                </Link>
                        }
                    </>)
                })
            }

            <div className='mt-5'>
                <LoginDropdown>
                    <Button variant={'glow'} size={'lg'} className="w-full">Login</Button>
                </LoginDropdown>
            </div>
        </div>
    )
}

export default MobileNav