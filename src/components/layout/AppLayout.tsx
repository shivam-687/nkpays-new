import React, { PropsWithChildren } from 'react'
import Nav from '../shared/Nav'
import Footer from '../shared/Footer'
import { EnquiryWidget } from '../widget/EnquiryWidget'

const AppLayout = ({
    children
}: PropsWithChildren) => {
  return (
    <main>
        <Nav/>
        <EnquiryWidget/>
        {children}
        <Footer />
    </main>
  )
}

export default AppLayout