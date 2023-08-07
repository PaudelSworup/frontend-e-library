import React, { useEffect, useState } from "react";
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
import { getReports } from "../../API/bookAPI";

const Chart = () => {
  const [requested, setMostRequesteed] = useState([]);
  const CustomTooltip = ({ active, payload, title }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label text-white text-lg font-bold">{`${payload[0].payload.name}`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    getReports().then((res) => {
      setMostRequesteed(res?.data.request);
    });
  }, []);

  const bookIdCounts = {};

  // Iterate through the data and count the occurrences of each book ID
  requested.forEach((item) => {
    const { books_id } = item;
    const bookId = books_id._id;

    // If the book ID already exists in the bookIdCounts object, increment its count
    if (bookId in bookIdCounts) {
      bookIdCounts[bookId].most_requested =
        bookIdCounts[bookId].most_requested + 1;
    } else {
      // If the book ID is encountered for the first time, initialize its count to 1
      bookIdCounts[bookId] = {
        _id: bookId,
        name: books_id.title,
        image: books_id.image,
        most_requested: 1,
      };
    }
  });

  console.log(bookIdCounts);

  const data2 = Object.values(bookIdCounts);

  return (
    <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
      <BarChart data={data2}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="most_requested" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
