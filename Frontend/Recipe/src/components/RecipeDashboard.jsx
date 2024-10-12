import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const RecipeDashboard = () => {
  const [name, setName] = useState("");
  const [servings, setServings] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(""); // Reset success message
    setError(""); // Reset error message

    if (!name) {
      setError("Please enter a Recipe name.");
      return;
    }

    const params = new URLSearchParams();
    params.append("name", name);
    if (servings) params.append("servings", servings);
    if (difficulty) {
      params.append(
        "difficulty",
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
      );
    }
    if (cookingTime) params.append("cookingTime", cookingTime);

    setLoading(true); // Set loading to true

    try {
      const response = await axiosInstance.get(`/food/search`, { params });
      if (response.data && response.data.recipes) {
        setSuccess(response.data.message);

        setTimeout(() => {
          navigate(
            "/recipe",
            {
              state: {
                recipes: response.data.recipes,
                name,
                servings,
                difficulty,
                cookingTime,
              },
            },
            4000
          );
        });
      } else {
        setError("No recipes found.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("No Recipes Found. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleUserRecipes = async (e) => {
    e.preventDefault();
    const userId = decodedToken.id;
    try {
      const response = await axiosInstance.get(`/user/${userId}/recipes`);
      console.log(response);
      if (response && response.data) {
        // Use a timeout for demo purposes, can be removed in production
        setTimeout(() => {
          navigate("/myRecipes", {
            state: {
              recipes: response.data,
            },
          });
        }, 1000);
      }
    } catch (err) {
      console.error("Error fetching user recipes:", err);
      setError("Could not fetch recipes. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <Link to="/myRecipes">
        <button
          onClick={handleUserRecipes}
          className="mb-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Your Added Recipes
        </button>
      </Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Find Your Recipe <i className="ri-bowl-line"></i>
      </h1>
      <span className="mb-4 text-gray-700">Or</span>
      <Link
        to="/Add"
        className="text-xl text-blue-700 hover:underline mb-6 cursor-pointer"
      >
        Click here to Add a Recipe for Everyone?
      </Link>

      <p className="text-lg text-gray-600 mb-6">
        Just type to search for a recipe!
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <label htmlFor="name" className="block text-lg text-gray-800 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Eg: Burger"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="servings" className="block text-lg text-gray-800 mb-2">
          Servings
        </label>
        <input
          type="number"
          id="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          placeholder="0"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="difficulty"
          className="block text-lg text-gray-800 mb-2"
        >
          Difficulty
        </label>
        <select
          id="difficulty-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Choose Difficulty--</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <label
          htmlFor="cookingTime"
          className="block text-lg text-gray-800 mb-2"
        >
          Cooking Time (in minutes)
        </label>
        <input
          type="number"
          id="cookingTime"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          placeholder="0"
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-200"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-500" aria-live="polite">
          {success}
        </p>
      )}
      {error && (
        <p className="mt-4 text-red-500" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default RecipeDashboard;
