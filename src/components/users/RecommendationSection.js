import React from "react";
import LazyImage from "./LazyImage";
import { Link } from "react-router-dom";
import { image } from "../../config";

const RecommendationSection = ({ newRecommendation, h2, category }) => {
  return (
    <>
      {newRecommendation.length > 0 && (
        <div className="mt-4">
          <h2 className="text-white text-xl tracking-widest ">{h2}</h2>
          {category && (
            <p className="text-white underline tracking-widest">{category}</p>
          )}

          <div className="grid grid-cols-3 sm:flex overflow-x-scroll scrollbar-hide ">
            {newRecommendation?.map((data) => {
              return (
                <Link to={`/book/detail/${data?._id}`} key={data?.isbn}>
                  <div className="p-2 my-1 cursor-pointer  hover:z-50 ">
                    <LazyImage
                      src={`${image}/${data?.image}`}
                      alt=""
                      className="w-[90%] sm:w-[80%] max-h-[300px] md:rounded-md"
                      loading="lazy"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationSection;
