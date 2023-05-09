import React, { useState } from "react";
import { login } from "../API/userAuthApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch  } from "react-redux";
import { setLogin } from "../store/userSlice";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import NavBars from "./NavBars";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).then((data) => {
      console.log(data.success);
      if (data.success === false) {
        return toast(data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        dispatch(setLogin({
            token: data.token,
            userid:data.user._id,
            fullname:data.user.fullname,
            role:data.user.role,
            email:data.user.email,
            categories:data.user.choosedCatgoeirs,
            address:data.user.address,
            mobilenum:data.user.mobilenum
        }))
        navigate("/home")
      }
    });
  };

  return (
    <>
    <NavBars />
    <div className="flex flex-col gap-6  items-center justify-center h-screen">
    <div className="flex flex-col gap-2 justify-center">
    <h2 className="text-white tracking-widest text-center font-serif text-2xl">KCT Login Portal</h2>
    <p className="text-white tracking-widest capitalize">Where you enrich your knowledge</p>
    </div>
      
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
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6 relative">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute right-0 top-[73%] transform -translate-y-1/2 mr-2 text-gray-500 focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <p className="text-blue-500 mt-4 cursor-pointer">Forgot Password?</p>
      </form>
    </div>
    </>
    
  );
};

export default Login;
