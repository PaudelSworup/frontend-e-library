import React from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import NavBars from "./NavBars";

const ThumbNail = ({ result }) => {
  const showStatus = () => {
    console.log("hello");
  };
  return (
    <>
      <div className="p-2 my-10 cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 ">
        <img
          src={`http://localhost:8000/${result?.image}`}
          alt=""
          className="w-[100%] max-h-[300px] md:rounded-lg"
        />
        <div className="p-2">
          <p className="truncate max-w-md capitalize text-white ">
            {overFlow(result?.desc, 50)}
          </p>
          <h2 className="mt-1 text-white transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
            {result?.title}
          </h2>

            {result?.stock === 0 ? <button disabled className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest">Hold Request</button> : <button onClick={showStatus} className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest hover:bg-slate-800">Hold Request</button> }
        </div>
      </div>
    </>
  );
};

export default ThumbNail;
