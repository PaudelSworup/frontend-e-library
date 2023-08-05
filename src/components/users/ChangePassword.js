import React, { useState } from "react";
import LabelComp from "./LabelComp";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "../../API/userAuthApi";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [new_password, setNew_password] = useState("");
  const [repeat_password, setRepeat_password] = useState("");
  const { userid } = useSelector((state) => state.users);

  const change = ()=>{
    changePassword({password,new_password,repeat_password}, userid).then((res)=>{
        if(res?.error && res.success === false){
           return toast.error(res?.error,{position:"top-right"})
        }else{
            setPassword("")
            setNew_password("")
            setRepeat_password("")
            return toast.success(res?.message , {position:"top-center"})
        }
    })
  }
  return (
    <>
      <div className="flexflex-wrap">
        <h3 className="text-white text-xl font-serif font-bold tracking-widest">
          Change your Password
        </h3>
      </div>
      <div>
        <LabelComp labelForhtml="current password:" />
        <input
          id="password"
          className="w-full px-3 py-2 border-none rounded bg-white focus:outline-none focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <LabelComp labelForhtml="new password:" />
        <input
          id="password1"
          className="w-full px-3 py-2 border-none rounded bg-white focus:outline-none focus:border-blue-500"
          type="password"
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
        />
      </div>
      <div>
        <LabelComp labelForhtml="repeat password:" />
        <input
          id="password2"
          className="w-full px-3 py-2 border-none rounded bg-white focus:outline-none focus:border-blue-500"
          type="password"
          value={repeat_password}
          onChange={(e) => setRepeat_password(e.target.value)}
        />
      </div>

      <div>
        <button onClick={()=>change()} className="mt-2 px-4 py-2 tracking-wide text-white rounded bg-blue-500 hover:bg-blue-600 focus:outline-none">
          <span className="flex items-center gap-3">
            Update password
            <FaSave />
          </span>
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
