import React, { useEffect, useState } from "react";
import items from "./NavItem";
import { FaBars, FaBell, FaHistory, FaHome, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DropMenu from "./DropMenu";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { getNotified, setStatus } from "../../API/bookAPI";
import { setNotify } from "../../store/notifySlice";

const NavBars = () => {
  const icons = [FaHome, FaHistory, FaBell];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [notification, setNotification] = useState(false);
  const { fullname, userid } = useSelector((state) => state.users);
  const { noti } = useSelector((state) => state.notify);
  const [count, setCount] = useState(null);
  const [colour, setColour] = useState("bg-red-600");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleDropDown = () => {
    setShowDrop(!showDrop);
  };

  useEffect(() => {
    noti?.map((length) => {
      const falseCount = length?.data?.filter(
        (item) => item.notificationStatus === false
      ).length;

      setCount(falseCount);
      if (falseCount === 0) {
        setCount(null);
      }
    });
  }, [noti]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotified(userid);
        if (response?.data.success && response?.data.notification.length > 0) {
          const { notification } = response?.data;
          console.log(notification);
          dispatch(setNotify({ data: notification }));
        }

        if (response?.data?.notification.length === 0) {
          sessionStorage.removeItem("notify");
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };
    if (fullname && userid) {
      fetchNotifications();
    }
  }, [dispatch, userid]);

  const handleSubmit = (e) => {
    if (search === null || search === "") {
      return toast.error("Enter book name 📖", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
    e.preventDefault();
    navigate(`/search?name=${search}`);
  };

  const handleNotication = () => {
    console.log("hello");
    const newData = [];
    setNotification(!notification);
    setColour("bg-none");
    setCount(null);
    noti.map((data) => {
      return data?.data?.map((data) => {
        return newData.push({
          id: data?.book?._id,
          message: data?.messageNotification,
          user_id: data?.user?._id ? data?.user?._id : null,
          status: data?.notificationStatus,
          date: data?.date,
        });
      });
    });
    // if(count !=null){
    setStatus({ newData }, userid).then((res) => {
      if (res?.success === true && res?.notification.length > 0) {
        dispatch(
          setNotify({
            data: res?.notification,
          })
        );
      }
    });
    // }
  };

  return (
    <nav className="bg-gray-900 shadow-xl py-2 px-7 md:px-10 md:flex items-center justify-between">
      <div className="font-bold text-2xl cursor-pointer">
        {fullname ? (
          <Link to="/home">
            <img
              src="/images/kct.png"
              className="h-16 w-16 rounded-xl"
              alt=""
            />
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
      {fullname && userid && (
        <>
          <div className="relative sm:flex items-center p-2 text-gray-300 focus-within:text-gray-600">
            <BiSearch
              className="absolute  top-[9 px] left-[15px] text-black w-6 h-[36px] cursor-pointer"
              onClick={handleSubmit}
            />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              theme="light"
            />
            <input
              type="search"
              className="border-none outline-none rounded-xl ring-2 ring-offset-gray-600 focus:ring-offset-gray-800 p-[6px] pr-3 pl-10 focus:ring-2 w-full"
              size="50"
              placeholder="Quick search for book"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="sm:hidden absolute right-6 top-6 flex items-center pr-2">
            <button
              type="button"
              className="relative bg-gray-800 p-1 transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleMobileMenu}
            >
              <FaBars className="text-white text-xl " />
            </button>
          </div>

          <div className="hidden transition-all duration-300 sm:flex ml-6">
            {items.map((currentNavItems, i) => {
              const { id, span, link } = currentNavItems;

              return (
                <li
                  key={id}
                  onClick={() => navigate(link)}
                  className="md:my-2 my-[95px] cursor-pointer flex flex-col  justify-center items-center"
                >
                  {React.createElement(icons[i % icons.length], {
                    className: "text-[#fff] text-2xl ",
                  })}
                  <div className="text-white cursor-pointer relative p-1 tracking-widest">
                    <span>{span}</span>

                    {span === "notification" && noti.length > 0 && (
                      <div>
                        <span
                          className={`absolute ${
                            count === null ? "bg-none" : colour
                          } p-1 h-6 w-6 rounded-full bottom-9 right-7 flex items-center justify-center`}
                          onClick={handleNotication}
                        >
                          {count} {notification && <Notification />}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
            <div className="flex justify-end items-center">
              <div className="relative md:border md:rounded-full p-2 ">
                <FaUser
                  className="text-white md:m-0 ml-2 text-xl cursor-pointer"
                  onClick={handleDropDown}
                />
                {showDrop && <DropMenu />}
              </div>
            </div>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } sm:hidden  px-2 pb-3 pt-2 transition duration-300 max-h-[20rem]`}
          >
            <div className="flex flex-col space-y-4">
              {items.map((currentNavItems, i) => {
                const { id, span, link } = currentNavItems;

                return (
                  <li
                    key={id}
                    onClick={() => navigate(link)}
                    className="md:my-2 flex flex-col  justify-center items-center"
                  >
                    {React.createElement(icons[i % icons.length], {
                      className: "text-[#fff] cursor-pointer text-2xl ",
                    })}
                    <div className="text-white relative p-1 tracking-widest">
                      <span>{span}</span>

                      {span === "notification" && noti.length > 0 && (
                        <div>
                          <span
                            className={`absolute ${
                              count === null ? "bg-none" : colour
                            } p-1 h-6 w-6 rounded-full bottom-9 right-7 flex items-center justify-center`}
                            onClick={handleNotication}
                          >
                            {count} {notification && <Notification />}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
              <div className="flex justify-center items-center">
                <div className="relative md:border md:rounded-full p-2 ">
                  <FaUser
                    className="text-white md:m-0 ml-2 text-xl cursor-pointer"
                    onClick={handleDropDown}
                  />
                  {showDrop && <DropMenu />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBars;