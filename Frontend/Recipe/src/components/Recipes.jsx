import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Recipes = ({
  id,
  name,
  servings,
  ingredients,
  cookingTime,
  description,
  difficulty,
  averageRating,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:bg-gray-50">
      <Link to={`/recipe/${id}`} className="block">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
          {name}
        </h1>
        <p className="text-lg text-gray-500 italic mb-6">{description}</p>

        <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
          <p className="col-span-1">
            <span className="font-semibold">Average Rating:</span>{" "}
            {averageRating ? (
              <span className="text-yellow-500">
                {averageRating.toFixed(1)} ★
              </span>
            ) : (
              "Not rated yet"
            )}
          </p>
          <p className="col-span-1">
            <span className="font-semibold">Servings:</span> {servings}
          </p>
          <p className="col-span-1">
            <span className="font-semibold">Cooking Time:</span> {cookingTime}{" "}
            min
          </p>
          <p className="col-span-1">
            <span className="font-semibold">Difficulty:</span>{" "}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default Recipes;
