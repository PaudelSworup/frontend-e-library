import React from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import { Link } from "react-router-dom";
import { RiDownloadCloud2Line } from 'react-icons/ri';

const ThumbNail = ({ result }) => {
  const showStatus = () => {
    console.log("hello");
  };

  return (
    <>
      <Link to={{ pathname: `/book/detail/${result?._id}` }}>
        <div className="p-2 my-10 cursor-pointer  hover:z-50 ">
          <img
            src={`http://localhost:8000/${result?.image}`}
            alt=""
            className="w-[100%] sm:w-[75%] max-h-[300px] md:rounded-lg"
            loading="lazy"
          />
          <div className="p-2 flex flex-col gap-3">
            <h2 className="mt-1 text-white truncate capitalize transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
              {overFlow(result?.title, 30)}
            </h2>
            <p className="truncate max-w-md capitalize text-white ">
              {overFlow(result?.desc, 55)}
            </p>
          </div>
          {result?.stock === 0 ? (
            <button
              disabled
              className=" pl-3 py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest"
            >
              Hold Request
            </button>
          ) : (
            <button
              onClick={showStatus}
              className="py-[10px] ml-2 bg-slate-600 rounded-md px-8 text-white tracking-widest hover:bg-slate-800"
            >
             <div className="flex gap-1">
              <span><RiDownloadCloud2Line className=" text-xl" /></span> <span>Request</span>
              </div>
            </button>
          )}
        </div>
      </Link>
    </>
  );
};

export default ThumbNail;
