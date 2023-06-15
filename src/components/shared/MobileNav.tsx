import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import React from 'react'



const MobileNav = ({
    links,
    onLinkClick
}: {
    links: {
        lable: string,
        link: string
    }[],
    onLinkClick?: () => void
}) => {

  return (
    <div className='p-4'>
        {
            links.map(link => {
                return <Link onClick={() =>onLinkClick?.()} key={nanoid()} href={link.link} className={cn(
                    'flex w-full cursor-pointer px-4 py-2 mb-2 text-base rounded hover:bg-primary hover:text-primary-foreground justify-between capitalize items-center'
                )}>
                    <span>{link.lable}</span>
                    <span><ChevronRight className='w-2 h-2'/></span>
                </Link>
            })
        }
    </div>
  )
}

export default MobileNav