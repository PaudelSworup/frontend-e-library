import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import ThumbNail from "./ThumbNail";
import { getAllBooks } from "../../API/bookAPI";
import { FaDownload, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";


const Collection = () => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(() => {
    const savedLimit = localStorage.getItem("limit");
    return savedLimit ? Number(savedLimit) : 4;
  });

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooks(res?.data?.books);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("limit", limit);
  }, [books, limit]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("books");
      localStorage.removeItem("limit");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (books.length > limit) {
        setLimit(limit + 2);
      } else {
        return toast.success("All books are loaded 📖", {
          position: "top-center",
        });
      }
    }, 1000);
  };

  const data = books.slice(0, limit);

  return (
    <>
      <NavBars />
      <div className="p-2 sm:mx-20 py-10">
        <p className="text-white">Home / collections</p>

        <div className="text-white my-10 flex flex-col gap-1 tracking-wider">
          <h3 className="text-2xl">Our collections</h3>
          <p>Our all book collection, updates everyday</p>
        </div>

        <div className="sm:grid md:grid-cols-2 xl:flex overflow-x-scroll scrollbar-hide flex-wrap ">
          {data?.map((result) => (
            <ThumbNail key={result.isbn} result={result} />
          ))}
        </div>

        <div className="flex gap-1 justify-center">
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
        </div>
      </div>
    </>
  );
};

export default Collection;
