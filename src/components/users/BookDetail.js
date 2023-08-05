import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { useParams } from "react-router-dom";
// import { getBookDetails } from "../API/bookAPI";
import DetailSection from "./DetailSection";
import { getBookDetails } from "../../API/bookAPI";

const BookDetail = () => {
  const { id } = useParams();
  const [detail, setDetails] = useState([]);

  useEffect(() => {
    getBookDetails(id).then((res) => {
      setDetails(res?.data?.books);
    });
  }, [id]);

  return (
    <>
      <NavBars />
      <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#111]">
          {detail.map((result) => (
            <DetailSection key={result.isbn} result={result} />
          ))}
        </div>
    </>
  );
};

export default BookDetail;
