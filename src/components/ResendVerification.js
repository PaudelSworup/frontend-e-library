import React, { useState } from "react";
import NavBars from "./NavBars";
import LabelComp from "./LabelComp";
import { ToastContainer } from "react-toastify";

const ResendVerification = () => {
    const[email, setEmail] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()

    }
  return (
    <>
      <NavBars />
      <div className="flex items-center justify-center m-8">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <LabelComp labelForhtml="email" />
            <input
              className="shadow appearance-none border rounded w-full py-[14px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              size={35}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
              type="submit"
            >
              Send
            </button>{" "}
            <ToastContainer position="top-center" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ResendVerification;
