import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatNotificationTime } from "../reusuableFunctions/calculateTime";
import { overFlow } from "../reusuableFunctions/overFlow";

const Notification = () => {
  const { noti } = useSelector((state) => state.notify);
 

  return (
    <div className="absolute z-10 top-10 md:right-0 bg-black md:w-96 w-80 h-auto rounded-md shadow-lg py-2">
      <div className="flex flex-col gap-3 m-2 p-2">
        <h2 className="text-white text-xl tracking-wider font-bold">
          Notifications
        </h2>

        {noti.map((data) => {
          return data?.data?.map((notify, i) => {
            return (
              <div
                key={i}
                className="text-white lg:h-auto w-full flex gap-3 max-w-full bg-slate-400 "
              >
                <img
                  src={`http://localhost:8000/${notify?.book?.image}`}
                  alt=""
                  className="md:h-20 object-contain notify-image"
                />

                <p
                  className="flex flex-col justify-center items-start"
                  title={notify?.messageNotification}
                
                >
                  {overFlow(notify?.messageNotification, 55)}
                  
                  <span>{formatNotificationTime(notify?.date)}</span>
                </p>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Notification;
