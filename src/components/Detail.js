import React, { useEffect, useState } from "react";
import {
  FaBarcode,
  FaBook,
  FaCheckCircle,
  FaGlobe,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa";
import { getUserRecommendation, listBooks } from "../API/bookAPI";
import { useParams } from "react-router-dom";
import RecommendationSection from "./RecommendationSection";
import { RiDownloadCloud2Line } from "react-icons/ri";

const Detail = ({ result }) => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [rating, setRating] = useState(0);
  const userId = "641dc56c922e371e855635d7";

  useEffect(() => {
    getUserRecommendation(userId).then((res) => {
      setRecommendations(res?.data?.recommendedBooks);
    });
  }, [userId]);

  let arr = [1,2,3,4,5]  

  useEffect(() => {
    listBooks(id).then((res) => {
      setSimilar(res?.data?.book);
    });
  }, [id]);

  

  const newRecommendation = recommendations.filter((data) => {
    return data?._id !== id;
  });

  const handleStarHover = (hoverRating) => {
    setRating(hoverRating);
  };

  return (
    <>
      <div className="p-2 my-20 xl:my-28  xl:w-[900px] ">
        <button className="py-2  px-2 bg-[#252525] rounded-md  text-white tracking-widest">
          <div className="flex gap-1">
            <span>
              <FaBook className="text-lg mt-[2px]" />
            </span>
            <span>{result?.publisher}</span>
          </div>
        </button>
        <h2 className="mt-3 text-white tracking-wider capitalize truncate transition-all duration-100 ease-in-out text-3xl group-hover:font-bold  ">
          {result?.title}
        </h2>
        {result?.stock !== 0 ? (
          <div className="my-3 flex justify-between gap-3">
            <div className="flex gap-3">
              <FaCheckCircle
                title="Available"
                className="text-white cursor-pointer text-2xl"
              />
              <p className="text-green-600 tracking-widest">
                Available in the Library
              </p>
            </div>

            <div>
              <p className="text-white tracking-widest">
                Stock:{result?.stock}
              </p>
            </div>
          </div>
        ) : (
          <div className="my-3 flex justify-between gap-3">
            <div className="flex gap-3">
              <FaTimesCircle
                title="Available"
                className="text-white cursor-pointer text-2xl"
              />
              <p className="text-red-600 tracking-widest">
                Currently not available
              </p>
            </div>

            <div>
              <p className="text-white tracking-widest">Stock:{result?.stock}</p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-start gap-3">
        <p className="text-white tracking-widest">Provided by KCT Library</p>
        {result?.stock !==0 &&   <button
              className="py-[10px] ml-2 bg-slate-600 rounded-md px-8 text-white tracking-widest hover:bg-slate-800"
            >
             <div className="flex gap-1">
              <span><RiDownloadCloud2Line className=" text-xl" /></span> <span>Request</span>
              </div>
            </button>}
        </div>

        <hr className="my-5 border border-[#313131]" />
        <h2 className="text-3xl text-white tracking-widest">Synopsis</h2>
        <p className="text-white font-serif tracking-widest text-xl text-justify">
          {result?.desc}
        </p>
        <hr className="my-5 border border-[#313131]" />

        <h2 className="text-white text-2xl capitalize tracking-widest font-bold">
          Other info
        </h2>
        <div className="flex justify-center mt-3 gap-2 cursor-pointer">
          <div className="w-40 h-28 p-2 flex flex-col gap-2 rounded-md  items-center text-white  border bg-[#212121]">
            <h2 className="uppercase">isbn</h2>
            <FaBarcode className="text-xl" />
            <h2>{result?.isbn}</h2>
          </div>

          <div className="w-40 h-28 p-2 text-white flex flex-col gap-2 rounded-md  items-center  border bg-[#212121]">
            <h2 className="capitalize">Language</h2>
            <FaGlobe className="text-xl" />
            <h2>English</h2>
          </div>

          <div className="w-40 h-28 p-2 text-white flex flex-col gap-2 rounded-md  items-center  border bg-[#212121]">
            <h2 className="capitalize">Publisher</h2>
            <FaBook className="text-xl" />
            <h2 className="text-center truncate ">{result?.publisher}</h2>
          </div>
        </div>
        <hr className="my-5 border border-[#313131]" />

        <div>
          <h2 className="text-white text-xl tracking-widest ">Ratings</h2>
          <div className="w-full h-[150px] space-y-4   p-4 flex flex-col gap-2 mt-2 rounded-md text-white  border bg-[#EAF8FB]">
            <h2 className="text-black font-black text-xl tracking-widest">
              How would you rate this book?
            </h2>
            <div className="flex  text-3xl gap-5 text-[#212121] ">
              <div className="flex gap-2">
              {arr.map((data)=>{
               return(
                <span key={data}>
                  <FaStar  className={`cursor-pointer   ${data<= rating ? "text-yellow-400" : "text-[#9E9E9E]"}` } onMouseEnter={() => handleStarHover(data)} />
                </span>
               )
              })}
              </div>
              <div>
              <p className="text-black text-xl font-light">{`${rating}.0`}</p>
              </div>
             
            </div>
           
          </div>
        </div>

        <RecommendationSection
          newRecommendation={newRecommendation}
          h2="You May Like"
        />
        <RecommendationSection
          newRecommendation={similar}
          h2="See similar books"
          category={result?.category?.category_name}
        />
      </div>
    </>
  );
};

export default Detail;
