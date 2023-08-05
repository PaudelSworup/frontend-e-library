import React, { useEffect, useState } from "react";
import { recommendedBooks } from "../../API/bookAPI";
import { useSelector } from "react-redux";
import ThumbNail from "./ThumbNail";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  const { userid } = useSelector((state) => state.users);

  useEffect(() => {
    recommendedBooks(userid).then((res) => {
      setFeatured(res?.data?.recommendations);
    });
  }, [userid]);

  return (
    <>
      <h2 className=" p-2 text-white tracking-widest capitalize font-serif text-2xl">
        Featured Item (Rating based)
      </h2>
      <div className="px-5 sm:grid md:grid-cols-2 xl:flex overflow-x-scroll scrollbar-hide ">
        {featured?.map((data) => (
          <ThumbNail key={data?.isbn} result={data} />
        ))}
      </div>
    </>
  );
};

export default Featured;
