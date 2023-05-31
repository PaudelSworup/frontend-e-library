import { toast } from "react-toastify";
import { upload } from "../API/userAuthApi";

export const uploadProfile = (userid, onChangeCallback) => {
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userid", userid);
    console.log(image);

    upload(formData).then((data) => {
      if (data.error) {
        return toast(data.error, { position: "top-center", autoClose: 3000 });
      } else {
        return toast(data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    });
  };

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", (event) => {
    handleImageUpload(event);
    onChangeCallback(event);
  });
  fileInput.click();
};
