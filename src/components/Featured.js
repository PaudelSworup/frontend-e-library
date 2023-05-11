import React, { useEffect, useState } from "react";
import { recommendedBooks } from "../API/bookAPI";
import { overFlow } from "../reusuableFunctions/overFlow";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyImage from "./LazyImage";

const Featured = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate()

  const {userid} = useSelector((state)=>state.users)

  

  useEffect(() => {
      recommendedBooks(userid).then((res) => {
        setFeatured(res?.data?.recommendations);
      });
  },[]);

  

  return (
    <>
        <h2 className=" p-2 text-white tracking-widest capitalize font-serif text-2xl">
          Featured Item (Rating based)
        </h2>
        <div className="px-5 sm:grid md:grid-cols-2 xl:flex justify-center  ">
          {featured?.map((data) => (
            <div key={data.isbn} className="p-2 my-10 cursor-pointer  hover:z-50 " onClick={()=>navigate(`book/detail/${data?._id}`)}>
              <LazyImage
                src={`http://localhost:8000/${data?.image}`}
                alt=""
                className="w-[90%] sm:w-[80%] max-h-[300px] md:rounded-md"
              />
              <div className="p-2">
                <h2 className="mt-1 text-white transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
                  {data?.title}
                </h2>
                <p className="truncate max-w-md capitalize text-white ">
                  {overFlow(data?.desc, 50)}
                </p>

                {/* {data?.stock === 0 ? <button disabled className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest">Hold Request</button> : <button onClick={showStatus} className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest hover:bg-slate-800">Hold Request</button> } */}
              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default Featured;
