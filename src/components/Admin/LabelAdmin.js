import React from "react";

const LabelAdmin = ({labelForhtml,className}) => {
  return (
    <label
      className={className}
      htmlFor={labelForhtml}
    >
      {labelForhtml}
    </label>
  );
};

export default LabelAdmin;
