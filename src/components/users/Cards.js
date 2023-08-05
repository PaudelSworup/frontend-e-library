import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import LazyImage from "./LazyImage";
import { overFlow } from "../reusuableFunctions/overFlow";

const Cards = () => {
  return (
    <>
      <div className="p-2 group rounded overflow-hidden shadow-lg max-w-sm my-10 cursor-pointer transition duration-[420ms] ease-in transform sm:hover:scale-105 hover:z-50 ">
        <img
          className="w-full"
          src="https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-white tracking-wider text-xl mb-2">
            Fundmental of Python Programming
          </div>
          <p className="text-gray-700 text-base truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex px-10 gap-3">
          <p className="truncate max-w-md capitalize text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
            2023-02-01
          </p>

          <p className="max-w-md capitalize mt-[-5px] flex gap-3  text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
            <FaThumbsUp className="text-white" />

            <span className="text-white text-xl">200</span>
          </p>
        </div>

        {/* <div className="p-2 flex flex-col gap-3">
          <p className="truncate max-w-md  capitalize text-white ">
            {overFlow(
              "hello this is a sworup kc and currently I am developing an UI for my project so I am researching on the UI",
              50
            )}
          </p>
          <h2 className="mt-1 text-white truncate capitalize transition-all duration-100 ease-in-out text-2xl group-hover:font-bold  ">
            {overFlow(
              "hello this is a sworup kc and currently I am developing an UI for my project so I am researching on the UI",
              30
            )}
          </h2>
          <div className="flex gap-3">
            <p className="truncate max-w-md capitalize text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
              2023-02-01
            </p>

            <p className="max-w-md capitalize mt-[-5px] flex gap-3  text-white transition duration-100 opacity-0 group-hover:opacity-100 ">
              <FaThumbsUp className="text-white" />
               
              <span className="text-white text-xl">200</span>
            </p>
          </div>
        </div> */}
      </div>

      {/* hello */}
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-white tracking-wider text-xl mb-2">
            Fundmental of Python Programming
          </div>
          <p className="text-gray-700 text-base truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="flex gap-3">
            <p className="truncate max-w-md capitalize text-white transition duration-100 group-hover:opacity-100 ">
              2023-02-01
            </p>

            <p className="max-w-md capitalize mt-[-5px] flex gap-3  text-white transition duration-100 group-hover:opacity-100 ">
              <FaThumbsUp />
              <span className="text-white text-xl">201</span>
            </p>
          </div>
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
        </div>
      </div>
    </>
  );
};

export default Cards;
