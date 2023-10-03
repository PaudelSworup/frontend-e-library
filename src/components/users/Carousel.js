import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000); // Adjust the interval time (in milliseconds) as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % img_container_loop.length);
  };

  let img_container = [
    "https://images2.alphacoders.com/261/26102.jpg",
    "https://images.alphacoders.com/154/154103.jpg",
    "https://images.pexels.com/photos/9572477/pexels-photo-9572477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3847620/pexels-photo-3847620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // Concatenate the array with itself to create a loop
  let img_container_loop = [...img_container, ...img_container];

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div
        className="flex overflow-x-hidden space-x-4"
        style={{
          transform: `translateX(-${currentIndex * 100 / img_container_loop.length}%)`, // Adjust the value as needed
          transition: "transform 1s ease", // Adjust the duration as needed
        }}
      >
        {img_container_loop.map((imageUrl, index) => (
          <div key={index} className="w-80">
            <img src={imageUrl} alt={`Image ${index}`} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
