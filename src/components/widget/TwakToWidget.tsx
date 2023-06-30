/* eslint-disable @typescript-eslint/ban-ts-comment */
import dynamic from 'next/dynamic'
import React from 'react'

//@ts-ignore
const TwakTo = dynamic(() => import('@tawk.to/tawk-messenger-react'))

const TwakToWidget = () => {
  return (
    <div>TwakToWidget</div>
  )
}

export default TwakToWidget