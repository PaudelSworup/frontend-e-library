import React, { useEffect, useState } from "react";
import { getGenre } from "../../API/bookAPI";
import { useNavigate } from "react-router-dom";

const Generes = () => {
  const [genre, setGenre] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getGenre().then((res) => {
      setGenre(res?.data?.category);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col p-4">
        <h2 className="text-white font-bold text-2xl">Generes</h2>
        <div className="flex xl:justify-center gap-7 py-3 overflow-x-scroll scrollbar-hide">
          {genre && genre.map((data, i) => {
            return (
              <div
                key={data?._id}
                onClick={() =>
                  navigate(`/book/genre/${data?.category_name}/${data?._id}`)
                }
              >
                <span className=" cursor-pointer tracking-widest truncate text-xl ">
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-white transition duration-100 hover:scale-125">
                      {data?.category_name}
                    </span>
                  </div>
                </span>
              </div>
            );
          })}
        </div>
        <hr className="border border-[#252525]" />
      </div>
    </>
  );
};

export default Generes;
