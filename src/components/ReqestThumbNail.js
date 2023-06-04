import React from "react";

const ReqestThumbNail = ({ result }) => {
  const date = new Date(result?.issueDate);
  const approvedDate = new Date(result?.approvedDate)
  const monthName = date.toLocaleString("default", { month: "long" });
  const monthName2 = approvedDate.toLocaleString("default", { month: "long" });
  return (
    <div className="flex gap-3 ml-2 mb-2 h-[270px]  p-3 rounded-md bg-[#252525]">
      <div className="flex">
        <img
          src={`http://localhost:8000/${result?.books_id?.image}`}
          className="w-48 h-auto"
          alt=""
        />
      </div>

      <div className="flex flex-col gap-4 text-white">
        <h2>{result?.books_id?.title}</h2>
        <div className="flex mt-3 flex-col gap-">
          <p className="text-xs text-gray-400">Requested On</p>
          <p className="text-sm">{`${monthName} ${date
            .getDate()
            .toString()} , ${date.getFullYear().toString()}`}</p>
        </div>

        
        {result?.issueStatus === 1 && (
          <div className="flex mt-3 flex-col gap-">
            <p className="text-xs text-gray-400">Book Approved Date</p>
            <p className="text-sm">{`${monthName2} ${approvedDate
              .getDate()
              .toString()} , ${approvedDate.getFullYear().toString()}`}</p>
          </div>
        )}

        <div className="rounded-3xl flex flex-col justify-center items-center mt-auto text-center tracking-widest  p-2 bg-[#6b6b6b]">
          <p>
            {result?.issueStatus === 1
              ? "Approved"
              : result?.issueStatus === 0
              ? "pending"
              : "Rejected"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReqestThumbNail;
