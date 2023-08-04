import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import AddBook from "./AddBook";

const SideBar = () => {
  const [nav, setNav] = useState(false);
  const [show, setShow] = useState(true);

  console.log(nav);

  useEffect(() => {
    // Close navigation when the window is resized to larger screens
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShow(true)
        setNav(false);
      } else {
        setShow(false);
        setNav(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div
          className={`${
            nav ? "hidden" : "visible"
          } sm:w-[18%] p-2 bg-gray-500 h-screen`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col text-white">
              <p>Home</p>
              <p>About</p>
            </div>
          </div>
        </div>
        <div>
          <FaBars
            onClick={() => setNav(!nav)}
            className={` ${
              show ? "hidden" : "visible"
            } px-2 text-4xl text-white`}
          />
          {/* <button onClick={()=>setNav(!nav)} className='sm:hidden border border-blue-500 bg-blue-400 px-2 text-white'>Nav</button> */}
        </div>
        <div className="mx-2 my-2">
        <AddBook/>
        </div>
        
      </div>
    </>
  );
};

export default SideBar;
