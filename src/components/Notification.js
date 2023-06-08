import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { data } = useSelector((state) => state.notify);
  console.log(data);

  return (
    <div className="flex flex-col gap-3 m-2 p-2">
      <h2 className="text-white text-xl tracking-wider font-bold">
        Notifications
      </h2>

      {data?.map((notify) => {
        console.log(notify);
        return (
          <div
            key={notify?.data?.Date}
            className="text-white h-28 md:h-16 w-full flex gap-3 max-w-full bg-slate-400 "
          >
            <img
              src={`http://localhost:8000/${notify?.data?.books_id?.image}`}
              alt=""
              className="md:h-16 h-full "
            />

            <p className="flex justify-center items-center">
              {notify?.data?.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
