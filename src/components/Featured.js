import React, { useEffect, useState } from "react";
import { recommendedBooks } from "../API/bookAPI";
import { overFlow } from "../reusuableFunctions/overFlow";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  const userId = "641dc56c922e371e855635d7";
  useEffect(() => {
    const recommendation = () => {
      recommendedBooks(userId).then((res) => {
        setFeatured(res?.data?.recommendations);
      });
    };
    recommendation();
  }, [userId]);

  

  return (
    <>
      <div className="bg-[#2E2E2E]">
        <h2 className="text-white tracking-widest capitalize font-serif text-center text-3xl">
          Featured Item (Rating based)
        </h2>
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center items-center  bg-[#2E2E2E]">
          {featured?.map((data) => (
            <div key={data.isbn} className="p-2 my-10 cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 ">
              <img
                src={`http://localhost:8000/${data?.image}`}
                alt=""
                className="w-[100%] max-h-[300px] md:rounded-lg"
              />
              <div className="p-2">
                <p className="truncate max-w-md capitalize text-white ">
                  {overFlow(data?.desc, 100)}
                </p>
                <h2 className="mt-1 text-white transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
                  {data?.title}
                </h2>

                {/* {data?.stock === 0 ? <button disabled className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest">Hold Request</button> : <button onClick={showStatus} className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest hover:bg-slate-800">Hold Request</button> } */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Featured;
