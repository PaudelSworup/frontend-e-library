import React, { useState } from "react";
import { FaChevronCircleDown, FaPlusCircle } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-insert"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setOpen(!open)}
          >
            <span className="text-white">Books/Category</span>
            <FaChevronCircleDown
              className={`text-lg ${open ? "transform rotate-180" : ""}`}
            />
          </button>
        </div>
        {open && (
          <div
            className="absolute cursor-pointer right-[-6] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1  "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <span
                onClick={() => navigate("/addb")}
                className="text-gray-700 flex justify-start gap-3 items-center px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-0"
              >
                <FaPlusCircle /> Add Books
              </span>
              <span
                onClick={() => navigate("/addcategory")}
                className="text-gray-700 flex justify-start gap-3 items-center px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-1"
              >
              <BiCategory/> Add Category
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
