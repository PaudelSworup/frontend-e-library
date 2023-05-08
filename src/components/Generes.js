import React, { useEffect, useState } from "react";
import { getGenre } from "../API/bookAPI";
import { useNavigate } from "react-router-dom";
import {FaCompass , FaPlayCircle , FaHatWizard  , FaSquareRootAlt , FaCode , FaPen, FaPaintBrush} from "react-icons/fa"
import { GiRobotGolem } from 'react-icons/gi';
import { BiDna, BiGlobe } from 'react-icons/bi';


const Generes = () => {

  // define set of icons
  const icons = [FaCompass , GiRobotGolem, FaPlayCircle, FaPaintBrush , FaHatWizard, FaSquareRootAlt, FaCode, FaPen, BiDna,BiGlobe ]

  const [genre, setGenre] = useState([]);
  const navigate = useNavigate()
  useEffect(()=>{
    getGenre().then((res)=>{
        setGenre(res?.data?.category)
    })
  },[])
  
  return (
    <>
    <div className="flex flex-col p-4">
      <h2 className="text-white font-bold text-2xl">Generes</h2>
      <div className="flex xl:justify-center gap-3 py-3 overflow-x-scroll scrollbar-hide">
        {genre.map((data,i) => {
          return (
            <div key={data?._id} onClick={()=>navigate(`/book/genre/${data?.category_name}/${data?._id}`)}>
              <span className=" cursor-pointer tracking-widest truncate text-xl ">
                <div className="flex flex-col justify-center items-center">
                  <div className="border outline-none border-[#313131] z-40 rounded-full p-4    hover:bg-slate-600 transition-all duration-200"> 
                  {React.createElement(icons[i%icons.length], {className:"text-[#F2F1F7] text-2xl "})}
                  </div>
                 
                 <span className="text-white">{data?.category_name}</span> 
                </div> 
               
              </span>
            </div>
          );
        })}
       
      </div>
      <hr className="border border-[#252525]" />
    </div>

    
    </>
    
  );
};

export default Generes;
