import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Change to boolean

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const userData = {
      username,
      password,
      email,
    };

    try {
      const response = await axiosInstance.post("/user/signup", userData);

      setSuccess("Registration successful!");
      setError("");
      navigate("/Login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setSuccess("");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <h1 className="text-5xl font-semibold text-gray-900 mb-8">
        Register <i className="ri-edit-2-line"></i>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full"
      >
        <label htmlFor="username" className="block text-lg text-gray-700 mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          className="w-full px-4 py-3 mb-6 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
        />

        <label htmlFor="email" className="block text-lg text-gray-700 mb-2">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 mb-6 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
        />

        <label htmlFor="password" className="block text-lg text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full px-4 py-3 mb-6 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
        />

        <button
          type="submit"
          className={`w-full py-3 text-white rounded-xl transition duration-300 focus:outline-none focus:ring-4 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Registering...
            </div>
          ) : (
            "Register"
          )}
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Already a User?</span>{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
    </div>
  );
};

export default Register;
