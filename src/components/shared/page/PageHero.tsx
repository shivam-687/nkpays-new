import { nanoid } from 'nanoid'
import React from 'react'
import TrailText from '../../animated/TrailText'
import { animated } from '@react-spring/web'
import { Fade } from 'react-awesome-reveal'
import Image from 'next/image'

export type PageHeroProps = {
    titles: string[],
    desc?: string,
    extra?: React.ReactNode,
    image: string
}

const PageHero = ({
    titles,
    desc,
    extra,
    image
}: PageHeroProps) => {
    return (
        <section className="py-20  relative ">
            <div className='container grid grid-cols-1 lg:grid-cols-2 items-center'>
                <div className="content py-7 max-w-lg mx-auto ">
                    <div className='text-4xl space-y-2 text-center md:text-4xl font-bold lg:text-left'>

                        {
                            titles.map(t => {
                                return (
                                    <div key={nanoid()} >
                                        {
                                            <h2>{t}</h2>
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className='overflow-hidden' >
                        <Fade direction='down' delay={200} ><p className='mt-2 text-center md:text-left'>{desc}</p></Fade>
                    </div>
                    {extra}
                </div>
                <div className='relative '>
                    <Fade triggerOnce delay={1000}> <Image src={image} alt="Hero Image" width={800} height={800} /></Fade>
                </div>
            </div>
        </section>
    )
}

export default PageHero