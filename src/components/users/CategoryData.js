import React, { useState } from "react";
import NavBars from "./NavBars";
import { useParams } from "react-router-dom";

import Generes from "./Generes";
import ThumbNail from "./ThumbNail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBookbyCategory } from "../../API/bookAPI";
import { useQuery } from "react-query";

const CategoryData = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState([]);

  const { data} = useQuery(
    ["getGenre", id],
    async () => await getBookbyCategory(id),
    {
      onSettled: (data) => setGenre(data?.data?.books),
    }
  );

  if (data?.data?.books.length < 1) {
    toast.error("No books has been added related to this genre", {
      position: "top-right",
    });
  }

  // get the books by category
  // useEffect(() => {
  //   getBookbyCategory(id).then((res) => {
  //     if (res?.data.books.length < 1) {
  //       return toast.error("No books has been added related to this genre", {
  //         position: "top-right",
  //       });
  //     }
  //     setGenre(res?.data?.books);
  //   });
  // }, [id]);

  return (
    <>
      <div>
        <NavBars />
        <Generes />
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#111]">
          {genre.map((result) => (
            <ThumbNail key={result?.isbn} result={result} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryData;
