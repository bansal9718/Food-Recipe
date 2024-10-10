import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosConfig";
import { Link } from "react-router-dom";

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

        // Wait for all the recipe details to be fetched
        const recipeResponses = await Promise.all(recipeDetailsPromises);

        // Extract the recipe data from each response and set it in the state
        const fullRecipes = recipeResponses.map((res) => res.data.recipe); // Adjust based on API structure
        setFavorites(fullRecipes);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    showFavorites();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorite recipes yet.</p>
      ) : (
        favorites.map((recipe) => (
          <Link
            to={`/recipe/${recipe._id}`}
            key={recipe._id}
            className="block border rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition duration-300 bg-white"
          >
            <h3 className="text-xl font-bold text-gray-800">{recipe.name}</h3>
            <p className="text-gray-600 mb-2">{recipe.description}</p>
            <p className="text-gray-700">
              Servings: <span className="font-medium">{recipe.servings}</span>
            </p>
            <p className="text-gray-700">
              Cooking Time:{" "}
              <span className="font-medium">{recipe.cookingTime} minutes</span>
            </p>
            <p className="text-gray-700 font-semibold mt-2">Ingredients:</p>
            <ul className="list-disc list-inside mb-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient}
                </li>
              ))}
            </ul>
            <p className="text-gray-700">
              Difficulty:{" "}
              <span className="font-medium">{recipe.difficulty}</span>
            </p>
            <p className="text-gray-700">
              Average Rating:{" "}
              <span className="font-medium">{recipe.averageRating}</span>
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default FavoriteRecipes;
