import React, { PropsWithChildren } from 'react'
import Nav from '../shared/Nav'
import Footer from '../shared/Footer'

const AppLayout = ({
    children
}: PropsWithChildren) => {
  return (
    <main>
        <Nav/>
        {children}
        <Footer />
    </main>
  )
}

export default AppLayout