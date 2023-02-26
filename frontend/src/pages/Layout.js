import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from 'react';

const Layout = () => {
  return <>
    <CssBaseline />
    <Navbar />
    <Outlet />
  </>;
};

export default Layout;
