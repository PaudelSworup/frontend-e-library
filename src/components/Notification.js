import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { data } = useSelector((state) => state.notify);

  return (
    <div className="absolute z-10 top-10 md:right-0 bg-black md:w-96 w-80 h-auto rounded-md shadow-lg py-2">
      <div className="flex flex-col gap-3 m-2 p-2">
        <h2 className="text-white text-xl tracking-wider font-bold">
          Notifications
        </h2>

        {data?.map((notify) => {
          console.log(notify);
          return (
            <div
              key={notify?.data?.Date}
              className="text-white h-auto w-full flex gap-3 max-w-full bg-slate-400 "
            >
              <img
                src={`http://localhost:8000/${notify?.data?.books_id?.image}`}
                alt=""
                className="md:h-20 object-contain"
              />

              <p className="flex justify-center items-center">
                {notify?.data?.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
