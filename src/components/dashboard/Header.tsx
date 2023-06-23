import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '../ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TailSpin } from  'react-loader-spinner'
import { LogOut } from 'lucide-react'
import { convertNullToUndefiend } from '@/lib/utils'
import { UserNav } from './UserNav'

const Header = () => {
  const { data: session, status } = useSession()
  return (
    <div className='w-full px-4 py-2 flex justify-end items-center bg-secondary'>
      <UserNav/>
    </div>
  )
}

export default Header