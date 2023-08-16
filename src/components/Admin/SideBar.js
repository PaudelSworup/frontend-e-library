import React, { useState } from "react";
import { FaBars, FaChartPie, FaListUl, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../store/userSlice";

const SideBar = ({ PassedComponent }) => {
  const dispatch = useDispatch();
  const { userid, fullname } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);

  const Logout = () => {
    localStorage.removeItem(userid);
    dispatch(setLogout());
  };
  return (
    <>
      <div className="  lg:hidden flex items-center justify-end p-2 bg-slate-700">
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
              Book Approval List
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
