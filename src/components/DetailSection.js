import React from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import { icons } from "./Ricons";
import {  FaCheckCircle,  FaTimesCircle } from "react-icons/fa";

const DetailSection = ({ result }) => {
  console.log(result);
  return (
    <>
   
      <div className="p-2 my-10 hover:z-50 ">
        <img
          src={`http://localhost:8000/${result?.image}`}
          alt=""
          className="w-[75%] max-w-[100%] max-h-[400px] md:rounded-lg cursor-pointer"
        />

        <div className="flex gap-3 py-2 px-4 sm:px-7">
          {icons.map((data) => (
            <div
              key={data.id}
              className="bg-[#444] cursor-pointer p-2 rounded-full"
            >
              {data.icon}
            </div>
          ))}
        </div>

        <div className="flex flex-col text-white tracking-widest">
          <h2 className="text-2xl">Genres</h2>
          <p className="cursor-pointer underline underline-offset-1">
            {result?.category?.category_name}
          </p>
        </div>
      </div>
        <div className="p-2 my-10  xl:w-[900px] ">
          <button className="py-2  px-2 bg-[#252525] rounded-md  text-white tracking-widest">
            {result?.publisher}
          </button>
          <h2 className="mt-3 text-white tracking-wider capitalize truncate transition-all duration-100 ease-in-out text-3xl group-hover:font-bold  ">
            {result?.title}
          </h2>
          {result?.stock !== 0 ? 
        
          <div className="my-3 flex justify-between gap-3">
            <div className="flex gap-3">
            <FaCheckCircle title="Available" className="text-white cursor-pointer text-2xl" />
            <p className="text-green-600 tracking-widest">Available in the Library</p>
            </div>
            
            <div>
              <p  className="text-white tracking-widest">Stock:{result.stock}</p>
            </div> 
          </div>
         
        
           : 
           
           <div className="my-3 flex justify-between gap-3">
            <div className="flex gap-3">
            <FaTimesCircle title="Available" className="text-white cursor-pointer text-2xl" />
            <p className="text-red-600 tracking-widest">Currently not available</p>
            </div>
            
            <div>
              <p  className="text-white tracking-widest">Stock:{result.stock}</p>
            </div> 
          </div>
          
           
           }


        <hr className="my-5 border border-[#313131]"/>
        <h2 className="text-3xl text-white tracking-widest">Synopsis</h2>
        <p className="text-white font-serif tracking-widest text-xl text-justify">{result?.desc}</p>
       
        </div>
        
    
     
    </>
  );
};

export default DetailSection;
