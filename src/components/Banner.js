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
      <div className="relative">
        <img
          src="https://images2.alphacoders.com/261/26102.jpg"
          alt="Library"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-widest font-bold text-white mb-6">
          E-Library Management System
        </h1>
          <div className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-widest">
            <p>Unlock the World of Knowledge!</p>
            <p>Efficiency meets Exploration.</p>
            <p>Connecting Readers, Empowering Minds.</p>
            {/* Add more slogans here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
