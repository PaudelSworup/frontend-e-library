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
import { getNotified, setStatus } from "../API/bookAPI";
import { setNotify } from "../store/notifySlice";
import { useQuery } from "react-query";

const NavBars = () => {
  const icons = [FaHome, FaHistory, FaBell];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState(false);
  const { fullname, userid } = useSelector((state) => state.users);
  const { noti } = useSelector((state) => state.notify);
  const [count, setCount] = useState(null);
  const [colour, setColour] = useState("bg-red-600");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // const { data, isLoading, isError } = useQuery("notifications", async () => {
  //   if (fullname && userid) {
  //     const response = await getNotified(userid);
  //     if (response?.data.success && response?.data.notification.length > 0) {
  //       const { notification } = response.data;
  //       console.log(notification)
  //       return dispatch(setNotify({ data: notification }));
  //     }
  //     return [];
  //   }
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: Unable to fetch notifications</div>;
  // }

  // const falseCount = data?.filter((item) => item.status === false).length;
  // dispatch(setNotify({ data:data  }));
  // setCount(falseCount)
  // if (falseCount === 0) {
  //   setCount(null);
  // }
  // console.log(data)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotified(userid);
        if (response?.data.success && response?.data.notification.length > 0) {
          const { notification } = response?.data;
          console.log(notification);
          dispatch(setNotify({ data: notification }))
  
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
      return toast("Enter book name 📖", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
    e.preventDefault();
    navigate(`/search?name=${search}`);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNotication = () => {
    console.log("hello")
    const newData = [];
    setNotification(!notification);
    setColour("bg-none");
    setCount(null);
    noti.map((data) => {
      console.log("HELLO", data)
      return data?.data?.map((data) => {
        return newData.push({
          id: data?.book?._id,
          message: data?.messageNotification,
          user_id: data?.user?._id ?data?.user?._id : null ,
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
            className={`text-3xl absolute right-8 top-4 cursor-pointer duration-500 md:hidden 
            ${open ? "rotate-180" : "rotate-0"}
            `}
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
                <li
                  key={id}
                  onClick={() => navigate(link)}
                  className="md:my-2 my-[95px] flex flex-col  justify-center items-center"
                >
                  {React.createElement(icons[i % icons.length], {
                    className: "text-[#fff] text-2xl ",
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
