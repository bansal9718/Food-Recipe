import React, { useEffect, useState } from "react";
import Recipes from "./Recipes";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig";

const RecipePage = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [location]);

  const fetchRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {
        name: location.state?.name || "",
        servings: location.state?.servings || "",
        difficulty: location.state?.difficulty || "",
        cookingTime: location.state?.cookingTime || "",
      };

      const response = await axiosInstance.get(`/food/search`, { params });

      if (
        response.data &&
        response.data.recipes &&
        Array.isArray(response.data.recipes)
      ) {
        setRecipes(response.data.recipes[0].recipes || []);
      } else {
        setError("No recipes found.");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Could not fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorites = (event) => {
    event.preventDefault();
    navigate(`/favorites`);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Recipes</h1>
        <button
          onClick={handleFavorites}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-150"
        >
          Show Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
            >
              <Recipes
                id={rec._id}
                name={rec.name}
                description={rec.description}
                servings={rec.servings}
                ingredients={rec.ingredients}
                cookingTime={rec.cookingTime}
                difficulty={rec.difficulty}
                averageRating={rec.averageRating}
                instructions={rec.instructions}
                contributedBy={rec.contributor?.username || "Anonymous"}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No recipes found based on the search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
