import React from "react";

const Card = () => {
  return (
    <>
     
        <div className="flex">
          <button className="bg-transparent shadow-lg rounded border border-blue-500 hover:border-transparent hover:text-white hover:bg-blue-500 py-2 px-4">
            Recently Added
          </button>
        </div>
    <div className="bg-[#BFD7FF] p-5">
        <div className="max-w-sm mt-2 bg-white border border-gray-200 rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              class="rounded-t-lg"
              src="https://images.pexels.com/photos/8390950/pexels-photo-8390950.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="h-96 w-full"
              alt=""
            />
          </a>
          <div className="p-1">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Harry potter
              </h5>
              <p>
                Available / currently unavailable
              </p>
            </a>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
