import React, { useEffect, useState } from "react";
import NavBars from "./NavBars";
import { useSelector } from "react-redux";
import ThumbNail from "./ThumbNail";
import items from "./NavItem";
import { drop } from "./Menus";
import { upload } from "../API/userAuthApi";
import { toast } from "react-toastify";

const SavedItems = () => {
  const { userid, fullname, email } = useSelector((state) => state.users);
  const [Isbn, setIsbn] = useState();
  const [bg, setback] = useState(null);

  useEffect(() => {
    const matchingValues = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(userid)) {
        matchingValues.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setIsbn(matchingValues);
  }, [userid]);

  const setBg = (data) => {
    setback(data);
  };

  const uploadProfile = () => {
    const handleImageUpload = (event) => {
      const image = event.target.files[0]; // Replace with the actual user ID
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userid", userid);

      upload(formData).then((data) => {
        if (data.error) {
          return toast(data.error, { position: "top-center", autoClose: 3000 });
        }else{
          return toast(data.message, { position: "top-center", autoClose: 3000 });
        }
      });
    };

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", handleImageUpload);
    fileInput.click();
  };

  return (
    <>
      <NavBars />
      <div className="lg:mx-40 flex gap-9 main_container ">
        <div className="p-2 user_detail_container">
          <div className="user_detail ">
            <div className="text-white border w-20 h-20 flex justify-center items-center rounded-full transition-all duration-150 cursor-pointer hover:opacity-100 lg:w-44 lg:h-44 ">
              <span
                className="text-center opacity-0 hover:opacity-100 "
                onClick={uploadProfile}
              >
                Uplaod
                <br />
                Image
              </span>
            </div>

            <div className="text-white flex flex-col ">
              <span>{fullname}</span>
              <span>{email}</span>
            </div>
          </div>

          <div className="flex gap-2 lg:flex-col mt-2 items_data  ">
            {drop?.map((data) => (
              <span
                key={data.id}
                className={`text-white cursor-pointer rounded-md  p-2 hover:bg-[#222] transition-all duration-100  ${
                  bg === data.id ? "bg-[#222]" : ""
                }`}
                onClick={() => setBg(data.id)}
              >
                {data.span}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col  ">
          <div className="p-2 saved_items">
            <h2 className="text-white">Saved Items</h2>
            <p className="text-[#9E9E9E]">
              Saved Books. Save books to keep track of the books you want to
              Request later. To unsave, just click on the bookmark icon again.
            </p>
          </div>

          <div className="px-5  sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center bg-[#131313]">
            {Isbn?.map((data) => (
              <ThumbNail key={data._id} result={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedItems;
