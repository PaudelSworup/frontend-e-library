import React from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import { Link } from "react-router-dom";


const ThumbNail = ({ result }) => {
 
  const showStatus = () => {
    console.log("hello");
  };



 
  return (
    <>
    <Link to={{pathname:`/book/detail/${result?._id}`}}>
    <div className="p-2 my-10 cursor-pointer  hover:z-50 ">
        <img
          src={`http://localhost:8000/${result?.image}`}
          alt=""
          className="w-[90%] sm:w-[75%] max-h-[300px] md:rounded-lg"
        />
        <div className="p-2 flex flex-col gap-2 items-start">
          <h2 className="mt-1 text-white truncate capitalize transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
            {overFlow(result?.title,30)}
          </h2>
          <p className="truncate max-w-md capitalize text-white ">
            {overFlow(result?.desc, 55)}
          </p>

            {result?.stock === 0 ? <button disabled className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest">Hold Request</button> : <button onClick={showStatus} className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest hover:bg-slate-800">Hold Request</button> }
        </div>
      </div>
    </Link>
      
    </>
  );
};

export default ThumbNail;
