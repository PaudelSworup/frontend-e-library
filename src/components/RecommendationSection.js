import React from "react";
import { Link } from "react-router-dom";

const RecommendationSection = ({ newRecommendation, h2, category }) => {
  return (
    <>
      {newRecommendation.length > 0 && (
        <div className="mt-4">
          <h2 className="text-white text-xl tracking-widest ">{h2}</h2>
          {category && (
            <p className="text-white underline tracking-widest">{category}</p>
          )}

          <div className="grid sm:flex overflow-x-scroll scrollbar-hide ">
            {newRecommendation?.map((data) => {
              return (
                <div key={data?.isbn} className="p-2 my-10 cursor-pointer  hover:z-50 ">
                  <img
                    src={`http://localhost:8000/${data?.image}`}
                    alt=""
                    className="w-[90%] sm:w-[80%] max-h-[300px] md:rounded-md"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationSection;
