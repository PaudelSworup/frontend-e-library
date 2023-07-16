import React, { useState } from "react";
import ReqestThumbNail from "./ReqestThumbNail";
import RequestHistoryItems from "./RequestHistoryItems";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const RequestHistory = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <div className="p-2 saved_items flex justify-between">
          <div className={`${open && "hidden"}`}>
            <h2 className="text-white">Request History</h2>
            <p className="text-[#9E9E9E]">Track your History status</p>
          </div>

          <div
            className={`${!open && "hidden"} flex gap-1 cursor-pointer`}
            onClick={() => setOpen(!open)}
          >
            <FaArrowAltCircleLeft className="text-white text-xl mt-1" />
            <p className="text-white text-lg">Back</p>
          </div>
          {data.length > 0 && (
            <div>
              <p
                className={`text-white cursor-pointer ${open && "hidden"}`}
                onClick={() => setOpen(!open)}
              >
                Show All
              </p>
            </div>
          )}
        </div>

        <div className=" px-5 sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
          {data?.map((data) => (
            <div key={data?._id} className={`${open && "hidden"}`}>
              <ReqestThumbNail result={data} />
            </div>
          ))}
        </div>
        <div className={`${!open && "hidden"}`}>
          {data.map((data) => (
            <RequestHistoryItems key={data?._id} result={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RequestHistory;
