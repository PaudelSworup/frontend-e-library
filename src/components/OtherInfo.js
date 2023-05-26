import React from 'react'

const OtherInfo = ({one, two , Icon}) => {
  return (
    <div className="w-40 h-28 p-2 flex flex-col gap-2 rounded-md  items-center text-white  border bg-[#212121]">
    <h2 className="uppercase">{one}</h2>
    {Icon} 
    <h2>{two}</h2>
  </div>
  )
}

export default OtherInfo