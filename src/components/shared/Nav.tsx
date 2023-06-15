import React, { PropsWithChildren, useEffect, useState } from 'react'
import Logo from './Logo';
import Link, { LinkProps } from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Drawer from 'react-modern-drawer'
import { MenuIcon } from 'lucide-react';
import MobileNav from './MobileNav';


const NavLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);


  useEffect(() => {
    const active = router.asPath.startsWith(props.href.toString());
    setIsActive(active)
  }, [router])
  return (
    <Link {...props} className={cn(
      'hover:text-primary transition-all',
      { 'text-primary': isActive }
    )}>{children}</Link>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <nav className=''>
      <div className="container mx-auto flex items-center justify-between py-2 ">
        <div className="flex-grow-0 w-36 md:w-max"><Logo /></div>


        <div className="flex-grow justify-center gap-5 items-center hidden md:flex">
          <div className="gap-4 hidden md:flex">
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/service'}>Services</NavLink>
            <NavLink href={'/about'}>About Us</NavLink>
            <NavLink href={'/shop'}>Shop</NavLink>
            <NavLink href={'/contact'}>Contact</NavLink>

          </div>
        </div>


        <div className="flex gap-2 flex-grow-0 ">
          <div className='hidden md:flex'>
            <Button>Login</Button>
          </div>
          <div className='flex md:hidden'>
            <Button size={'sm'} onClick={toggleDrawer} variant={'outline'}><MenuIcon /></Button>

          </div>

        </div>
      </div>


      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        className='border border-primary backdrop-blur bg-white/30'
          
      >
        <div className='py-10'>
          <MobileNav 
          onLinkClick={toggleDrawer}
          links={[
            {link: '/', lable: 'Home'},
            {link: '/services', lable: 'Services'},
            {link: '/about', lable: 'About'},
            {link: '/Contact', lable: 'Contact'},
            {link: '/Shop', lable: 'Shop'},
          ]}/>
        </div>
      </Drawer>

    </nav>
  )
}

export default Nav