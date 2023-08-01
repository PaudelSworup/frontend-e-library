import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchBook } from "../API/bookAPI";
import ThumbNail from "./ThumbNail";
import NavBars from "./NavBars";
import { toast } from "react-toastify";

const SearchedItem = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const name = searchParams.get("name");
  const [searchItem, setSearchItem] = useState([]);

  useEffect(() => {
    const getSearchItem = () => {
      searchBook(name).then((res) => {
        if(res?.data?.uniqueResults.length < 1){
          return toast.error("Book not found",{position:"top-right"})
        }
        setSearchItem(res?.data?.uniqueResults);
      });
    };
    getSearchItem();
  }, [name]);

  return (
    <>
      <NavBars />
      <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#2E2E2E]">
        {searchItem.map((result) => (
          <ThumbNail key={result?.isbn} result={result} />
        ))}
      </div>
    </>
  );
};

export default SearchedItem;
