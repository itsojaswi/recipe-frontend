import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import React from "react";

const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="ml-[185px]  px-9 py-11 flex flex-col w-full h-[100vh] overflow-scroll scrollbar-hide bg-[#eeeeee]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
