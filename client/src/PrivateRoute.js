import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./helpers/utils";

const PrivateRoute = () => {
  // const { state } = useContext(AuthContext);
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth?page=login"/>;
};

export default PrivateRoute;
