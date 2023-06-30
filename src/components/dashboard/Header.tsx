
import React from 'react'

import { UserNav } from './UserNav'

const Header = () => {
  return (
    <div className='w-full px-4 py-2 flex justify-end items-center bg-secondary'>
      <UserNav/>
    </div>
  )
}

export default Header