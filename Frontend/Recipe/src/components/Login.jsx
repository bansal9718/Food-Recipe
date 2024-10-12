import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axiosInstance.post("/user/login", userData);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setSuccess("Logged in Successfully");
        setTimeout(() => {
          navigate("/Dashboard");
        }, 2000);
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <h1 className="text-5xl font-semibold text-gray-900 mb-8 flex items-center gap-2">
        Login <i className="ri-login-box-line"></i>
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full"
      >
        <label htmlFor="email" className="block text-lg text-gray-700 mb-2">
          Email
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
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Not registered yet?</span>{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>

      {success && (
        <p className="mt-4 text-3xl text-green-600 text-center">{success}</p>
      )}
    </div>
  );
};

export default Login;
