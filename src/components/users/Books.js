import React, { useEffect, useState } from "react";
import ThumbNail from "./ThumbNail";
import Row from "./Row";
import { getAllBooks, getMostRequested } from "../../API/bookAPI";
import { useQuery } from "react-query";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [recent, setRecent] = useState([]);
  const [mostrequested, setMostRequested] = useState([]);

  const filterItem = () => {
    const recentlyAdded = books?.map((data) => {
      return { ...data, timestamps: new Date(data.createdAt).getTime() };
    });

    recentlyAdded.sort((a, b) => b.timestamps - a.timestamps);

    setRecent(recentlyAdded.slice(0, 4));
  };

  const getWholeBooks = useQuery(
    ["getallbooks"],
    async () => await getAllBooks(),
    {
      onSettled: (data) => setBooks(data?.data?.books),
    }
  );

  const mostRequestedQuery = useQuery(
    ["getmostrequested"],
    async () => await getMostRequested(),
    {
      onSettled: (data) => setMostRequested(data?.data?.mostRequestedBooks),
    }
  );

  useEffect(() => {
    filterItem();
  }, [books]);

  const datas = books.slice(0, 4);

  return (
    <>
      <div className="mt-4">
        <Row title="Our Collections" />

        <div className="px-5 sm:grid md:grid-cols-2 xl:grid-cols-4 xl:flex overflow-x-scroll scrollbar-hide bg-[#111]">
          {datas.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>

        <Row title="Recently Added/New Arrival" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:flex overflow-x-scroll scrollbar-hide bg-[#111]">
          {recent.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>

        <Row title="Most Requested" />
        <div className="px-5  sm:grid md:grid-cols-2 xl:flex overflow-x-scroll scrollbar-hide bg-[#111]">
          {mostrequested?.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;
