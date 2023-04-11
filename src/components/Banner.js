import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  // const [widthCount, setWidthCount] = useState(window.screen.width);

  // const actualWidth = () => {
  //   setWidthCount(window.innerWidth);
  // };
  // useEffect(() => {
  //   window.addEventListener("resize", actualWidth);
  //   return () => {
  //     window.removeEventListener("resize", actualWidth);
  //   };
  // }, []);

  return (
       <div className=" m-1 rounded-md flex justify-between backdrop-brightness-100 px-[30px] bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80')] h-[480px] bg-cover bg-center bg-opacity-20 object-contain">
      <div className="py-[150px] text-xl font-serif tracking-widest text-white">
        <p>An educated mind is better than an empty one</p> 
      </div>
    </div>
   
  );
};

export default Banner;
