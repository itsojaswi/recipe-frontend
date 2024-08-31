import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="flex  bg-[#eeeeee]">
      <Sidebar />
      <div className="lg:ml-[180px] sm:ml-[100px] md:ml-[150px] px-9 py-11 flex flex-col w-full h-[100vh] overflow-scroll scrollbar-hide">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
