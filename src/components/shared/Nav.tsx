import React, { PropsWithChildren, useEffect, useState } from 'react'
import Logo from './Logo';
import Link, { LinkProps } from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Drawer from 'react-modern-drawer'
import { ChevronDown, MenuIcon } from 'lucide-react';
import MobileNav from './MobileNav';
import LoginDropdown from './LoginDropdown';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { nanoid } from 'nanoid';


const NavLinkDropDown = ({ childs, children, lable }: PropsWithChildren<{ childs: { link: string, lable: string }[], lable?: string }>) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {
          children || <span className={cn('inline-flex gap-1 items-center cursor-pointer')}><span>{lable}</span> <ChevronDown className='text-primary w-4 h-4'/></span>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {
          childs.map(child => {
            return (
              <DropdownMenuItem key={nanoid()}>
                <Link className={cn(
                  'hover:text-primary transition-all',
                  { 'text-primary': router.asPath.startsWith(child.link) }
                )} href={child.link}>{child.lable}</Link>
              </DropdownMenuItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const NavLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);


  useEffect(() => {
    const active = router.asPath === props.href.toString();
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
    <nav className='backdrop-blur bg-white/50 border-b border-white z-50'>
      <div className="container mx-auto flex items-center justify-between py-2 ">
        <div className="flex-grow-0 w-36 md:w-max"><Logo /></div>


        <div className="flex-grow justify-center gap-5 items-center hidden md:flex">
          <div className="gap-10 hidden md:flex">
            <NavLink href={'/'}>Home</NavLink>
            <NavLinkDropDown
              lable='Services'
              childs={[
                { lable: 'Aeps Service', link: '/services/aadhar-enabled-payment-system' },
                { lable: 'BBPS Service', link: '/services/bbps-service' },
                { lable: 'Recharge Api', link: '/services/recharge-api' },
                { lable: 'Travel Booking', link: '/services/travel-booking-api' },
                { lable: 'General Insurance', link: '/services/general-insurance' },
                { lable: 'Domestice Money Transfer', link: '/services/domestice-money-transfer' },
              ]} />
            <NavLink href={'/about'}>About Us</NavLink>
            <NavLink href={'/shop'}>Shop</NavLink>
            <NavLink href={'/contact'}>Contact</NavLink>
          </div>
        </div>


        <div className="flex gap-2 flex-grow-0 ">
          <div className='hidden md:flex'>
            <LoginDropdown />
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
              { link: '/', lable: 'Home' },
              { link: '/services', lable: 'Services', children: [
                { lable: 'Aeps Service', link: '/services/aadhar-enabled-payment-system' },
                { lable: 'BBPS Service', link: '/services/bbps-service' },
                { lable: 'Recharge Api', link: '/services/recharge-api' },
                { lable: 'Travel Booking', link: '/services/travel-booking-api' },
                { lable: 'General Insurance', link: '/services/general-insurance' },
                { lable: 'Domestice Money Transfer', link: '/services/domestice-money-transfer' },
              ] },
              { link: '/about', lable: 'About' },
              { link: '/contact', lable: 'Contact' },
              { link: '/shop', lable: 'Shop' },
            ]} />
        </div>
      </Drawer>

    </nav>
  )
}

export default Nav
