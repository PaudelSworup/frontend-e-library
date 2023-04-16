import React from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import NavBars from "./NavBars";

const Cards = ({ searchItem }) => {
  const showStatus = () => {
    console.log("hello");
  };
  return (
    <>
    <NavBars/>
    <div className="sm:flex gap-2 md:p-2  sm:p-1 p-0 bg-[#11131C] h-screen ">
      {searchItem?.map((data) => (
        <div key={data?._id} className="flex flex-col md:py-[82px] py-40">
          <img
            src={`http://localhost:8000/${data?.image}`}
            alt=""
            className="md:w-[300px] md:h-[300px] w-auto  sm:w-[300px] sm:h-[250px] h-[390px] md:rounded-xl sm:rounded-xl"
            loading="lazy"
          />

          <div className="md:py-5 py-3 px-1">
            <p className="font-semibold font-serif tracking-widest text-white text-xl">
              {data?.title}
            </p>
            <p className="font-light text-white font-serif tracking-widest ">
              {overFlow(data?.desc, 37)}
            </p>

            <p className="text-lg font-serif font-bold text-white tracking-wider">{data?.stock === 0 ? "Unavailable" : "Available"}</p>

            {data?.stock === 0 ? <button disabled className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest">Hold Request</button> : <button onClick={showStatus} className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest">Hold Request</button> }

            
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default Cards;
