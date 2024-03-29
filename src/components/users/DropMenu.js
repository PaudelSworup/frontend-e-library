import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/userSlice";
import { FaCog, FaEnvelope, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DropMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {userid} = useSelector((state)=>state.users)

  const handleLogout = () => {
    localStorage.removeItem(userid)
    sessionStorage.removeItem("notify")
    dispatch(setLogout())
  };

  const handleAccountSettings = () => {
    navigate("/account-settings")
  };

  const handleSavedItems = () => {        
    navigate("/book/saved")
  };

  const handleRequestHistory = () => {
    navigate("/book/requests")
  };

const drop = [
    {
      id: 1,
      idName: "Logout",
      span: "Logout",
      icon: <FaSignOutAlt className="mr-2" />,
      onClick: handleLogout, // Use the defined function handleLogout
    },
    {
      id: 4,
      idName: "settings",
      span: "Account Settings",
      icon: <FaCog className="mr-2" />,
      onClick: handleAccountSettings, // Use the defined function handleAccountSettings
    },
    {
      id: 5,
      idName: "saved",
      span: "Saved Items",
      icon: <FaBookmark className="mr-2" />,
      onClick: handleSavedItems, // Use the defined function handleSavedItems
    },
    {
      id: 6,
      idName: "request",
      span: "Request History",
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
