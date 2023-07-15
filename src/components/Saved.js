import React from "react";
import ThumbNail from "./ThumbNail";
import HeadingContent from "./HeadingContent";

const Saved = ({ data }) => {
  return (
    <div className="flex flex-col  ">
      <HeadingContent
        title="Saved Items"
        text=" Saved Books. Save books to keep track of the books you want to Request
          later. To unsave, just click on the bookmark icon again."
      />
     

      <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
        {data?.map((data) => (
          <ThumbNail key={data._id} result={data} />
        ))}
      </div>
    </div>
  );
};

export default Saved;
