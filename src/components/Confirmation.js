import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { confirmAccount } from "../API/userAuthApi";

const Confirmation = () => {
  const { token } = useParams();
  let [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    confirmAccount(token)
      .then((res) => {
        if (res?.error) {
          return toast.error(res?.error,{position:"top-center"})
        } else return toast.success(res?.message,{position:"top-center"})
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <NavBars />
    
      
    
      
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </>
  );
};

export default Confirmation;
