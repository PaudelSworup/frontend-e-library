import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { role, token } = useSelector((state) => state.users);

  return token && token && role === 0 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
