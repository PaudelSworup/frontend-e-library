import React, { useState } from "react";
import NavBars from "./NavBars";
import { forgotPassword } from "../API/userAuthApi";
import { ToastContainer, toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email }).then((res) => {
      console.log(res);
      if (res?.error) {
        toast.error(res.error, {
          position: "top-center",
        });
      } else {
        return toast.success(res?.message, { position: "top-center" });
      }
    });
  };
  return (
    <>
      <NavBars />
      <div className="flex flex-col gap-6  items-center justify-center h-screen">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default Forgot;
