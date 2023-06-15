import React, { PropsWithChildren } from 'react'
import Nav from '../shared/Nav'

const AppLayout = ({
    children
}: PropsWithChildren) => {
  return (
    <main>
        <Nav/>
        {children}
    </main>
  )
}

export default AppLayout