import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { useSelector } from "react-redux";
import { getProfile } from "../../API/userAuthApi";
import Saved from "./Saved";
import Saved2 from "./Saved2";
import { uploadProfile } from "../../reusuableFunctions/uploaPic";
import { useQuery } from "react-query";
import { getBookmarks } from "../../API/bookAPI";


const SavedItems = () => {
  const { userid, fullname, email } = useSelector((state) => state.users);
  const [Isbn, setIsbn] = useState();
  
  const [profile, setProfile] = useState();

  const savedItems = useQuery(["bookmark"],async()=>await getBookmarks(),{
    onSuccess:(data)=>{
      // console.log(data)
      const specificUserBookmark = data?.data?.books.filter((data)=>data?.userId === userid)
      const mappedData = specificUserBookmark.map((data)=>data?.book)
      setIsbn(mappedData)
     
      
    }
  })

 

  useEffect(() => {
    getProfile().then((user) => {
      user?.data?.profile.find((data)=>{
        if(data?.userId?._id === userid){
          return setProfile(data?.profileImage);
        }
        return setProfile(undefined)
       })
    });
  }, [userid]);

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
