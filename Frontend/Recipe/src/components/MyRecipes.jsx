import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const MyRecipes = ({
  id,
  name,
  servings,
  ingredients,
  cookingTime,
  description,
  difficulty,
  averageRating,
  instructions,
  suggestions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-10 hover:shadow-xl transform transition-transform duration-300 hover:scale-105 hover:bg-gray-50">
      <Link to={`/recipe/${id}`} className="block">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300 flex items-center">
          <i className="ri-arrow-left-s-line text-2xl mr-2"></i>
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          <i className="ri-arrow-right-s-line text-2xl ml-2"></i>
        </h1>

        <p className="text-lg text-gray-500 italic mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
          <div className="col-span-1">
            <span className="font-semibold">Average Rating: </span>
            {averageRating ? (
              <span className="text-yellow-500">
                {averageRating.toFixed(1)} ★
              </span>
            ) : (
              "Not rated yet"
            )}
          </div>
          <div className="col-span-1">
            <span className="font-semibold">Servings: </span> {servings}
          </div>
          <div className="col-span-1">
            <span className="font-semibold">Cooking Time: </span> {cookingTime}{" "}
            min
          </div>
          <div className="col-span-1">
            <span className="font-semibold">Difficulty: </span>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-5">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Instructions
          </h3>
          <p className="text-gray-700">{instructions}</p>
        </div>

        {suggestions && (
          <p className="text-gray-700 mt-4">
            <span className="font-semibold">Feedback: </span>
            {suggestions}
          </p>
        )}
      </Link>
    </div>
  );
};

export default MyRecipes;
