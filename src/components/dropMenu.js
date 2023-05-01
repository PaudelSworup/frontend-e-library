import { FaCog, FaSignOutAlt } from "react-icons/fa";

const handleLogoutClick = () => {
  console.log("hello");
};

const handleAccount = () => {
  console.log("account settings");
};

export const drop = [
  {
    id: 1,
    idName: "Logout",
    span: "Logout",
    link: "",
    icon: <FaSignOutAlt className="mr-2" />,
    click: handleLogoutClick,
  },

  {
    id: 4,
    idName: "settings",
    span: "Account Settings",
    link: "",
    icon: <FaCog className="mr-2" />,
    click: handleAccount,
  },


  
];
