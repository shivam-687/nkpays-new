import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const Loading = () => {
  return (
    <div>
        <TailSpin
        width={50}
        height={50}
        color="black"
        />
    </div>
  )
}

export default Loading