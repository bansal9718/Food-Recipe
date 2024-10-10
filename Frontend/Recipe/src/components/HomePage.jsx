import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <h1 className="text-6xl font-sans font-semibold text-center text-gray-900 mb-8">
        Recipe Finder  <i class="ri-restaurant-2-fill"></i>
      </h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-lg">
        Discover and cook your favorite dishes from an extensive Collection of
        recipes. Deliciousness is just a tap away.
      </p>
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
        <span className="block mb-4 text-gray-900 text-xl font-medium text-center">
          New User?
        </span>
        <Link to="/Register">
          <button className="w-full py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 mb-6">
            Register
          </button>
        </Link>
        <span className="block my-4 text-gray-500 text-center">Or</span>
        <Link to="/Login">
          <button className="w-full py-3 bg-gray-200 text-gray-900 text-lg rounded-xl hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
