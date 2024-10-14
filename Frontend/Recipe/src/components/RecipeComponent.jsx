import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import MarkFavorite from "./MarkFavorite";
import RatingsComponent from "./RatingsComponenet"; 
import userIcon from "../../assets/user-fill.png";

import {
  FaClock,
  FaUtensils,
  FaStar,
  FaComment,
  FaClipboardList,
} from "react-icons/fa";

const RecipeComponent = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState(null);
  const [suggestion, setSuggestions] = useState("");
  const [success, setSuccess] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [initialFavorite, setInitialFavorite] = useState(null);
  const [addedBy, setAddedBy] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, [token]);

  useEffect(() => {
    const fetchRecipeAndFavorites = async () => {
      if (!id || !userId) return; // Check if id and decodedToken are valid

      try {
        const response = await axiosInstance.get(`/food/single/${id}`);
        setRecipe(response.data.recipe);
        if (response.data.recipe.contributedBy) {
          const getUserById = await axiosInstance.get(
            `/user/get/${response.data.recipe.contributedBy}`
          );
          setAddedBy(getUserById.data.user.username);
        } else {
          setAddedBy("Anonymous");
        }
        const userResponse = await axiosInstance.get(`/user/get/${userId}`);
        setUser(userResponse.data.user);

        const isRecipeFavorite = userResponse.data.user.favorites.includes(
          response.data.recipe._id
        );
        setInitialFavorite(isRecipeFavorite);
      } catch (err) {
        console.error("Error fetching recipe or user:", err);
        setError("Could not fetch recipe or user details.");
      }
    };

    fetchRecipeAndFavorites();
  }, [id, userId]); // Ensure id and decodedToken are the only dependencies

  const handleSubmit = async (event) => {
    event.preventDefault();
    const feedbackData = {
      userId: decodedToken.id,
      recipeId: id,
      suggestion,
    };
    try {
      const response = await axiosInstance.post("/food/feedback", feedbackData);
      setSuccess("Feedback submitted successfully");
      if (response) {
        setSuggestions("");
      }
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Could not submit feedback. Please try again.");
    }
  };

  const handleRatingChange = async (rating) => {
    setUserRating(rating);
    const fetchData = {
      recipeId: id,
      userId: decodedToken.id,
      rating,
    };
    try {
      await axiosInstance.post(`/food/rating/${id}`, fetchData);

      const updatedRecipeResponse = await axiosInstance.get(
        `/food/single/${id}`
      );
      setRecipe(updatedRecipeResponse.data.recipe);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <h1 className="text-4xl font-semibold text-gray-900">
          <FaClipboardList className="inline-block mr-2" />
          {recipe.name.charAt(0).toUpperCase() +
            recipe.name.slice(1).toLowerCase()}
        </h1>
      </div>

      <h3 className="text-lg text-gray-600 mb-2">{recipe.description}</h3>
      <p className="text-gray-700 mb-4">
        <FaUtensils className="inline-block mr-1" />
        Servings: <span className="font-medium">{recipe.servings}</span>
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Ingredients:{" "}
      </h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">
            {ingredient}
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Instructions: </h3>
        <p className="col-span-1 text-gray-700">{recipe.instructions}</p>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        <FaClock className="inline-block mr-1" />
        Time Taken:{" "}
        <span className="font-medium">{recipe.cookingTime} min</span>
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Level: <span className="font-medium">{recipe.difficulty}</span>
      </h3>

      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        Status: {recipe.status}
      </h3>

      <MarkFavorite initialFavorite={initialFavorite} recipeId={id} />

      <div className="mb-4">
        <RatingsComponent
          initialRating={userRating}
          onRatingChange={handleRatingChange}
        />
        <div className="flex flex-row items-center justify-between">
          <p className="text-gray-700">
            <FaStar className="inline-block mr-1" />
            Average Rating:{" "}
            <span className="font-medium">
              {recipe.averageRating.toFixed(1)} out of 5
            </span>
          </p>
          <h2 className="text-lg text-gray-700 flex items-center">
            <img src={userIcon} alt="user" className="w-6 h-6 mr-2" />
            <span className="font-semibold">
              {addedBy ? addedBy : "Anonymous"} (contributor)
            </span>
          </h2>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 mt-6">
        <h1 className="text-xl font-semibold mb-2">
          <FaComment className="inline-block mr-1" />
          Provide Suggestions
        </h1>
        <form onSubmit={handleSubmit}>
          <textarea
            name="suggestion"
            cols="30"
            rows="5"
            className="w-full border border-gray-300 rounded-md p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={suggestion}
            onChange={(e) => setSuggestions(e.target.value)}
            placeholder="Your suggestions here..."
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Submit
          </button>
          {success && <p className="text-green-600 mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default RecipeComponent;
