import React from 'react'
import {Auth} from './Auth';
import { isAuthenticated } from "../helpers/utils";
import { Navigate } from "react-router-dom";

export const AuthContainer = () => {
  return (
     !isAuthenticated() ? <Auth /> : <Navigate to="/"/>
  )
}
