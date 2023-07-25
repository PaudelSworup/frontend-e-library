import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import { uploadProfile } from "../reusuableFunctions/uploaPic";
import { useSelector } from "react-redux";
import { getProfile, getUser } from "../API/userAuthApi";
import NavBars from "./NavBars";
import HeadingContent from "./HeadingContent";
import PersonalInfo from "./PersonalInfo";
import FavouriteGenres from "./FavouriteGenres";

const Profile = () => {
  const { userid, fullname, email } = useSelector((state) => state.users);
  const [profile, setProfile] = useState();
  const [genre, setGenre] = useState([]);
  const [name, setName] = useState("");
  const [emailadd, setEmailadd] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    Promise.all([getProfile(), getUser()]).then(([user, data]) => {
      user?.data?.profile?.find((data) => {
        if (data?.userId?._id === userid) {
          return setProfile(data?.profileImage);
        }
        return setProfile(undefined);
      });

      data?.data?.user?.find((data) => {
        if (data?._id === userid) {
          setGenre(data?.choosedCatgoeirs);
          setName(data?.fullname);
          setEmailadd(data?.email);
          setPhone(data?.mobilenum);
          setAddress(data?.address);
        }
      });
    });
  }, [getUser]);

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

  const handleInputChange = (inputName, value) => {
    // Update the state based on the input field name
    switch (inputName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmailadd(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
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
          <HeadingContent
            title="Account Settings"
            text="Here, you can see and manage your info and activities."
          />

          <PersonalInfo
            name={name}
            email={emailadd}
            phone={phone}
            address={address}
            onChanges={handleInputChange}
          />

          <FavouriteGenres genre={genre} />
        </div>
      </div>
    </>
  );
};

export default Profile;
