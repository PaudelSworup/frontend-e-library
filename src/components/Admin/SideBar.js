import React, { useState } from "react";
import { FaBars, FaChartPie, FaListUl, FaSignOutAlt, FaUsers } from "react-icons/fa";
import {GiBookshelf} from "react-icons/gi"

import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../store/userSlice";
import { useQuery } from "react-query";
import { getReports } from "../../API/bookAPI";

const SideBar = ({ PassedComponent }) => {
  const dispatch = useDispatch();
  const { userid, fullname } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(null);

  const Logout = () => {
    localStorage.removeItem(userid);
    dispatch(setLogout());
  };

  const listCount = useQuery(["reportsCount"], async () => await getReports(), {
    onSuccess: (data) => {
      const filteredRequests = data?.data?.request.filter(
        (status) => status.issueStatus === 0
      );
      if (filteredRequests.length > 0) {
        setCount(filteredRequests.length);
      }

      if(filteredRequests.length === 0){
        setCount(null)
      }
    },
  });

  return (
    <>
      <div className="lg:hidden   flex items-center justify-end p-2 bg-slate-700">
        <FaBars
          onClick={() => setShow(!show)}
          className={`p-2 text-white text-4xl ${show && "animate-bounce"}`}
        />
      </div>

      <nav
        className={`fixed bg-gray-800 top-0 left-0 z-40 w-64 h-screen transition-transform ${
          show ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4">
          <h2 className="text-white text-2xl font-semibold">Admin Dashboard</h2>
        </div>
        <ul className="py-2">
          <li className="mb-1">
            <Link
              to="/admin"
              className="text-white flex items-center py-2 pl-4 pr-6 text-sm font-medium transition-colors duration-200 hover:bg-gray-700"
            >
              <FaChartPie className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/requests"
              className="text-white flex items-center py-2 pl-4 pr-6 text-sm font-medium transition-colors duration-200 hover:bg-gray-700"
            >
              <FaListUl className="mr-2" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Book Approval List
              </span>
              {count != null && (
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {count}
                </span>
              )}
            </Link>
          </li>

          <li className="mb-1">
            <Link
              to="/books"
              className="text-white flex items-center py-2 pl-4 pr-6 text-sm font-medium transition-colors duration-200 hover:bg-gray-700"
            >
              <GiBookshelf className="mr-2" />
              <span className="flex-1 ml-3 whitespace-nowrap">Book lists</span>
            </Link>
          </li>

          <li className="mb-1">
            <Link
              to="/users"
              className="text-white flex items-center py-2 pl-4 pr-6 text-sm font-medium transition-colors duration-200 hover:bg-gray-700"
            >
              <FaUsers className="mr-2" />
              <span className="flex-1 ml-3 whitespace-nowrap">user lists</span>
            </Link>
          </li>

          <li className="mb-1">
            <span className="text-white flex items-center py-2 pl-4 pr-6 text-sm font-medium transition-colors duration-200 hover:bg-gray-700">
              <Dropdown />
            </span>
          </li>
        </ul>
        <div onClick={Logout} className="absolute bottom-0 w-full">
          <Link
            to="/logout"
            className="text-white flex items-center py-2 pl-4 pr-6 text-sm font-medium transition-colors duration-200 hover:bg-gray-700"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Link>
        </div>
      </nav>
      <div className="flex-1">
        <main className="p-4 flex flex-col gap-4">
          <p className="text-white text-center">Welcome {fullname}</p>
          {PassedComponent}
        </main>
      </div>
    </>
  );
};

export default SideBar;
