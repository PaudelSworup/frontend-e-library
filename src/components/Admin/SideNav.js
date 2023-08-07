import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Chart from "./Chart";

const SideNav = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="sm:hidden flex items-center justify-end p-2 mx-3">
        <FaBars
          onClick={() => setShow(!show)}
          className={`p-2 text-white text-4xl ${
            show ? "animate-bounce" : "animate-none"
          }`}
        />
      </div>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          show ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      {/* <div className="flex items-center justify-center"> */}
        <div className="flex items-center justify-center sm:mx-60 m-5 rounded">
          <Chart />
        {/* </div> */}
      </div>
    </>
  );
};

export default SideNav;
