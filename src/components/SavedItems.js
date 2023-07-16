import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { useSelector } from "react-redux";
import { getProfile } from "../API/userAuthApi";
import Saved from "./Saved";
import Saved2 from "./Saved2";
import { uploadProfile } from "../reusuableFunctions/uploaPic";


const SavedItems = () => {
  const { userid, fullname, email } = useSelector((state) => state.users);
  const [Isbn, setIsbn] = useState();
  
  const [profile, setProfile] = useState();

  useEffect(() => {
    const matchingValues = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(userid)) {
        matchingValues.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setIsbn(matchingValues);
  }, [userid]);

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
        <Saved2
          uploadProfile={handleUploadProfile}
          profileData={profile}
          fullname={fullname}
          email={email}
        />
        <Saved data={Isbn} />
      </div>
    </>
  );
};

export default SavedItems;
