import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/userSlice";
import { FaCog, FaEnvelope, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DropMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    // Dispatch your logout action here
    dispatch(setLogout())
  };

  const handleAccountSettings = () => {
    // Dispatch your account settings action here
  };

  const handleSavedItems = () => {        
    navigate("/book/saved")
  };

  const handleRequestHistory = () => {
    // Dispatch your request history action here
  };

const drop = [
    {
      id: 1,
      idName: "Logout",
      span: "Logout",
      link: "",
      icon: <FaSignOutAlt className="mr-2" />,
      onClick: handleLogout, // Use the defined function handleLogout
    },
    {
      id: 4,
      idName: "settings",
      span: "Account Settings",
      link: "",
      icon: <FaCog className="mr-2" />,
      onClick: handleAccountSettings, // Use the defined function handleAccountSettings
    },
    {
      id: 5,
      idName: "saved",
      span: "Saved Items",
      link: "/book/saved",
      icon: <FaHeart className="mr-2" />,
      onClick: handleSavedItems, // Use the defined function handleSavedItems
    },
    {
      id: 6,
      idName: "request",
      span: "Request History",
      link: "",
      icon: <FaEnvelope className="mr-2" />,
      onClick: handleRequestHistory, // Use the defined function handleRequestHistory
    },
  ];

  return (
    <div className="absolute z-10 top-10 right-0 bg-white rounded-md shadow-lg py-2">
      {drop.map((data) => (
        <div
          key={data.id}
          className="px-4 py-2 w-48 cursor-pointer flex items-center"
          onClick={data.onClick}
        >
          <span>{data.icon}</span>
          <span>{data.span}</span>
        </div>
      ))}
    </div>
  );
};

export default DropMenu;
