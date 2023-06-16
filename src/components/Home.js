import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import Banner from "./Banner";
import Featured from "./Featured";
import Books from "./Books";
import Generes from "./Generes";
import { getNotified } from "../API/bookAPI";
import { setNotify } from "../store/notifySlice";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalStatus } from "../API/userAuthApi";

const Home = () => {
  const { userid } = useSelector((state) => state.users);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      // getApprovalStatus(userid).then((res)=>{
      //   console.log(res)
      // })
      try {
        const response = await getNotified(userid);
        console.log(response?.data);
        if (response?.data.success && response?.data.notification.length > 0) {
          console.log("greater")
          const {notification} = response?.data
          dispatch(setNotify({data:notification}))
          // sessionStorage.setItem("notify" , JSON.stringify(notification))
        }

          
        if(response?.data?.notification.length === 0){
          console.log("success")
          sessionStorage.removeItem("notify")
        }
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
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
