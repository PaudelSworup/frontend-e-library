import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { useSelector } from "react-redux";
import ThumbNail from "./ThumbNail";
import items from "./NavItem";



const SavedItems = () => {
  const { userid } = useSelector((state) => state.users);
  const [Isbn, setIsbn] = useState();

  useEffect(() => {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        if (key.startsWith(userid)) {
          setIsbn(JSON.parse(localStorage.getItem(key)));
        }
      }
    }
  }, [userid]);

  return (
    <>
      <NavBars />
      <div className="lg:mx-40 flex gap-9 main_container ">
        <div className="p-2 user_detail_container">
          <div className="text-white border w-20 h-20 flex justify-center items-center rounded-full transition-all duration-150 cursor-pointer hover:opacity-100 lg:w-44 lg:h-44 ">
            <span className="text-center opacity-0 hover:opacity-100 ">
              Uplaod
              <br />
              Image
            </span>
          </div>
          <div className="text-white flex flex-col ">
            <span>Sworup kc</span>
            <span>sk@gmail.com</span>
          </div>

          <div className="flex gap-3 lg:flex-col mt-3">
            {items?.map((data)=>(
              <span key={data.id} className="text-white">{data.span}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="p-2 saved_items">
            <h2 className="text-white">Saved Items</h2>
            <p className="text-[#9E9E9E]">
              Saved Books. Save books to keep track of the books you want to
              Request later. To unsave, just click on the bookmark icon again.
            </p>
          </div>

          <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
            <ThumbNail result={Isbn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedItems;
