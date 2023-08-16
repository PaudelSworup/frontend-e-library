import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { confirmAccount } from "../../API/userAuthApi";
import Modal from "../Modals/Modal";
import { useQuery } from "react-query";
import Loading from "./Loading";

const Confirmation = () => {
  const { token } = useParams();

  const { data, isLoading } = useQuery(
    ["confirmation", token],
    async () => await confirmAccount(token)
  );

  if (data && data.error) {
    return <Modal message={data.error} />;
  }

  if (data && data.message) {
    return <Modal message={data.message} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  // if (data.message) {
  //   return <Modal message={data?.error} />
  // }

  // useEffect(() => {
  //   confirmAccount(token)
  //     .then((res) => {
  //       if (res?.error && res.success === false) {
  //         console.log(res?.error)
  //         setMessage(res?.error)
  //         return toast.error(res?.error,{position:"top-right"})
  //       }

  //       if (res?.message && res.success === true) {
  //         return setMessage(res?.message);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return <></>;
};

export default Confirmation;
