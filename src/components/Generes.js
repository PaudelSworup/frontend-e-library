import React, { useEffect, useState } from "react";
import { getGenre } from "../API/bookAPI";

const Generes = () => {
  const [genre, setGenre] = useState([]);
  useEffect(()=>{
    getGenre().then((res)=>{
        setGenre(res?.data?.category)
    })
  },[])
  
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-white font-bold text-2xl">Generes</h2>
      <div className="flex  gap-3 py-3 overflow-x-scroll scrollbar-hide">
        {genre.map((data) => {
          return (
            <div key={data?._id}>
              <span className="text-white cursor-pointer tracking-widest truncate text-xl hover:opacity-50">
                {data?.category_name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Generes;
