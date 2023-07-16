import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import { uploadProfile } from "../reusuableFunctions/uploaPic";
import { useSelector } from "react-redux";
import { getProfile } from "../API/userAuthApi";
import NavBars from "./NavBars";
import HeadingContent from "./HeadingContent";

const Profile = () => {
  const { userid, fullname, email } = useSelector((state) => state.users);
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile().then((user) => {
     user?.data?.profile.find((data)=>{
      if(data?.userId?._id === userid){
        return setProfile(data?.profileImage);
      }
      return setProfile(undefined)
     })
      
    });
  }, []);
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
        <div className="p-2 user_detail_container">
          <ProfileSection
            uploadProfile={handleUploadProfile}
            profileData={profile}
            fullname={fullname}
            email={email}
          />
        </div>
        <div className="flex flex-col">
          <HeadingContent title="Account Settings" text="Here, you can see and manage your info and activities." />
        </div>
      </div>
    </>
  );
};

export default Profile;
