import React, { useEffect } from "react";
import NavBars from "./NavBars";
import Banner from "./Banner";
import Featured from "./Featured";
import Books from "./Books";
import Generes from "./Generes";
import { getNotified } from "../API/bookAPI";
import {  setNotify } from "../store/notifySlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const {userid} = useSelector((state)=>state.users)
  const dispatch = useDispatch();
  useEffect(() => {
    getNotified(userid).then((res) => {
      console.log(res?.data)
      console.log(res?.data?.notification.message);
      if (res?.data.success) {
        dispatch(
          setNotify({
            data:res?.data?.notification
          })
        );
      }
    });
  }, [dispatch, userid]);
  return (
    <>
      <NavBars />
      <Banner />
      <Generes />
      <Featured />
      <Books />
    </>
  );
};

export default Home;
