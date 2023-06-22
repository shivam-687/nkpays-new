import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '../ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TailSpin } from  'react-loader-spinner'
import { LogOut } from 'lucide-react'
import { convertNullToUndefiend } from '@/lib/utils'

const Header = () => {
  const { data: session, status } = useSession()
  return (
    <div className='w-full px-4 py-2 flex justify-end items-center bg-secondary'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {
            status === 'loading'
            ?
            <Avatar>
              <AvatarFallback>
                <TailSpin
                  height="40"
                  width="40"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </AvatarFallback>
            </Avatar>
            :
            <Avatar className="cursor-pointer shadow ring-2 w-6 h-6 hover:ring-4 transition-all   ring-green-700">
              <AvatarImage src={convertNullToUndefiend(session?.user.image)}></AvatarImage>
              <AvatarFallback >{convertNullToUndefiend(session?.user.name?.charAt(0))}</AvatarFallback>
            </Avatar>
          }
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>{session?.user.email?.split('@')[0]}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => void signOut()}>
            <LogOut/> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Header