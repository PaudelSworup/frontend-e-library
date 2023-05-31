import React from 'react'
import ReqestThumbNail from './ReqestThumbNail'

const RequestHistory = ({data}) => {
  return (
    <>
    <div className="flex flex-col  ">
    <div className="p-2 saved_items">
      <h2 className="text-white">Request History</h2>
      <p className="text-[#9E9E9E]">
        Track your History status
      </p>
      {/* <div className='flex flex-1'>
    <select>
        <option>
            All
        </option>
        <option>
            Approved request
        </option>
        <option>
            Rejected request
        </option>
        <option>
            pending request
        </option>
    </select>
    </div> */}
    </div>
    

    <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
        
      {data?.map((data) => (
        <ReqestThumbNail key={data?._id} result={data} />
      ))}
    </div>
   
  </div>
    </>
    
  )
}

export default RequestHistory