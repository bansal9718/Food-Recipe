import React from "react";
import axiosInstance from "./axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/user/logout"); // Send logout request
      localStorage.removeItem("token"); // Remove token from local storage
      toast.success("Logged out Successfully, Redirecting Back to Login Page!"); // Success toast notification
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Some error occurred", error);
      toast.error("Logging Out"); 
    }
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default Logout;
