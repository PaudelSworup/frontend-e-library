import React, { useState } from "react";
import { icons } from "./Ricons";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Detail from "./Detail";
import { toast } from "react-toastify";
import { image } from "../../config";
import { getBookmarks, postBookMark, removeBookmark } from "../../API/bookAPI";
import { useQuery } from "react-query";

const DetailSection = ({ result, id }) => {
  const navigate = useNavigate();

  const { userid } = useSelector((state) => state.users);

  const [saved, setSaved] = useState(true);

  const savedStatus = useQuery(["savedstatus"], async () => getBookmarks(), {
    onSuccess: (data) => {
      data?.data?.books?.filter((data) =>
        data?.userId === userid && data?.book?._id === id
          ? setSaved(false)
          : setSaved(true)
      );
    },
  });

  const saveItems = () => {
    console.log("saved item value is", saved);
    setSaved(!saved);
    if (saved) {
      postBookMark({ userId: userid, book: id }).then((data) => {
        if (data?.success === true) {
          return toast.success(data?.message);
        }
      });
    } else {
      removeBookmark(userid, id).then((data) => {
        if (data?.success === true) {
          return toast.success(data?.message);
        }
      });
    }
  };

  return (
    <>
      <div className="p-2 my-10 hover:z-50 ">
        <div className="py-3 px-2">
          <p className="text-white tracking-wider">
            <Link to="/home">Home</Link> /
            <Link
              to={`/book/genre/${result?.category?.category_name}/${result?.category?._id}`}
            >
              {result?.category?.category_name}
            </Link>
            /<span>{result?.title}</span>
          </p>
        </div>

        <img
          src={`${image}/${result?.image}`}
          alt=""
          className="w-[75%] max-w-[100%] max-h-[400px] md:rounded-lg cursor-pointer"
        />

        <div className="flex gap-3 py-2 px-4 sm:px-7">
          {icons.map((data) => (
            <div
              key={data.id}
              className="bg-[#222] shadow-2xl cursor-pointer p-2 rounded-full"
            >
              {data.id === 4 ? (
                <span
                  className={`${saved ? "text-white" : "text-red-600"}`}
                  onClick={saveItems}
                >
                  {data.icon}
                </span>
              ) : (
                <span onClick={data.onclick} className="text-white">
                  {data.icon}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col text-white tracking-widest">
          <h2 className="text-2xl">Genres</h2>
          <p
            className="cursor-pointer underline underline-offset-1"
            onClick={() =>
              navigate(
                `/book/genre/${result?.category?.category_name}/${result?.category?._id}`
              )
            }
          >
            {result?.category?.category_name}
          </p>
        </div>
      </div>
      <Detail result={result} />
    </>
  );
};

export default DetailSection;
