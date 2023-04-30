import React from "react";
import { icons } from "./Ricons";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Detail from "./Detail";

const DetailSection = ({ result }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-2 my-10 hover:z-50 ">
        <div className="py-3 px-2">
          <p className="text-white tracking-wider">
            <Link to="/">Home</Link> /{" "}
            <Link>{result?.category?.category_name}</Link> /{" "}
            <span>{result?.title}</span>{" "}
          </p>
        </div>

        <img
          src={`http://localhost:8000/${result?.image}`}
          alt=""
          className="w-[75%] max-w-[100%] max-h-[400px] md:rounded-lg cursor-pointer"
        />

        <div className="flex gap-3 py-2 px-4 sm:px-7">
          {icons.map((data) => (
            <div
              key={data.id}
              className="bg-[#444] cursor-pointer p-2 rounded-full"
            >
              {data.icon}
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
