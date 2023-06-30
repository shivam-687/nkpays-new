import React, { PropsWithChildren } from 'react'
import { useTrail, a } from '@react-spring/web'

const TrailText: React.FC<PropsWithChildren<{ open: boolean }>> = ({ open, children }) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      height: open ? 60 : 0,
      delay: 300,
      from: { opacity: 0, x: 20, height: 0 },
    })
    return (
      <div>
        {trail.map(({ height, ...style }, index) => (
          <a.div key={index} className='overflow-hidden h-14' style={style}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    )
  }

  export default TrailText;