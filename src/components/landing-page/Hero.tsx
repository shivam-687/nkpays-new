import React from 'react'
import Image from 'next/image'
import LoginDropdown from '../shared/LoginDropdown'
import AppDownloadButton from '../shared/AppDownloadButton'
import KeypointPanel from './KeypointPanel'


const content = {
  title: 'Empowering Businesses with Cutting-Edge',
  gradientTitle: 'Integrated Solutions',
  desc: 'Streamline your operations, enhance efficiency, and unlock growth potential with our cutting-edge integrated solutions. Experience the transformative power of simplified processes and boost your business success today.',
  appUrl: '',

}


const Hero = () => {
  return (
    <section className="py-20 lg:py-0 lg:min-h-[100vh]  relative ">
      <div className='container grid grid-cols-1 lg:grid-cols-2 items-center'>
        <div className="content py-10 max-w-lg mx-auto">
          <h1 className='text-3xl text-center md:text-5xl lg:text-5xl font-bold lg:text-left'>
            {content.title}
            <br></br>
            <span className='bg-gradient-to-br text-transparent  bg-clip-text from-primary to-[#045ccc]'>{content.gradientTitle}</span>
          </h1>
          <p className='mt-2 text-left md:text-left hidden lg:block'>{content.desc}</p>
          <div className='flex gap-2 mt-5 justify-center lg:justify-start' >
            <LoginDropdown />
            <AppDownloadButton />
          </div>
        </div>
        <div className='relative '>
          <Image src={'/assets/images/hero-img-2.png'} alt="Hero Image" width={800} height={800} />
          <div className="absolute top-0 left w-full h-full flex items-center justify-center">
            <div className='w-52 h-52 md:w-[500px] md:h-[500px] bg-primary/30 rounded-full  -z-20 p-7 lg:p-12'>
              <div className='w-full h-full rounded-full bg-gradient-to-bl from-primary to-[#045ccc]'>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute'></div>
      <div className="px-4 container py-10"><KeypointPanel /></div>
    </section>
  )
}

export default Hero