import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext } from './LoginContext.jsx';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
