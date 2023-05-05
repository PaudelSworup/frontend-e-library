import { FaFacebook, FaLink, FaTwitter } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";




export const icons = [
  {
    id: 4,
    icon: <AiOutlineHeart title="favourite" className=" text-2xl" />
  },
  {
    id: 1,
    icon: <FaFacebook title="facebook" className="text-white text-2xl" />,
  },

  {
    id: 2,
    icon: <FaTwitter title="twitter" className="text-white text-2xl" />,
  },

  {
    id: 3,
    icon: <FaLink title="copy link" className="text-white text-2xl" />,
  },
];
