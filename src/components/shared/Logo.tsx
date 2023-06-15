import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image src={'/assets/logo.png'} width={200} height={54} alt='NKPays logo'/>
  )
}

export default Logo