import React from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const ThumbNail = ({ result }) => {
  
  return (
    <>
      <Link to={{ pathname: `/book/detail/${result?._id}` }}>
        <div className="p-2 my-10 cursor-pointer  hover:z-50 ">
          <LazyImage
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
        </div>
      </Link>
    </>
  );
};

export default ThumbNail;
