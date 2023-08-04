import React, { useEffect, useState } from "react";
import { getAllBooks, getMostRequested } from "../API/bookAPI";
import ThumbNail from "./ThumbNail";
import Row from "./Row";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [recent, setRecent] = useState([]);
  const [mostrequested, setMostRequested] = useState([]);

  const filterItem = () => {
    const recentlyAdded = books.map((data) => {
      return { ...data, timestamps: new Date(data.createdAt).getTime() };
    });

    recentlyAdded.sort((a, b) => b.timestamps - a.timestamps);

    setRecent(recentlyAdded.slice(0, 4));
  };

  useEffect(() => {
    Promise.all([getAllBooks(), getMostRequested()]).then(
      ([bookData, mostrequestedData]) => {
        setBooks(bookData?.data?.books);
        setMostRequested(mostrequestedData?.data?.mostRequestedBooks);
      }
    );
  }, []);

  useEffect(() => {
    filterItem();
  }, [books]);

  const data = books.slice(0, 4);

  return (
    <>
      <div className="mt-4">
        <Row title="Our Collections" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#222]">
          {data.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>

        <Row title="Recently Added/New Arrival" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#222]">
          {recent.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>

        <Row title="Most Requested" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#222]">
          {mostrequested?.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;
