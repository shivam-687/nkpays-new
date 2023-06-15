import React, { PropsWithChildren, useEffect, useState } from 'react'
import Logo from './Logo';
import Link, { LinkProps } from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';


const NavLink = ({children, ...props}: PropsWithChildren<LinkProps>) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const active = router.asPath.startsWith(props.href.toString());
    setIsActive(active)
  }, [router])
  return (
    <Link {...props} className={cn(
      'hover:text-primary transition-all',
      {'text-primary': isActive}
    )}>{children}</Link>
  )
}

const Nav = () => {
  return (
    <nav className=''>
      <div className="container mx-auto flex items-center ">
        <div className="flex-grow-0 w-max"><Logo /></div>
        <div className="flex-grow justify-end gap-5 items-center hidden md:flex">
          <div className="flex gap-3">
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/service'}>Services</NavLink>
            <NavLink href={'/about'}>About Us</NavLink>
            <NavLink href={'/shop'}>Shop</NavLink>
            <NavLink href={'/contact'}>Contact</NavLink>
            
          </div>

          <div className="flex gap-2">
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav