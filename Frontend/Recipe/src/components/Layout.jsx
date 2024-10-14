import React from "react";
import { Link, Outlet } from "react-router-dom"; // This will render the child routes
import Logout from "./Logout";
import ProfileButton from "./ProfileButton";

const Layout = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/Dashboard">
          <h1 className="text-2xl font-semibold">
            <i className="ri-home-smile-fill"></i> My Recipe App
          </h1>
        </Link>
        <div className="flex flex-row gap-8 mr-5 ">
          {token && <ProfileButton />}
          {token && <Logout />}
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
