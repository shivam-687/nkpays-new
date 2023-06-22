import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
    <Image src={'/assets/logo.png'} width={200} height={54} alt='NKPays logo'/>
    </Link>
  )
}

export default Logo