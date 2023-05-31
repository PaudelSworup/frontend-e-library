import React from 'react'

const ReqestThumbNail = ({result}) => {
    const date = new Date(result?.issueDate)
    const monthName = date.toLocaleString('default', { month: 'long' });
  return (
    <div className='flex gap-3 mb-2 bg-[#252525] p-4 rounded-md' >
        <div>
            <img src={`http://localhost:8000/${result?.books_id?.image}`} className='w-36' alt='' />
        </div>

        <div className='flex flex-col gap-4 text-white'>
            <h2>{result?.books_id?.title}</h2>
            <div className='flex mt-3 flex-col gap-'>
            <p className='text-xs text-gray-400'>Book requested Date</p>
            <p className='text-sm'>{`${monthName} ${date.getDate().toString()} , ${date.getFullYear().toString()}`}</p>
            </div>
            
            <div className='rounded-3xl mt-auto text-center tracking-widest  p-2 bg-[#6b6b6b]'>
                <p>{result?.issueStatus === 1 ? "Approved" : result?.issueStatus === 0 ? "pending" : "Rejected"}</p>
            </div>
        </div>
    </div>
  )
}

export default ReqestThumbNail