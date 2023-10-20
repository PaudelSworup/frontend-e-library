import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMostRequested } from "../../API/bookAPI";
import { useQuery } from "react-query";
import Loading from "../users/Loading";

const Chart = () => {
  const [requested, setMostRequesteed] = useState([]);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label text-white text-lg font-bold">{`${payload[0].payload.name}`}</p>
        </div>
      );
    }
    return null;
  };

  const { isLoading } = useQuery(
    ["getreports"],
    async () => await getMostRequested(),
    {
      onSettled: (data) => setMostRequesteed(data?.data?.mostRequestedBooks),
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  const bookIdCounts = {};

  requested.map((item) => {
    const { _id, title, image } = item?.book;
    const { count } = item;

    const bookId = _id;

    bookIdCounts[bookId] = {
      _id: bookId,
      name: title,
      image: image,
      most_requested: count,
    };
  });

  const data2 = Object.values(bookIdCounts);

  return (
    <div className="flex items-center justify-center lg:ml-60 m-4 lg:m-10 rounded">
      <ResponsiveContainer width="100%" aspect={4.0 / 2.0}>
        <BarChart data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="most_requested" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
