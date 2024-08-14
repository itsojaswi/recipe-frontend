import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import React from "react";

const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="ml-[200px] px-9 py-11 flex flex-col w-full h-full overflow-scroll scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
