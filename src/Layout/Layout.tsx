import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-slate-50 h-full">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
