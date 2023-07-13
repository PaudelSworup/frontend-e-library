import { FaFacebook, FaLink, FaTwitter } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

const copyUrl = ()=>{
  const url = window.location.href
  navigator.clipboard.writeText(url).then(()=>{
    return toast.success("Link Copied!!")
  }).catch((err)=>console.log(err))
}


export const icons = [
  {
    id: 4,
    icon: <AiOutlineHeart title="favourite" className=" text-2xl" />,
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
    onclick:copyUrl,
    
  },
];
