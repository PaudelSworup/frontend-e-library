import React, { useState } from "react";
import items from "./NavItem";
import { FaBars, FaBell, FaHistory, FaHome, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DropMenu from "./DropMenu";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { getNotified, setStatus, getNotifications } from "../../API/bookAPI";
import { setNotify } from "../../store/notifySlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "./Loading";

const NavBars = () => {
  const icons = [FaHome, FaHistory, FaBell];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [notification, setNotification] = useState(false);
  const { fullname, userid } = useSelector((state) => state.users);
  const { noti } = useSelector((state) => state.notify);
  const [colour, setColour] = useState("bg-red-600");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: (data) => setStatus(data, userid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userid] });
    },
  });

  const { isLoading, data, error } = useQuery(
    ["notifications", userid],
    async () => await getNotified(userid),
    {
      enabled: !!userid,
      onSettled: (data) => dispatch(setNotify(data?.data?.notification)),
    }
  );

  const booksMutation = useMutation({
    mutationFn: (data) => setStatus(data, userid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booksNotifications", userid],
      });
    },
  });

  const booksNotifications = useQuery(
    ["booksNotifications", userid],
    async () => await getNotifications(userid),
    {
      enabled: !!userid,
      onSuccess: (data) => dispatch(setNotify(data?.data?.notification)),
    }
  );

  // const booksNotifications = useQuery(
  //   ["booksNotifications"],
  //   async () => await getNotifications(),
  //   {
  //     onSettled: (data) => dispatch(setNotify(data?.data?.notification)),
  //   }
  // );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h2>Something went wrong...</h2>;
  }

  let unReadNotification;
  let booksunReadNotificatons;

  if (data) {
    unReadNotification = data?.data?.notification?.filter(
      (status) => status.notificationStatus === false
    )?.length;
  }

  if (booksNotifications?.data) {
    unReadNotification = booksNotifications.data?.data?.notification?.filter(
      (status) => status.notificationStatus === false
    )?.length;
  }

  const handleDropDown = () => {
    setShowDrop(!showDrop);
  };

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
    const newData = [];
    setNotification(!notification);
    setColour("bg-none");

    const existingNotificationIds = noti.flat().map((item) => item);

    existingNotificationIds.map((data) => {
      if (data?.notificationStatus === false && data?.sendAll === true) {
        newData.push({
          id: data?.book?._id,
          message: data?.messageNotification,
          user_id: data?.user?._id ? data?.user?._id : null,
          status: data?.notificationStatus,
          sendAll: true,
          date: data?.date,
        });
      } else {
        if (data?.notificationStatus === false && data?.sendAll === false) {
          newData.push({
            id: data?.book?._id,
            message: data?.messageNotification,
            user_id: data?.user?._id ? data?.user?._id : null,
            sendAll: false,
            status: data?.notificationStatus,
            date: data?.date,
          });
        }
      }
    });

    if (newData.length !== 0) {
      console.log("hey");
      mutation.mutate({ newData });
      booksMutation.mutate({ newData });
    }
  };

  return (
    <nav className="bg-gray-900 shadow-xl py-2 px-7 md:px-10 md:flex items-center justify-around">
      <div className="font-bold text-2xl  cursor-pointer">
        {fullname ? (
          <Link to="/home">
            <h3 className="text-3xl font-bold text-shadow-lg italic animate-pulse text-white">
              bookNest
            </h3>
            {/* <img
              src="/images/librarykct.png"
              className="h-16 w-16 rounded-xl"
              alt=""
            /> */}
          </Link>
        ) : (
          <Link to="/">
            <h3 className="text-3xl font-bold text-shadow-lg italic animate-pulse text-white">
              bookNest
            </h3>
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

                    {id === 5 && noti.flat().length > 0 && (
                      <div onClick={handleNotication}>
                        <span
                          className={`absolute ${
                            unReadNotification === 0 ||
                            booksunReadNotificatons === 0
                              ? "bg-none"
                              : colour
                          } p-1 h-6 w-6 rounded-full bottom-9 right-7 flex items-center justify-center`}
                        >
                          {(unReadNotification === 0
                            ? ""
                            : unReadNotification) ||
                            (booksunReadNotificatons === 0
                              ? ""
                              : booksunReadNotificatons)}
                          {notification && <Notification />}
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

                      {id === 5 && noti.flat().length > 0 && (
                        <div>
                          <span
                            className={`absolute ${
                              unReadNotification === 0 ? "bg-none" : colour
                            } p-1 h-6 w-6 rounded-full bottom-9 right-7 flex items-center justify-center`}
                            onClick={handleNotication}
                          >
                            {unReadNotification === 0 ? "" : unReadNotification}
                            {notification && <Notification />}
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
