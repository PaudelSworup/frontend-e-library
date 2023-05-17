import { FaCog, FaEnvelope, FaHeart, FaSignOutAlt } from "react-icons/fa";

export const drop = [
    {
      id: 1,
      idName: "Logout",
      span: "Logout",
      link: "",
      icon: <FaSignOutAlt className="mr-2" />,
    //   onClick: handleLogout, // Use the defined function handleLogout
    },
    {
      id: 4,
      idName: "settings",
      span: "Account Settings",
      link: "",
      icon: <FaCog className="mr-2" />,
    //   onClick: handleAccountSettings, // Use the defined function handleAccountSettings
    },
    {
      id: 5,
      idName: "saved",
      span: "Saved Items",
      link: "/book/saved",
      icon: <FaHeart className="mr-2" />,
    //   onClick: handleSavedItems, // Use the defined function handleSavedItems
    },
    {
      id: 6,
      idName: "request",
      span: "Request History",
      link: "",
      icon: <FaEnvelope className="mr-2" />,
    //   onClick: handleRequestHistory, // Use the defined function handleRequestHistory
    },
  ];