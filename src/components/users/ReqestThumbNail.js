import React from "react";
import { image } from "../../config";
import { MdFileDownload } from "react-icons/md";
import { downloadBook } from "../../API/bookAPI";

const ReqestThumbNail = ({ result }) => {
  const date = new Date(result?.issueDate);
  const approvedDate = new Date(result?.approvedDate);
  const monthName = date.toLocaleString("default", { month: "long" });
  const monthName2 = approvedDate.toLocaleString("default", { month: "long" });

  const download = (bookid) => {
    downloadBook(bookid)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex gap-3 ml-2 mb-2 h-[300px] main_div_width    mx-auto   p-3 rounded-md bg-[#252525]">
      <div className="flex">
        <img
          src={`${image}/${result?.books_id?.image}`}
          className="h-auto req_thumb_image max-w-[150px]"
          alt=""
        />
      </div>

      <div className="flex flex-col flex-wrap  gap-4 text-white">
        <h2>{result?.books_id?.title}</h2>
        <div className="flex mt-3 flex-col gap-">
          <p className="text-xs text-gray-400">Requested On</p>
          <p className="text-sm">{`${monthName} ${date
            .getDate()
            .toString()} , ${date.getFullYear().toString()}`}</p>
        </div>

        {result?.issueStatus === 1 && (
          <div className="flex mt-3 flex-col gap-">
            <p className="text-xs text-gray-400">Book Approved On</p>
            <p className="text-sm">{`${monthName2} ${approvedDate
              .getDate()
              .toString()} , ${approvedDate.getFullYear().toString()}`}</p>
          </div>
        )}

        <div
          onClick={() => download(result?.books_id?._id)}
          className="rounded-3xl cursor-pointer  text-center tracking-widest p-1 bg-[#6b6b6b]"
        >
          <div className="flex justify-center items-center">
            {result && result.issueStatus === 1 && (
              <div className="flex items-center px-1">
                <MdFileDownload />
              </div>
            )}
            {result?.issueStatus === 1
              ? "Approved"
              : result?.issueStatus === 0
              ? "pending"
              : "Rejected"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqestThumbNail;
