import { BiLogOut, BiUser } from "react-icons/bi";
import { MdNotificationsActive, MdOutlineAddCircleOutline} from "react-icons/md";
import { FcServices } from "react-icons/fc";

const items = [
 
  {
    title: "User Services",
    icon:<FcServices/>,
    submenu: true,
    subMenuItems: 
    [
        { title: "Add Request" , icon:<MdOutlineAddCircleOutline/>},
        { title: "Notification" , icon:<MdNotificationsActive/>}, 
    ],
  },
  {title:"User" , icon:<BiUser/>},
  {title:"Logout", Logoutspacing:true , icon:<BiLogOut/>}
];



export default items;
