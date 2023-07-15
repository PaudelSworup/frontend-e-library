import React, { useState } from "react";
import { drop } from "./Menus";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";

const Saved2 = ({uploadProfile,profileData,fullname,email}) => {
  const [bg, setback] = useState(null);
  const navigate = useNavigate();
  const setBg = (data, link) => {
    setback(data);
    navigate(link);
  };
  return (
    <div className="p-2 user_detail_container">
      <ProfileSection uploadProfile={uploadProfile} profileData={profileData} fullname={fullname} email={email} />
      <div className="flex gap-2 lg:flex-col mt-2 items_data  ">
        {drop?.map((data) => (
          <span
            key={data.id}
            className={`text-white cursor-pointer rounded-md  p-2 hover:bg-[#222] transition-all duration-100  ${
              bg === data.id ? "bg-[#222]" : ""
            }`}
            onClick={() => setBg(data.id, data?.link)}
          >
            <span className="flex items-center">
              {data?.icon} {data.span}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Saved2;
