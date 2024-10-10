import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { useNavigate } from "react-router-dom";

const RecipeDashboard = () => {
  const [name, setName] = useState("");
  const [servings, setServings] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [difficulty, setDifficulty] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      setError("Please enter a recipe name.");
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
          },
        });
      } else {
        setError("No recipes found.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("No Recipes Found. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        Find your Recipe <i class="ri-bowl-line"></i>
      </h1>
      <p className="text-lg text-gray-600 mb-6">Type to search your recipe</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <label htmlFor="name" className="block text-lg text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter recipe name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="servings" className="block text-lg text-gray-700 mb-2">
          Servings
        </label>
        <input
          type="number"
          id="servings"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          placeholder="Enter servings"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="difficulty"
          className="block text-lg text-gray-700 mb-2"
        >
          Difficulty
        </label>
        <select
          id="difficulty-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Choose Difficulty--</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <label
          htmlFor="cookingTime"
          className="block text-lg text-gray-700 mb-2"
        >
          Cooking Time (in minutes)
        </label>
        <input
          type="number"
          id="cookingTime"
          value={cookingTime}
          onChange={(e) => setCookingTime(Number(e.target.value))}
          placeholder="Enter cooking time"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Submit
        </button>
      </form>

      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default RecipeDashboard;
