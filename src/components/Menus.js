import { FaCog, FaEnvelope, FaHeart, FaSignOutAlt } from "react-icons/fa";

export const drop = [
  {
    id: 4,
    idName: "settings",
    span: "Account Settings",
    link: "/account-settings",
    icon: <FaCog className="mr-2" />,
  },
  {
    id: 5,
    idName: "saved",
    span: "Saved Items",
    link: "/book/saved",
    icon: <FaHeart className="mr-2" />,
  },
  {
    id: 6,
    idName: "request",
    span: "Request History",
    link: "",
    icon: <FaEnvelope className="mr-2" />,
  },
];
