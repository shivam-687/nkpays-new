import React from 'react'
import Image from 'next/image'
import LoginDropdown from '../shared/LoginDropdown'
import AppDownloadButton from '../shared/AppDownloadButton'
import KeypointPanel from './KeypointPanel'
import { nanoid } from 'nanoid'
import TrailText from '../animated/TrailText'
import { Fade, Zoom } from "react-awesome-reveal";
import { animated, useSpring, useTrail } from '@react-spring/web'


const content = {
  title: 'Empowering Businesses with Cutting-Edge',
  gradientTitle: 'Integrated Solutions',
  desc: 'Streamline your operations, enhance efficiency, and unlock growth potential with our cutting-edge integrated solutions. Experience the transformative power of simplified processes and boost your business success today.',
  appUrl: '',
  titleArray: [
    { title: 'Empowering', type: 'simple' },
    { title: 'Buisinesses With', type: 'simple' },
    { title: 'Cutting-Edge', type: 'simple' },
    { title: 'Integrated Solutions', type: 'gradient' }
  ]
}


const Hero = () => {

  const fadeRight = useSpring({
    delay: 300,
    from: { opacity: 0, x: 20},
    to: { opacity: 1 , x:0},
  })

  const popTrail = useTrail(2 , {from: {opacity: 0, x:20}, to: {opacity:1, x:0}})

  const blinkSpring = useSpring({
    from: {opacity: 0, scale: '30%'},
    to: {opacity: 1, scale: '100%'},
    loop: true
  })

  return (
    <section className="py-20 lg:py-0 lg:min-h-[100vh]  relative bg-center bg-cover bg-no-repeat">
      <div className='container grid grid-cols-1 lg:grid-cols-2 items-center bg-left bg-cover bg-no-repeat'>
        <div className="content py-10 max-w-lg mx-auto">
          <div className='text-4xl space-y-2 text-center md:text-5xl lg:text-5xl font-bold lg:text-left'>
            {

              <TrailText open={true}>
                {
                  content.titleArray.map(t => {
                    return (
                      <div key={nanoid()} >
                        {
                          t?.type === 'gradient'
                            ?
                            <h2 className='bg-gradient-to-br text-transparent  bg-clip-text from-primary to-[#045ccc]'>{t.title}</h2>
                            :
                            <h2 >{t.title}</h2>
                        }
                      </div>
                    )
                  })
                }
              </TrailText>
            }
          </div>
          <animated.p className='mt-2 text-center md:text-left' style={fadeRight}>{content.desc}</animated.p>
          <div className='flex gap-4 mt-5 justify-center lg:justify-start' >
            <animated.div style={popTrail[0]}><LoginDropdown /></animated.div>
            <animated.div style={popTrail[1]}><AppDownloadButton href='https://play.google.com/store/apps/details?id=com.nkpaysapp' /></animated.div>
          </div>
        </div>
        <div className='relative '>
         <Fade triggerOnce delay={1000}> <Image src={'/assets/images/hero-img-2.png'} alt="Hero Image" width={800} height={800} /></Fade>
          <div className="absolute top-0 left w-full h-full flex items-center justify-center">
            <Zoom triggerOnce delay={200}  className='w-52 h-52 md:w-[500px] md:h-[500px] bg-primary/30 rounded-full  -z-20 p-7 lg:p-12'>
              <div className='w-full h-full rounded-full bg-gradient-to-bl from-primary -z-10 to-[#045ccc]'></div>
            </Zoom>
          </div>
        </div>
      </div>
      <div className='absolute'></div>
      <div className="px-4 container py-10"><KeypointPanel /></div>
    </section>
  )
}

export default Hero