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

const Detail = ({ result }) => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const[similar , setSimilar] = useState([])
  const userId = "641dc56c922e371e855635d7";

  useEffect(() => {
    getUserRecommendation(userId).then((res) => {
      setRecommendations(res?.data?.recommendedBooks);
    });
  }, [userId]);

  // let similarBooks = []

  useEffect(()=>{
    listBooks(id).then((res)=>{
      setSimilar(res?.data?.book)
    })
  },[id])

  console.log(similar)

  const newRecommendation = recommendations.filter((data) => {
    return data?._id !== id;
  });

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
              <p className="text-white tracking-widest">Stock:{result.stock}</p>
            </div>
          </div>
        )}
        <p className="text-white tracking-widest">Provided by KCT Library</p>

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
          <div className="w-36 h-28 p-2 flex flex-col gap-2 rounded-md  items-center text-white  border bg-[#212121]">
            <h2 className="uppercase">isbn</h2>
            <FaBarcode/>
            <h2>{result?.isbn}</h2>
          </div>

          <div className="w-36 h-28 p-2 text-white flex flex-col gap-2 rounded-md  items-center  border bg-[#212121]">
            <h2 className="capitalize">Language</h2>
            <FaGlobe />
            <h2>English</h2>
          </div>

          <div className="w-36 h-28 p-2 text-white flex flex-col gap-2 rounded-md  items-center  border bg-[#212121]">
            <h2 className="capitalize">Publisher</h2>
            <FaBook />
            <h2>{result?.publisher}</h2>
          </div>
        </div>
        <hr className="my-5 border border-[#313131]" />

        <div>
          <h2 className="text-white text-xl tracking-widest ">Ratings</h2>
          <div className="w-full h-auto  p-4 flex flex-col gap-2 mt-2 rounded-md text-white  border bg-[#EAF8FB]">
            <h2 className="text-black font-semibold text-xl">How would you rate this book?</h2>
            <div className="flex text-3xl gap-2 text-[#212121]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>

        <RecommendationSection newRecommendation={newRecommendation} h2="You May Like" />
        <RecommendationSection newRecommendation={similar}  h2="See similar books" category={result?.category?.category_name} />

      </div>
    </>
  );
};

export default Detail;
