import React from "react";
import { useLocation } from "react-router-dom";
import MyRecipes from "./MyRecipes";

const UserRecipes = () => {
  const location = useLocation();
  const recipes = location.state || [];
  console.log(recipes);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.recipes.length > 0 ? (
          recipes.recipes.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
            >
              <MyRecipes
                id={rec._id}
                name={rec.name}
                description={rec.description}
                servings={rec.servings}
                ingredients={rec.ingredients}
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
