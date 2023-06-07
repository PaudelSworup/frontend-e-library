import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const {message} = useSelector((state)=>state.notify)
    console.log(message)
  return (
    <div className='text-white'>Notification</div>
  )
}

export default Notification