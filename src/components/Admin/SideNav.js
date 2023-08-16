import React, { useState } from "react";
import { FaBars, FaChartPie, FaListUl, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../store/userSlice";


const SideNav = ({ PassedComponent }) => {
  const dispatch = useDispatch();
  const { userid } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);

  const Logout = () => {
    localStorage.removeItem(userid);
    dispatch(setLogout());
  };
  return (
    <>
      <div className="  lg:hidden flex items-center justify-end p-2 mx-3">
        <FaBars
          onClick={() => setShow(!show)}
          className={`p-2 text-white text-4xl ${
            show ? "animate-bounce" : "animate-none"
          }`}
        />
      </div>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          show ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaChartPie className="text-2xl" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Dropdown />
              </div>
            </li>
            <li>
              <Link
                to="/requests"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaListUl className="text-2xl"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Book Approval List</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>

            <li>
              <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <FaSignOutAlt className="text-2xl"/>
                <span
                  onClick={Logout}
                  className="flex-1 ml-3 whitespace-nowrap"
                >
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {PassedComponent}
    </>
  );
};

export default SideNav;
