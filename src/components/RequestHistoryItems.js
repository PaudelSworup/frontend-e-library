import React, { useState } from "react";
import { FaArrowDown, FaDownload } from "react-icons/fa";
import { image } from "../config";
import { downloadBook } from "../API/bookAPI";

const RequestHistoryItems = ({ result }) => {
  const [open, setOpen] = useState(false);
  const date = new Date(result?.issueDate);
  const approvedDate = new Date(result?.approvedDate);
  const monthName = date.toLocaleString("default", { month: "long" });
  const monthName2 = approvedDate.toLocaleString("default", { month: "long" });

  const download = (bookid)=>{
    downloadBook(bookid)
  }
  return (
    <div className="flex flex-col m-2">
      <div className="bg-[#252525] flex flex-wrap justify-between rounded-lg text-white p-3">
        <div className="flex flex-col">
          <p className="font-bold text-lg">Book name</p>
          <p className="tracking-widest">{result?.books_id?.title}</p>
        </div>

        <div className="flex ml-6 flex-col">
          <p className="font-bold text-lg">Requested on</p>
          <p className="tracking-widest">{`${monthName} ${date
            .getDate()
            .toString()} , ${date.getFullYear().toString()}`}</p>
        </div>

        {result?.issueStatus === 1 && (
          <div className="flex ml-6 flex-col">
            <p className=" font-bold text-lg">Approved On</p>
            <p className="">{`${monthName2} ${approvedDate
              .getDate()
              .toString()} , ${approvedDate.getFullYear().toString()}`}</p>
          </div>
        )}

        <div className="flex ml-6 flex-col">
          <p className="font-bold text-lg">Status</p>
          <p className="tracking-widest">
            {" "}
            {result?.issueStatus === 1
              ? "Approved ✅"
              : result?.issueStatus === 0
              ? "pending 🟤"
              : "Rejected ❎"}
          </p>
        </div>

        <div
          className="flex ml-6 items-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <p>{!open ? "Show Request" : "Hide Request"}</p>
          <p>
            <FaArrowDown
              className={`text-white text-lg ${!open && "rotate-180"}`}
            />
          </p>
        </div>
      </div>

      <div
        className={`${
          !open ? "hidden" : "flex flex-col"
        } text-white border border-gray-600 p-4`}
      >
        <div className="flex p-3 gap-2">
          <div>
            <h3 className="text-white text-lg font-bold">Requested Book</h3>
            <img
              src={`${image}/${result?.books_id?.image}`}
              className="w-36 object-cover"
              alt=""
            />
          </div>
          <p className="tracking-widest flex justify-center items-center">
            {result?.books_id?.title}
          </p>
        </div>
        <div className="text-gray-700 border-b border-dashed p-2"></div>
        <div className="flex justify-between">
          <div className="flex ml-6 flex-col">
            <p className="font-bold text-lg">Book Requested on</p>
            <p className="tracking-widest">{`${date
              .getDate()
              .toString()}  ${monthName}  ${date
              .getFullYear()
              .toString()}, ${date.toLocaleTimeString()}`}</p>
          </div>
          {result?.issueStatus === 1 && (
            <div className="flex ml-6 flex-col">
              <p className="font-bold text-lg">Approved on</p>

              <p className="tracking-widest">{`${approvedDate
                .getDate()
                .toString()}  ${monthName2}  ${approvedDate
                .getFullYear()
                .toString()}, ${approvedDate.toLocaleTimeString()}`}</p>
            </div>
          )}
          {result?.issueStatus === 1 && <FaDownload onClick={()=>download(result?.books_id?._id)} className="font-bold text-3xl mt-4" />
 }
        </div>
      </div>
    </div>
  );
};

export default RequestHistoryItems;
