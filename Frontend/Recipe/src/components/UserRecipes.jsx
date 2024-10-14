import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyRecipes from "./MyRecipes";
import axiosInstance from "./axiosConfig";
import { GiCookingPot } from "react-icons/gi"; // Cooking pot icon for recipe name

const UserRecipes = () => {
  const { id } = useParams();
  const [loadingUserRecipes, setLoadingUserRecipes] = useState(false);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const handleUserRecipes = async (e) => {
      setLoadingUserRecipes(true); // Set loading for user recipes button

      try {
        const response = await axiosInstance.get(`/user/${id}/recipes`);
        if (response.data) {
          setRecipes(response.data);
        }
      } catch (err) {
        console.error("Error fetching user recipes:", err);
        setError("Could not fetch recipes. Please try again.");
      } finally {
        setLoadingUserRecipes(false); // Reset loading for user recipes button
      }
    };
    handleUserRecipes();
  }, [id]);

  return (
    <div>
      <h1 className="text-4xl italic font-bold text-gray-900 mb-8 text-left">
        <GiCookingPot className="inline-block mr-2 text-gray-700" />
        Your Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((rec) => (
            <div key={rec._id}>
              <MyRecipes
                id={rec._id}
                name={rec.name}
                description={rec.description}
                servings={rec.servings}
                ingredients={
                  rec.ingredients.length > 0
                    ? rec.ingredients.map((e) => {
                        return e;
                      })
                    : "[]"
                }
                cookingTime={rec.cookingTime}
                difficulty={rec.difficulty}
                averageRating={rec.averageRating}
                instructions={rec.instructions}
                suggestions={
                  rec.suggestions.length > 0
                    ? rec.suggestions.map((e) => {
                        return e.suggestion + "," + "";
                      })
                    : " " + "None"
                }
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

export default UserRecipes;
