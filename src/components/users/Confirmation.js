import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { confirmAccount } from "../../API/userAuthApi";
import Modal from "../Modals/Modal";

// import { Modal } from "../reusuableFunctions/Modal";

const Confirmation = () => {
  const { token } = useParams();
  let [message, setMessage] = useState("");

  useEffect(() => {
    confirmAccount(token)
      .then((res) => {
        if (res?.error && res.success === false) {
          return toast.error(res?.error,{position:"top-right"})
        }

        if (res?.message && res.success === true) {
          return setMessage(res?.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {message != null && <Modal message={message} />}

      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </>
  );
};

export default Confirmation;
