import React,{useState} from 'react'
import { FaUser } from 'react-icons/fa';
import { drop } from './Menus';

const Saved2 = (props) => {
    const [bg, setback] = useState(null);
    const setBg = (data) => {
        setback(data);
      };
  return (
    <div className="p-2 user_detail_container">
          <div className="user_detail ">
            <div className="text-white border w-20 h-20 flex justify-center items-center rounded-full transition-all duration-150 cursor-pointer hover:opacity-100 lg:w-44 lg:h-44 ">
              <span className="text-center" onClick={props.uploadProfile}>
                {props.profileData.length > 0 ? (
                  props.profileData?.map((data) => {
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
              <span>{props.fullname}</span>
              <span>{props.email}</span>
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
        
  )
}

export default Saved2