import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'

const SiteLoader = ({children}: PropsWithChildren) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    

    // if(!router.isReady){
    //     return <div className='w-full h-screen flex items-center justify-center'>
    //         <p>loading</p>
    //     </div>
    // }
  return (
    <>
    {children}
    </>
  )
}

export default SiteLoader