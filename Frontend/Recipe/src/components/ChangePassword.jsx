import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Import eye icons

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showOldPassword, setShowOldPassword] = useState(false); // State for old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const { id } = useParams(); // To get the user's ID
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate password criteria
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    return password.length >= minLength && hasUpperCase;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmNewPassword
    ) {
      setError("Please provide all details.");
      return;
    }

    if (!validatePassword(passwords.newPassword)) {
      setError(
        "New password must be at least 8 characters long and contain at least one uppercase letter."
      );
      return;
    }

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `/user/changePassword/${id}`,
        passwords
      );
      setSuccess(response.data.message);
      setError("");

      // Redirect after success (optional)
      setTimeout(() => {
        navigate(`/MyProfile/${id}`);
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Password change failed. Please try again.");
      }
      setSuccess("");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[340px] p-6 bg-gray-100 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          <i className="ri-key-fill"></i> Change Password
        </h1>

        <div aria-live="assertive" className="mb-4">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left relative">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-semibold mb-1"
            >
              Old Password:
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>

          <div className="mb-4 text-left relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold mb-1"
            >
              New Password:
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>

          <div className="mb-4 text-left relative">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-semibold mb-1"
            >
              Confirm New Password:
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
