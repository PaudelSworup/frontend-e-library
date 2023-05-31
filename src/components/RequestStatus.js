import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { getHistory, getProfile } from "../API/userAuthApi";
import { useSelector } from "react-redux";
import { uploadProfile } from "../reusuableFunctions/uploaPic";
import Saved2 from "./Saved2";
import RequestHistory from "./RequestHistory";

const RequestStatus = () => {
  const [profile, setProfile] = useState([]);
  const { userid, fullname, email } = useSelector((state) => state.users);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getHistory().then((res) => {
      console.log(res?.data?.filterData)
      const filterData = res?.data?.filterData.filter((data) => {
        return data?.user_id?._id === userid;
      });
      setFilter(filterData)

    });
  }, [userid]);
  

  useEffect(() => {
    getProfile().then((user) => {
      setProfile(user?.data?.profile);
    });
  }, []);

  const profileData = profile.filter((data) => data?.userId?._id === userid);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Perform any validations or actions based on the selected file
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // Perform additional actions such as updating component state, displaying preview, etc.
    } else {
      console.log("No file selected");
    }
  };

  const handleUploadProfile = () => {
    uploadProfile(userid, handleFileChange);
  };

  return (
    <>
      <NavBars />
      <div className="lg:mx-40 flex gap-9 main_container ">
        <Saved2
          uploadProfile={handleUploadProfile}
          // handleClick={handleClick}
          profileData={profileData}
          fullname={fullname}
          email={email}
        />
        <RequestHistory data={filter} />
      </div>
    </>
  );
};

export default RequestStatus;
