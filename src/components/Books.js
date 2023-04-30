import React, { useEffect, useState } from "react";
import { getAllBooks } from "../API/bookAPI";
import ThumbNail from "./ThumbNail";
import Row from "./Row";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooks(res?.data?.books);
    });
  }, []);

  useEffect(() => {
    filterItem();
  }, [books]);

  const filterItem = () => {
    const recentlyAdded = books.map((data) => {
      return { ...data, timestamps: new Date(data.createdAt).getTime() };
    });

    recentlyAdded.sort((a, b) => b.timestamps - a.timestamps);

    setRecent(recentlyAdded.slice(0, 4));
  };

  const data = books.slice(0, 4);

  return (
    <>
      <div className="mt-4">
        <Row title="Our Collections" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
          {data.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>

        <Row title="Recently Added/New Arrival" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
          {recent.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;
