import React, { useEffect, useState } from "react";
import { getAllBooks } from "../API/bookAPI";
import ThumbNail from "./ThumbNail";
import { FaDownload, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const [isLoaded, setLoaded] = useState(false);

  let totalLength = books.length

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooks(res?.data?.books);
    });
  }, []);

  const filterItem = () => {
    const recentlyAdded = books.map((data) => {
      return { ...data, timestamps: new Date(data.createdAt).getTime() };
    });

    recentlyAdded.sort((a, b) => b.timestamps - a.timestamps);

    setBooks(recentlyAdded.slice(0, 3));
  };

  const setAll = () => {
    getAllBooks().then((res) => {
      setBooks(res?.data?.books);
    });
  };

  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (books.length > limit) {
        setLimit(limit + 2);
        
      } else {
        console.log("loading state", loading);
        return toast("All books are loaded 📖", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }, 1000);
  };

  const data = books.slice(0, limit);

  // console.log(books)

  return (
    <>
      {/* <div className="container"> */}
      {/* <div className=" grid grid-cols-2 px-5   sm:flex gap-3 p-3 justify-center items-center ">
          <button
            className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest"
            onClick={() => filterItem()}
          >
            Recently Added
          </button>
          <button
            className="py-2 bg-slate-600 rounded-md px-2 text-white tracking-widest"
            onClick={() => setAll()}
          >
            All Books
          </button>
        </div> */}
        <div className="flex px-3 py-2 justify-between">
        <h3 className="text-white text-2xl font-serif">
        Our collections
        </h3>

        <p className="text-gray-500 text-xl transition-all duration-100 cursor-pointer capitalize hover:text-white" onClick={()=>navigate("/collection")}>show all</p>
        </div>
     
      <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
        {data.map((result) => (
          <ThumbNail key={result.isbn} result={result} limit={limit} />
        ))}
      </div>
      {/* <div className="flex gap-1 justify-center">
          
            <span
              onClick={load}
              className="text-blue-600 cursor-pointer text-xl tracking-widest b"
            >
              Load more results
            </span>
            <span className="text-blue-600 mt-1">
              <FaDownload />
            </span>
            {loading && (
              <FaSpinner className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 text-white border-gray-900" />
            )}
        
      </div> */}
      {/* </div>j */}

      {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-white border-gray-900"></div> */}
    </>
  );
};

export default Books;
