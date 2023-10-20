import React from "react";
import { useSelector } from "react-redux";
import { formatNotificationTime } from "../../reusuableFunctions/calculateTime";
import { overFlow } from "../../reusuableFunctions/overFlow";
import { image } from "../../config";

const Notification = () => {
  const { noti } = useSelector((state) => state.notify);

  return (
    <div className="absolute z-10 top-10 md:right-0 bg-black md:w-96 w-80 h-auto rounded-md shadow-lg py-2">
      <div className="flex flex-col gap-3 m-2 p-2">
        <h2 className="text-white text-xl tracking-wider font-bold">
          Notifications
        </h2>
        <div className="overflow-y-auto max-h-60 scrollbar-hide">
          {noti.flat().map((data) => {
            return (
              <div
                key={data?._id}
                className="text-white lg:h-auto w-full m-3 flex gap-3 max-w-full bg-slate-400 "
              >
                <img
                  src={`${image}/${data?.book?.image}`}
                  alt=""
                  className="md:h-20 object-contain notify-image"
                />

                <p
                  className="flex flex-col justify-center items-start"
                  title={data?.messageNotification}
                >
                  {overFlow(data?.messageNotification, 55)}

                  <span>{formatNotificationTime(data?.date)}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notification;
