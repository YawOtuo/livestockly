import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Navigate } from "react-router-dom";
const PrivateRoute = ({  children }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated) 

  useEffect(()=>{

  }, [isAuthenticated])
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute