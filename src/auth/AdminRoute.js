import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { role, token } = useSelector((state) => state.users);

    return token && token && role === 1 ? <Outlet /> : <Navigate to="/" />;
  
}

export default AdminRoute