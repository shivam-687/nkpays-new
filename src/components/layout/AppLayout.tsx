import React, { PropsWithChildren } from 'react'
import Nav from '../shared/Nav'
import Footer from '../shared/Footer'
import { EnquiryWidget } from '../widget/EnquiryWidget'
import StickyBox from 'react-sticky-box'

const AppLayout = ({
    children
}: PropsWithChildren) => {
  return (
    <main>
        <StickyBox className='z-50'>
        <Nav/>
        </StickyBox>
        <EnquiryWidget/>
        {children}
        <Footer />
    </main>
  )
}

export default AppLayout