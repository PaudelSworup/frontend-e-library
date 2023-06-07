import React, { useEffect } from "react";
import NavBars from "./NavBars";
import Banner from "./Banner";
import Featured from "./Featured";
import Books from "./Books";
import Generes from "./Generes";
import { getNotified } from "../API/bookAPI";
import { setNotifiy } from "../store/notifySlice";
import { useDispatch } from "react-redux";


const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    getNotified().then((res)=>{
      console.log(res?.data?.message)
      if(res?.data.success){
        dispatch(setNotifiy({
          message:res?.data?.message
        }))
      }
       
      
    })
  },[])
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
