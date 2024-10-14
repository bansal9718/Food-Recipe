import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";
import { Link } from "react-router-dom";
import { FaClock, FaUtensils, FaStar } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi"; // Cooking pot icon for recipe name
import { RiFeedbackLine } from "react-icons/ri"; // Feedback icon for feedback section (if available)

const FavoriteRecipes = () => {
  const token = localStorage.getItem("token");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const showFavorites = async () => {
      try {
        const response = await axiosInstance.get(`/user/favorite`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const recipeIds = response.data.favorites;

        const recipeDetailsPromises = recipeIds.map((id) =>
          axiosInstance.get(`/food/single/${id}`)
        );

        const recipeResponses = await Promise.all(recipeDetailsPromises);
        const fullRecipes = recipeResponses.map((res) => res.data.recipe);
        setFavorites(fullRecipes);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    showFavorites();
  }, [token]);

  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-900 mb-8 text-left">
        <GiCookingPot className="inline-block mr-2 text-gray-700" />
        Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          You have no favorite recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((recipe) => (
            <Link
              to={`/recipe/${recipe._id}`}
              key={recipe._id}
              className="block border border-gray-300 rounded-lg p-6 mb-4 shadow-lg hover:shadow-xl transition duration-300 bg-white transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                <RiFeedbackLine className="inline-block mr-2 text-gray-700" />
                {recipe.name.charAt(0).toUpperCase() +
                  recipe.name.slice(1).toLowerCase()}
              </h3>
              <p className="text-gray-600 mb-2">{recipe.description}</p>
              <div className="flex items-center mb-2">
                <FaUtensils className="text-gray-700 mr-1" />
                <span className="text-gray-700 font-medium">
                  {recipe.servings} Servings
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="text-gray-700 mr-1" />
                <span className="text-gray-700 font-medium">
                  {recipe.cookingTime} Minutes
                </span>
              </div>
              <p className="text-gray-700 font-semibold mt-2">Ingredients:</p>
              <ul className="list-disc list-inside mb-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">
                    {ingredient}
                  </li>
                ))}
              </ul>
              <div className="flex items-center mt-4">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-700">
                  Average Rating:{" "}
                  <span className="font-medium">{recipe.averageRating}</span>
                </span>
              </div>
              <p className="text-gray-700 mt-4">
                Difficulty:{" "}
                <span className="font-medium">{recipe.difficulty}</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
