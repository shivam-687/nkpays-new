import { CloudLightning, Code } from 'lucide-react'
import React from 'react'


const keypointContent = [
    {
        icon: <Code className='w-10 h-10'/>,
        title: 'Easy Integration',
        desc: 'Signup and go with easy integration feature for your web and mobile applications.'
    },
    {
        icon: <CloudLightning className='w-10 h-10'/>,
        title: 'Fast Response',
        desc: 'We use RESTFul APIs which deliver fastest response over requests made from web or mobile devices.'
    },
    {
        icon: <Code className='w-10 h-10'/>,
        title: '24/7 Support',
        desc: 'Our customer service is best in class and commited to serve you 24x7 for your queries and questions.'
    },
]


const KeyPointCard = ({
    icon,
    title,
    desc
}: {icon: any, title: string, desc: string}) => {

    return (
        <div className='p-2 max-w-xs'>
            <div className="flex items-center justify-center p-5" >
                <div className="w-20 h-20 text-white flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-[#045ccc]">{icon}</div>
            </div>

            <div className='text-center space-y-2'>
                <h3 className='text-lg font-bold'>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

const KeypointPanel = () => {

  return (
    <div className='rounded-tl-3xl backdrop-blur bg-primary/10 mb-10 rounded-br-3xl border-primary shadow-xl shadow-primary/20 p-4 border grid grid-col-1 md:grid-cols-3 justify-items-center container mx-autos'>
        {
            keypointContent.map((kp, index) => {
                return (
                    <KeyPointCard key={index} {...kp} />
                )
            })
        }
    </div>
  )
}

export default KeypointPanel