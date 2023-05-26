import React, { useEffect, useState } from "react";
import { overFlow } from "../reusuableFunctions/overFlow";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import { FaThumbsUp } from "react-icons/fa";
import { getLikes, likeBook } from "../API/bookAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ThumbNail = ({ result }) => {
  const[isLiked,setIsLiked] = useState(false)
  const {userid} = useSelector((state)=>state.users)


  const handleLike = ()=>{
    likeBook({book:result?._id , user:userid}).then((data)=>{
      console.log(data)
    })
    setIsLiked(!isLiked);
  }


  useEffect(()=>{
    getLikes().then((data)=>{
      // console.log(data?.data?.likes)
      data?.data?.likes.find((data)=>{
        if(data?.book === result?._id && data?.user === userid ){
          setIsLiked(!isLiked);
        }
      })
    })
  },[])
  
  return (
    <>
      {/*  */}
        <div className="p-2 group my-10 cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105  hover:z-50 ">
        <Link to={{ pathname: `/book/detail/${result?._id}` }}>
          <LazyImage
            src={`http://localhost:8000/${result?.image}`}
            alt=""
            className="w-full sm:w-[92%] max-h-[333px]"
            loading="lazy"
          />
          </Link>
          <div className="p-2 flex flex-col gap-3">
          <p className="truncate max-w-md  capitalize text-white ">
          {overFlow(result?.desc, 50)}
            </p>
            <h2 className="mt-1 text-white truncate capitalize transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
              {overFlow(result?.title, 30)}
            </h2>
            <div className="flex gap-3">
            <p className="truncate max-w-md capitalize text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
              {`${new Date(result?.yearofpublication).getFullYear()}-${(new Date(result?.yearofpublication).getMonth() + 1).toString().padStart(2,'0')}-${new Date(result?.yearofpublication).getDate() } ` }
            </p>

            <p className="max-w-md capitalize mt-[-5px]  text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
              <FaThumbsUp className={`text-2xl ${isLiked ? 'text-blue-500' : 'text-white'}`} onClick={handleLike} />
            </p>
            </div>
          
          </div>
        </div>
      {/*  */}
    </>
  );
};

export default ThumbNail;
