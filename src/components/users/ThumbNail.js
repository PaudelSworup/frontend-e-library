import React, { useEffect, useState } from "react";
import { overFlow } from "../../reusuableFunctions/overFlow";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import { FaThumbsUp } from "react-icons/fa";
import { getLikes, likeBook } from "../../API/bookAPI";
import { useSelector } from "react-redux";
import { image } from "../../config";

const ThumbNail = ({ result }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  

  const { userid } = useSelector((state) => state.users);

  const handleLike = () => {
    likeBook({ book: result?._id, user: userid }).then((data) => {
      if (isLiked) {
        setCount(count - 1);
      }
      data?.data?.counts.find((like) => {
        if (like?._id === result?._id) {
          setCount(like?.count);
          return true;
        }
        return "";
      });
    });
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    getLikes().then((data) => {
      data?.data?.likes.find((data) => {
        if (data?.book === result?._id && data?.user === userid) {
          setIsLiked(!isLiked);
          return true;
        }
        return "";
      });

      data?.data?.counts.find((data) => {
        if (data?._id === result?._id) {
          setCount(data?.count);
          return true;
        }
        return "";
      });
    });
  }, [userid]);

  return (
    <>
      <div className="ml-3 bg-[#222]  group rounded overflow-hidden shadow-lg max-w-sm my-10 cursor-pointer transition duration-[420ms] ease-in transform sm:hover:scale-105 hover:z-50 ">
        <Link to={{ pathname: `/book/detail/${result?._id}` }}>
          <LazyImage
            src={`${image}/${result?.image}`}
            alt=""
            className="w-full max-h-[333px]"
            loading="lazy"
          />
        </Link>
        <div className="px-4 py-4">
          <div
            title={result?.title}
            className="font-bold truncate text-white capitalize tracking-wider text-xl mb-2"
          >
            {overFlow(result?.title, 30)}
          </div>
          <p className="text-gray-400 tracking-wider truncate text-base">
            {overFlow(result?.desc, 70)}
          </p>
        </div>

        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full tracking-wider px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`#${result?.category?.category_name || result?.category_name}`}
          </span>
        </div>
        <div className=" px-12 py-2 flex gap-3">
          <p className="truncate max-w-md capitalize text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
            {`${new Date(result?.yearofpublication).getFullYear()}-${(
              new Date(result?.yearofpublication).getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${new Date(result?.yearofpublication)
              .getDate()
              .toString()
              .padStart(2, "0")} `}
          </p>

          <p className="max-w-md capitalize mt-[-5px] flex gap-3  text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
            <FaThumbsUp
              className={`text-2xl ${isLiked ? "text-blue-500" : "text-white"}`}
              onClick={handleLike}
            />{" "}
            <span className="text-white text-xl">{count}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ThumbNail;
