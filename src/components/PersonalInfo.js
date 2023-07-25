import React, { useState } from "react";
import LabelComp from "./LabelComp";
import { useSelector } from "react-redux";
import { updateDetails } from "../API/userAuthApi";
import { toast } from "react-toastify";

const PersonalInfo = ({ name, email, phone, address, onChanges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { userid } = useSelector((state) => state.users);

  const handleEditClick = () => {
    console.log("hello");
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    updateDetails({ name, email, phone, address }, userid).then((res) => {
      if (res?.error && res?.success === false) {
        toast.error(res?.error, { position: "top-right" });
      } else{
        toast.success(res?.message,{position:"top-center"})
      }
    });
  };
  return (
    <div className="ml-3">
      <div className="flex justify-between flex-wrap">
        <h3 className="text-white text-lg font-bold tracking-wider">
          Personal Information
        </h3>

        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="mt-2 px-4 py-2 tracking-wide text-white rounded bg-green-500 hover:bg-green-600 focus:outline-none"
          >
            Save details
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="mt-2 px-4 py-2 tracking-wide text-white rounded bg-blue-500 hover:bg-blue-700 focus:outline-none"
          >
            Edit details
          </button>
        )}
      </div>

      <div className="flex gap-5 flex-wrap text-white tracking-widest">
        <div>
          <LabelComp labelForhtml="Name:" />
          <input
            id="name"
            className="w-full px-3 py-2 border-none rounded bg-[#555] focus:outline-none focus:border-blue-500"
            type="text"
            value={name}
            disabled={!isEditing}
            onChange={(e) => onChanges("name", e.target.value)}
          />
        </div>
        <div>
          <LabelComp labelForhtml="Email:" />
          <input
            id="email"
            className="w-full px-3 py-2 border-none bg-[#555] rounded focus:outline-none focus:border-blue-500"
            type="email"
            value={email}
            disabled={!isEditing}
            onChange={(e) => onChanges("email", e.target.value)}
          />
        </div>
        <div>
          <LabelComp labelForhtml="Phone:" />
          <input
            id="phone"
            className="w-full px-3 py-2 border-none bg-[#555] rounded focus:outline-none focus:border-blue-500"
            type="tel"
            value={phone}
            disabled={!isEditing}
            onChange={(e) => onChanges("phone", e.target.value)}
          />
        </div>
        <div>
          <LabelComp labelForhtml="Address:" />
          <input
            id="address"
            className="w-full px-3 py-2 border-none bg-[#555] rounded focus:outline-none focus:border-blue-500"
            type="text"
            value={address}
            disabled={!isEditing}
            onChange={(e) => onChanges("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
