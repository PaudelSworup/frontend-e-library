import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { useParams } from "react-router-dom";
import { getBookbyCategory } from "../API/bookAPI";
import Generes from "./Generes";
import ThumbNail from "./ThumbNail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryData = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState([]);


  // get the books by category
  useEffect(() => {
    getBookbyCategory(id).then((res) => {
      if (res?.data.books.length < 1) {
        return toast("Currently there are no books📖", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setGenre(res?.data?.books);
    });
  }, [id]);

  
 


  return (
    <>
      <div>
        <NavBars />
        <Generes />
        <div className="flex flex-col w-52 gap-6 p-4">
          <select className="p-1 border-none outline-none tracking-widest font-serif text-xl" >
            <option>Sort By(all)</option>
            <option>New Arrival</option>
          </select>
        </div>
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#2E2E2E]">
          {genre.map((result) => (
            <ThumbNail key={result?.isbn} result={result} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryData;
