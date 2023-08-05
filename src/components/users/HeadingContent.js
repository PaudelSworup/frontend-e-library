import React from 'react'

const HeadingContent = (props) => {
  return (
    <div className="p-2 saved_items">
        <h2 className="text-white">{props.title}</h2>
        <p className="text-[#9E9E9E]">
          {props.text}
        </p>
      </div>
  )
}

export default HeadingContent