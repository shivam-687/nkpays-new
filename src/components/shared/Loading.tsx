import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const Loading = ({
  width = 50,
  height = 50
}: {
  width?: number,
  height?: number
}) => {
  return (
    <div>
        <TailSpin
        width={width}
        height={height}
        color="black"
        />
    </div>
  )
}

export default Loading