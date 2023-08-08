import React, { useEffect, useState } from "react";
import { getReports } from "../../API/bookAPI";

const Requests = () => {
  const [req, setRequests] = useState([]);
  useEffect(() => {
    getReports().then((res) => {
      const filteredRequests = res?.data?.request.filter((data) => {
        return data?.issueStatus !== 1;
      });
      setRequests(filteredRequests);
    });
  }, []);
  console.log(req);
  return <div>Requests</div>;
};

export default Requests;
