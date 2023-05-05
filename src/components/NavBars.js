import React, { useState } from "react";
import items from "./NavItem";
import { FaBars, FaBell, FaHistory, FaHome, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { drop } from "./dropMenu";

const NavBars = () => {
  const icons = [FaHome, FaHistory, FaBell];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

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
    navigate(`/search?name=${search}`);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    // <div className="shadow-xl w-full fixed top-0 left-0">
    <div className="md:flex items-center justify-between bg-[#252525]  py-2  md:px-10 px-7">
      <div className="font-bold text-2xl cursor-pointer ">
        <Link to="/">
          <img
            src="/images/librarykct.png"
            className="h-16 w-16 rounded-xl"
            alt=""
          />
        </Link>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`text-3xl absolute right-8 top-4 cursor-pointer duration-500 md:hidden ${
          open ? "rotate-180" : "rotate-0"
        }`}
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
        className={`md:flex cursor-pointer md:pb-0 pb-2 absolute md:static bg-[#252525]  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${
          open ? "top-[148px] z-[1] rotate-[360deg]" : "top-[-500px]"
        }`}
      >
        {items.map((currentNavItems, i) => {
          const { id, span, link } = currentNavItems;
          return (
            <Link to={link} key={id}>
              <li className="md:my-2 my-[95px] flex flex-col  justify-center items-center">
                {React.createElement(icons[i % icons.length], {
                  className: "text-[#999] text-2xl ",
                })}
                <span className="text-white p-1 tracking-widest">{span}</span>
              </li>
            </Link>
          );
        })}
      </ul>

      <div className="flex justify-end items-center">
        <div className="relative md:border md:rounded-full p-2 ">
          <FaUser
            className="text-white md:m-0 ml-2 text-xl cursor-pointer"
            onClick={handleDropdownClick}
          />
          {showDropdown && (
            <div className="absolute z-10  top-10 right-0 bg-white rounded-md shadow-lg py-2">
              {drop.map((data) => {
                return (
                  <Link to={data.link} key={data.id}>
                    <div
                      className="px-4 py-2 w-48 cursor-pointer flex items-center"
                      
                    >
                      <span>{data.icon}</span>
                      <span onClick={data.click}>{data.span}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>

    // </div>
  );
};

export default NavBars;
