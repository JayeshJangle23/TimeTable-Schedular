import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/nav/Slidebar";
import Topbar from "../components/nav/Topbar";
import MobileNav from "../components/nav/MobileNav";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-main text-main">
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <main className="flex-1 px-4 md:px-8 py-6 pb-24 md:pb-10">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
