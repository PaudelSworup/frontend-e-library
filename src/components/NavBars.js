import React, { useEffect, useState } from "react";
import items from "./NavItem";
import { FaBars, FaBell, FaHistory, FaHome, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DropMenu from "./DropMenu";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const NavBars = () => {
  const icons = [FaHome, FaHistory, FaBell];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState(false);
  const { fullname } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.notify);
  const [count, setCount] = useState(data.length);
  const [colour, setColour] = useState("bg-red-600");

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

  const handleNotication = () => {
    setNotification(!notification);
    setColour("bg-none");
    setCount(null);
  };

  return (
    <div className="md:flex items-center  justify-between bg-black  py-2  md:px-10 px-7">
      <div className="font-bold text-2xl cursor-pointer ">
        {fullname ? (
          <Link to="/home">
            {" "}
            <img
              src="/images/kct.png"
              className="h-16 w-16 rounded-xl"
              alt=""
            />{" "}
          </Link>
        ) : (
          <Link to="/">
            <img
              src="/images/kct.png"
              className="h-16 w-16 rounded-xl"
              alt=""
            />
          </Link>
        )}
      </div>

      {!fullname ? (
        <div>{/* <div className="text-white">Login</div> */}</div>
      ) : (
        <>
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
            className={`md:flex cursor-pointer md:pb-0 pb-2 absolute md:static bg-black  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${
              open ? "top-[148px] z-[1] rotate-[360deg]" : "top-[-500px]"
            }`}
          >
            {items.map((currentNavItems, i) => {
              const { id, span, link } = currentNavItems;

              return (
                <li key={id} onClick={()=>navigate(link)} className="md:my-2 my-[95px] flex flex-col  justify-center items-center">
                  {React.createElement(icons[i % icons.length], {
                    className: "text-[#fff] text-2xl ",
                  })}
                  <span className="text-white relative p-1 tracking-widest">
                   <span>{span}</span> 

                    {span === "notification" && data.length > 0 && (
                      <span
                        className={`absolute ${colour} p-1 h-6 w-6 rounded-full bottom-9 right-7 flex items-center justify-center`}
                        onClick={handleNotication}
                      >
                        {count} {notification && <Notification />}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-end items-center">
            <div className="relative md:border md:rounded-full p-2 ">
              <FaUser
                className="text-white md:m-0 ml-2 text-xl cursor-pointer"
                onClick={handleDropdownClick}
              />
              {showDropdown && <DropMenu />}
            </div>
          </div>
        </>
      )}
    </div>

    // </div>
  );
};

export default NavBars;
