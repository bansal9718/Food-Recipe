import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch user data on initial render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/get/${id}`);
        const { username, email } = response.data.user; // Removed password for security reasons
        setUserData({ username, email, password: "" });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load profile.");
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/user/edit/${id}`, userData);
      setSuccess("Profile updated successfully!");
      setError("");
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Error updating profile.");
      setSuccess("");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle redirect to change password page
  const handlePasswordChangeRedirect = () => {
    navigate(`/change-password/${id}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-[370px] p-6 bg-white rounded-lg shadow-lg text-center border border-gray-300">
        <i className="ri-user-fill text-4xl text-blue-500 mb-6"></i>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to your Profile, {userData.username}
        </h1>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          <div className="mb-4 text-left">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Update Profile
          </button>
        </form>

        {/* Change Password Button */}
        <button
          onClick={handlePasswordChangeRedirect}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
