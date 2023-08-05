import React from "react";

const LabelComp = ({labelForhtml}) => {
  return (
    <label
      className="block text-white tracking-wide capitalize text-lg font-bold mb-2"
      htmlFor={labelForhtml}
    >
      {labelForhtml}
    </label>
  );
};

export default LabelComp;
