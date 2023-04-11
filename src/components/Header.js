import React, { useEffect, useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import items from "./navItems";
import Banner from "./Banner";
import Row from "./Row";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setsubmenuOpen] = useState(false);
  
  
  return (
    <>
    <div className={`flex ${open ? "gap-8" : "gap-2"}`}>
      <div
        className={`h-full bg-dark-purple  p-5 text-white pt-8 relative ${
          open ? "w-72" : "w-20"
        } duration-200 `}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 cursor-pointer ${
            !open && "rotate-180"
          } `}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300  text-[40px] rounded cursor-pointer float-left block mr-2 duration-200  ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-right font-medium  duration-200 ${
              !open && "scale-0"
            }`}
          >
            Library Management
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white py-2 px-4  mt-6 ${
            !open ? "px-2.5" : "px-4"
          }`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            }`}
          />
          <input
            type={"search"}
            placeholder="search"
            className={`bg-transparent text-white focus:outline-none  w-full ${
              !open && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          {items.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                } ${menu.Logoutspacing && "mt-96"}`}
              >
                <span className="text-2xl float-left block">
                  {/* <RiDashboardFill /> */}
                  {menu.icon}
                </span>
                <span
                  className={`flex-1 font-medium text-base  ${
                    !open && "hidden"
                  }`} 
                >
                  {menu.title}
                </span>
                {menu.submenu && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={() => {
                      setsubmenuOpen(!submenuOpen);
                    }}
                  />
                )}
              </li>

              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.subMenuItems.map((cur, i) => (
                    <li
                      key={i}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer px-4 p-2 hover:bg-light-white rounded-md "
                    >
                      {/* {cur.title} */}
                      <span className="text-2xl float-left block">
                  {/* <RiDashboardFill /> */}
                  {cur.icon}
                </span>
                <span
                  className={`flex-1 font-medium text-base ${
                    !open && "hidden"
                  }`}
                >
                  {cur.title}
                </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>

      <div className="w-full">
        {/* <h1 className="text-2xl font-semibold">Home Page</h1> */}
        <Banner/>
        <Row/>
      </div>

    </div>
    
    </>
  );
};

export default Header;
