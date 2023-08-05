import React from "react";

const LandingComponents = ({ h2, p }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{h2}</h2>
      <p className="text-gray-700 text-justify">{p}</p>
    </div>
  );
};

export default LandingComponents;
