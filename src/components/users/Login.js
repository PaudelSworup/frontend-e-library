import React, { useState } from "react";
import { checkOTP, login } from "../../API/userAuthApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../store/userSlice";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import NavBars from "./NavBars";
import LabelComp from "./LabelComp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOTP] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  let width = window.screen.width;
  let height = window.screen.height;

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    login({ email, password, width, height }).then((data) => {
      setIsLoading(false);
      console.log(data);
      if (data.error) {
        return toast.error(data.error, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      } else if (data?.newDevice) {
        setShowOtpModal(true);
      } else {
        dispatch(
          setLogin({
            token: data.token,
            userid: data.user._id,
            fullname: data.user.fullname,
            role: data.user.role,
            email: data.user.email,
            categories: data.user.choosedCatgoeirs,
            address: data.user.address,
            mobilenum: data.user.mobilenum,
          })
        );
        if (data.user.role === 0) {
          navigate("/home");
        } else {
          navigate("/admin");
        }
      }
    });
  };

  const validateOTPS = async() => {
    const otpValidationData = await checkOTP({ otp, width, height,email });
    console.log(otpValidationData)

    if (otpValidationData.success === true) {
      setShowOtpModal(false);
      login({ email, password, width, height }).then((data) => {
        setIsLoading(false);
        console.log(data);
        if (data.error) {
          return toast.error(data.error, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          });
        } else if (data?.newDevice) {
          setShowOtpModal(true);
        } else {
          dispatch(
            setLogin({
              token: data.token,
              userid: data.user._id,
              fullname: data.user.fullname,
              role: data.user.role,
              email: data.user.email,
              categories: data.user.choosedCatgoeirs,
              address: data.user.address,
              mobilenum: data.user.mobilenum,
            })
          );
          if (data.user.role === 0) {
            navigate("/home");
          } else {
            navigate("/admin");
          }
        }
      });
    }else{
      if(otpValidationData?.success === false){
        return toast.error(otpValidationData.error)
      }
      
    }
  };

  return (
    <>
      <NavBars />
      <div className="flex flex-col gap-6  items-center justify-center m-5">
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="text-white tracking-widest text-center font-serif text-2xl">
            KCT Login Portal
          </h2>
          <p className="text-white tracking-widest capitalize">
            Where you enrich your knowledge
          </p>
        </div>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <div className="mb-6 relative">
            <LabelComp labelForhtml="password" />
            <input
              className="shadow appearance-none border rounded w-full py-[14px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              size={35}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center">
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <RiEyeOffFill className="text-gray-600" />
                ) : (
                  <RiEyeFill className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className=" flex items-center justify-between">
            {isLoading ? (
              <button
                disabled
                className="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
                type="submit"
              >
                <span className="animate-pulse">Signing in...</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700"
                type="submit"
              >
                Sign In
              </button>
            )}

            <ToastContainer position="top-center" />
          </div>
          <div className="flex flex-col items-start ml-2">
            <p className="text-blue-500 text-center mt-4 cursor-pointer">
              <Link to="/forgot">Forgot Password?</Link>
            </p>
            <p className="text-blue-500 text-center capitalize mt-4 cursor-pointer">
              <Link to="/resendverification">email not verified?</Link>
            </p>
          </div>

          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="grid place-items-center">
            <button className=" h-12 px-6 capitalize text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-800">
              <Link to="/register">create new account</Link>
            </button>
          </div>
        </form>
      </div>

      {showOtpModal && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* <MdPassword className="text-2xl text-green-700" /> */}
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          New Device detected
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 tracking-wide">
                            Enter your OTP to verified its you
                          </p>
                          <div className="mb-4">
                            <LabelComp labelForhtml="email" />
                            <input
                              className="shadow appearance-none border rounded w-full py-[14px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              size={35}
                              type="email"
                              placeholder="Enter your email"
                              value={otp}
                              onChange={(e) => setOTP(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={validateOTPS}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      Validate
                    </button>
                    <Link to="/">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="top-center" />
        </>
      )}
    </>
  );
};

export default Login;
