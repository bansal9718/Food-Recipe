import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

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

        navigate("/Dashboard");
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
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
              Logging in...
            </div>
          ) : (
            "Login"
          )}
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
