import React, { useEffect, useState } from "react";
import { getAllBooks } from "../API/bookAPI";
import ThumbNail from "./ThumbNail";


const Books = () => {
  const [books, setBooks] = useState([]);

 

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooks(res?.data?.books);
    });
  }, []);

  const filterItem = () => {
    const recentlyAdded = books.map((data) => {
      return { ...data, timestamps: new Date(data.createdAt).getTime() };
    });

    recentlyAdded.sort((a, b) => b.timestamps - a.timestamps);

    setBooks(recentlyAdded.slice(0, 3));
  };

  const setAll = () => {
    getAllBooks().then((res) => {
      setBooks(res?.data?.books);
    });
  };

  // console.log(books)

  return (
    <>
      {/* <div className="container"> */}
        <div className=" grid grid-cols-2 px-5   sm:flex gap-3 p-3 justify-center items-center ">
          <button
            className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest"
            onClick={() => filterItem()}
          >
            Recently Added
          </button>
          <button
            className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest"
            onClick={() => setAll()}
          >
            All Books
          </button>
        </div>

        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#111]">
          {books.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>
      {/* </div>j */}
    </>
  );
};

export default Books;
