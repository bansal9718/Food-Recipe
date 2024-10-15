import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-8 bg-white min-h-screen shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
