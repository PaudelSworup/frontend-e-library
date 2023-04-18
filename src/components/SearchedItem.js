import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchBook } from "../API/bookAPI";
import ThumbNail from "./ThumbNail";
import NavBars from "./NavBars"

const SearchedItem = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const name = searchParams.get("name");
  const[searchItem, setSearchItem] = useState([])

  useEffect(() => {
    const getSearchItem = ()=>{
        searchBook(name).then((res) => {
            setSearchItem(res?.data?.uniqueResults)
          });
    }
    getSearchItem()
  }, [name]);

  // const props = {searchItem}

  console.log(searchItem)
  // return <ThumbNail {...props}/>;
  return(
    <>
   <NavBars/>
    <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#2E2E2E]">
        {searchItem.map((result) => (
          <ThumbNail key={result.id} result={result} />
        ))}
      </div>
    </>
    
  )
  
};

export default SearchedItem;
