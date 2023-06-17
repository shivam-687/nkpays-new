import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import React from 'react'
import LoginDropdown from './LoginDropdown'
import { Button } from '../ui/button'



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
                    <span><ChevronRight className='w-4 h-4'/></span>
                </Link>
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