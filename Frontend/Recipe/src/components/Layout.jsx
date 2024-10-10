import React from "react";
import { Link, Outlet } from "react-router-dom"; // This will render the child routes
import Logout from "./Logout"; 

const Layout = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/Dashboard">
          <h1 className="text-xl font-semibold">My Recipe App</h1>
        </Link>
        {token && <Logout />}
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
