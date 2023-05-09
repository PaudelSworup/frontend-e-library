import { FaCog, FaEnvelope, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/userSlice";
import { Navigate } from "react-router-dom";



// const handleLogoutClick = () => {
//   const dispatch = useDispatch()
//   console.log("hello");
//   dispatch(setLogout())
//   return <Navigate to="/" />
// };

// const handleAccount = () => {
//   console.log("account settings");
// };


// const savedItems = () => {
//   console.log("saved items");
// };

export const drop = [
  {
    id: 1,
    idName: "Logout",
    span: "Logout",
    link: "",
    icon: <FaSignOutAlt className="mr-2" />,
  },

  {
    id: 4,
    idName: "settings",
    span: "Account Settings",
    link: "",
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
