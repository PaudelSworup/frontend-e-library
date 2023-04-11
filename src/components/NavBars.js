import React, { useState } from "react";
import items from "./NavItem";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NavBars = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    if (search === null || search === "") {
      return toast("Enter book name 📖", {
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
    e.preventDefault();
    console.log("hello");
    console.log(search);
  };
  return (
    <div className="shadow-xl w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-black py-2 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer ">
          <img
            src="../images/librarykct.png"
            className="h-16 w-16 rounded-xl"
            alt=""
          />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          <FaBars className="text-white" />
        </div>

        <div className="relative items-center p-2 flex   text-gray-300 focus-within:text-gray-600">
          <BiSearch
            className="absolute  top-[15px] left-4 text-black w-6 h-6 cursor-pointer"
            onClick={handleSubmit}
          />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <input
            type="search"
            className=" border-none outline-none rounded-xl ring-2 ring-offset-gray-600 focus:ring-offset-gray-800 p-[6px] pr-3 pl-10 focus:ring-2 w-full "
            size="40"
            placeholder="Quick search for book"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <ul
          className={`md:flex cursor-pointer md:pb-0 pb-12 absolute md:static bg-black md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {items.map((currentNavItems) => {
            const { id, src, span } = currentNavItems;
            return (
              <li key={id} className="md:my-2 my-12">
                <img src={src} alt="" />
                <span className="text-white p-2">{span}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavBars;
