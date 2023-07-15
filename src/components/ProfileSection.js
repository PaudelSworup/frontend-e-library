import React from "react";
import { FaUser } from "react-icons/fa";

const ProfileSection = ({ uploadProfile , profileData , fullname , email }) => {
  return (
    <div className="user_detail ">
      <div className="text-white border w-20 h-20 flex justify-center items-center rounded-full transition-all duration-150 cursor-pointer hover:opacity-100 lg:w-44 lg:h-44 ">
        <span className="text-center" onClick={uploadProfile}>
          {profileData.length > 0 ? (
            profileData?.map((data) => {
              return (
                <img
                  key={data?._id}
                  src={`http://localhost:8000/${data?.profileImage}`}
                  alt=""
                  className="rounded-full object-cover lg:w-[165px] lg:h-[165px]"
                />
              );
            })
          ) : (
            <span>
              <FaUser className="text-white text-[35px] lg:text-[80px] " />
            </span>
          )}
        </span>
      </div>

      <div className="text-white flex flex-col ">
        <span>{fullname}</span>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default ProfileSection;
