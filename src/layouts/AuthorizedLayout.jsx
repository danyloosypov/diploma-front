import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';

const AuthorizedLayout = () => {
  const {user} = useAuthContext();
  console.log("authlayout", user);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthorizedLayout
