import React from "react";
import ThumbNail from "./ThumbNail";

const Saved = ({data}) => {
  return (
    <div className="flex flex-col  ">
      <div className="p-2 saved_items">
        <h2 className="text-white">Saved Items</h2>
        <p className="text-[#9E9E9E]">
          Saved Books. Save books to keep track of the books you want to Request
          later. To unsave, just click on the bookmark icon again.
        </p>
      </div>

      <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
        {data?.map((data) => (
          <ThumbNail key={data._id} result={data} />
        ))}
      </div>
    </div>
  );
};

export default Saved;
