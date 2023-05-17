import React, { useState, useEffect } from "react";
import Generes from "./Generes";

const Banner = () => {
  const [index, setIndex] = useState(0);

  let img_container = [
    "https://images2.alphacoders.com/261/26102.jpg",
    "https://images.alphacoders.com/154/154103.jpg",
    "https://images.pexels.com/photos/9572477/pexels-photo-9572477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index) => (index + 1) % img_container.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [img_container.length]);

  return (
    <>

<div className="relative md:h-[650px] sm:h[600px] h-[500px]">
      {img_container.map((image, i) => (
        <div
          key={i}
          className={`absolute  inset-0 h-full w-full transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      {/* absolute text-white text-center md:text-3xl sm:text-3xl text-[20px] capitalize tracking-widest sm:absolute md:absolute top-56 right-20 */}
      <div className="absolute  text-[#FFFFF7] tracking-widest text-xl capitalize lg:left-[30%] top-[40%] lg:text-2xl p-2">
      <p>
        <span>Inspiring minds, unlocking potential. Education: the gateway to success.</span>
      </p>
      </div>
      
    </div>

    <Generes />
    </>
    
  );
};

export default Banner;
