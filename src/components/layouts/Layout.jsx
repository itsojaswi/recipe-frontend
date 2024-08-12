import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import React from "react";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
