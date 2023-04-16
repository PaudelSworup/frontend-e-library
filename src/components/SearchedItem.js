import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchBook } from "../API/bookAPI";
import Cards from "./Cards";

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

  const props = {searchItem}

  console.log(searchItem)
  return <Cards {...props}/>;
};

export default SearchedItem;
