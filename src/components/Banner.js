import React, { useState, useEffect } from "react";

const Banner = () => {
  const [index, setIndex] = useState(0);

  let img_container = [
    "https://images2.alphacoders.com/261/26102.jpg",
    "https://images.alphacoders.com/154/154103.jpg",
    "https://images.pexels.com/photos/9572477/pexels-photo-9572477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3847620/pexels-photo-3847620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(() =>Math.floor(Math.random() * img_container.length));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [img_container.length]); 

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))",
        }}
      ></div>
      <img
        src={img_container[index]}
        alt="Library"
        className="w-full h-[520px]"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-widest font-bold text-white mb-6">
          E-Library Management System
        </h1>
        <div className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-widest">
          <p>Unlock the World of Knowledge!</p>
          <p>Efficiency meets Exploration.</p>
          <p>Connecting Readers, Empowering Minds.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

