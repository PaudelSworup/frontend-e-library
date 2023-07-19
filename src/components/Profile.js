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
  const [genre, setGenre] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [name, setName] = useState("");
  const [emailadd, setEmailadd] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getProfile().then((user) => {
      setPersonalInfo(user);
      user?.data?.profile.find((data) => {
        if (data?.userId?._id === userid) {
          setName(data?.userId?.fullname);
          setEmailadd(data?.userId?.email);
          setPhone(data?.userId?.mobilenum);
          setProfile(data?.profileImage);
          return setGenre(data?.userId?.choosedCatgoeirs);
        }
        return setProfile(undefined);
      });
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
          <HeadingContent
            title="Account Settings"
            text="Here, you can see and manage your info and activities."
          />
          <div className="ml-3">
            <h3 className="text-white text-lg font-bold tracking-wider">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 m-3">
              {personalInfo?.data?.profile.map((data) => {
                return (
                  <div key={data?._id}>
                    <input
                    disabled
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                     <input
                     disabled
                    value={email}
                    onChange={(e) => setEmailadd(e.target.value)}
                  />

                    <input
                    disabled
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ml-2">
            <h3 className="text-white text-lg font-bold tracking-wider">
              Favourite Genre(s)
            </h3>
            <div className="text-white flex gap-3">
              {genre?.map((genre, i) => {
                return (
                  <p
                    key={i}
                    className="bg-slate-600 px-5 mt-3 cursor-pointer p-2 text-lg tracking-widest uppercase font-semibold rounded-3xl"
                  >
                    {genre}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
