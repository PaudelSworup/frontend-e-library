import React from "react";
import { useNavigate } from "react-router-dom";

const Row = ({title}) => {
    const navigate = useNavigate()
  return (
    <div className="flex px-3 py-2 justify-between">
      <h3 className="text-white text-2xl font-serif">{title}</h3>

      {title == "Our Collections" && <p
        className="text-gray-500 text-xl transition-all duration-100 cursor-pointer capitalize hover:text-white"
        onClick={() => navigate("/collection")}
      >
        show all
      </p>}
    </div>
  );
};

export default Row;
