import React, { type PropsWithChildren, useEffect, useState } from 'react'
import SideBar from '../dashboard/SideBar';
import Header from '../dashboard/Header';
import { signIn, useSession } from 'next-auth/react';

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {data:Session, status} = useSession();

  useEffect(() => {
    if(status === 'unauthenticated'){
      void signIn()
    }
  }, [status])

  if(status === 'loading'){
    return <div className='min-h-screen grid place-content-center'>
      <p>Loading...</p>
    </div>
  }

  return (
    <>
    <div className="flex items-center justify-center h-screen text-xl font-medium lg:hidden">
      <p className='px-4 text-center'>Admin Panel is not compatible with this size of screen</p>
    </div>
    <div className='h-screen lg:flex hidden'>
      <SideBar />
      <div className='lg:ml-64  w-full'>
        <Header />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminLayout