import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RecipeDashboard = () => {
  const [name, setName] = useState("");
  const [servings, setServings] = useState("");
  const [status, setStatus] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (token) {
      try {
        setUsername(decodedToken.username);
        const welcomeShown = localStorage.getItem("welcomeShown");
        if (!welcomeShown) {
          setShowWelcome(true);
          localStorage.setItem("welcomeShown", "true");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (!name && !cookingTime && !status && !servings && !difficulty) {
      setError("Please enter Details.");
      return;
    }

    const params = new URLSearchParams();
    params.append("name", name);
    if (servings) params.append("servings", servings);
    if (status) params.append("status", status);
    if (difficulty) {
      params.append(
        "difficulty",
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
      );
    }
    if (cookingTime) params.append("cookingTime", cookingTime);

    setLoading(true);

    try {
      const response = await axiosInstance.get(`/food/search`, { params });
      if (response.data && response.data.recipes) {
        setSuccess(response.data.message);

        navigate("/recipe", {
          state: {
            recipes: response.data.recipes,
            name,
            servings,
            difficulty,
            cookingTime,
            status,
            ingredients: response.data.ingredients,
          },
        });
      } else {
        setError("No recipes found.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("No Recipes Found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
      <div className=" flex-grow p-8 bg-white shadow-lg rounded-lg">
        {showWelcome && username && (
          <h2 className="text-3xl text-gray-900 mb-4 animate-bounce text-center">
            Welcome, {username}!
          </h2>
        )}
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          Find a New Recipe <i className="ri-bowl-line"></i>
        </h1>
        <Link
          to="/Add"
          className="text-xl text-blue-600 hover:underline mb-6 text-center block"
        >
          Click here to Contribute a Recipe for Everyone?
        </Link>

        <p className="text-lg text-gray-700 mb-6 text-center">
          Just Type to Search for a Recipe!!
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-8 rounded-lg shadow-xl max-w-md mx-auto border border-gray-200"
        >
          <label htmlFor="name" className="block text-lg text-gray-800 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Burger"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />

          <label
            htmlFor="servings"
            className="block text-lg text-gray-800 mb-2"
          >
            Servings
          </label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
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
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <option value="">--Choose Difficulty--</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label htmlFor="status" className="block text-lg text-gray-800 mb-2">
            Status
          </label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <option value="">--Choose Status--</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
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
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition duration-150 ease-in-out ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Loading..." : "Search"}
          </button>
          {success && <div className="text-green-600 mt-4">{success}</div>}
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default RecipeDashboard;
