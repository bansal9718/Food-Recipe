import React from "react";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/arrow-left-s-line.png";
import rightArrow from "../../assets/arrow-right-s-line.png";

const Recipes = ({
  id,
  name,
  servings,
  description,
  difficulty,
  status,
  averageRating,
  contributedBy,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-8 mb-8 mt-9 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:bg-gray-50">
      <Link to={`/recipe/${id}`} className="block">
        {/* Flexbox layout for arrows and name */}
        <div className="flex items-center mb-4">
          <img src={leftArrow} alt="Left Arrow" className="w-5 h-5 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </h1>
          <img src={rightArrow} alt="Right Arrow" className="w-5 h-5 ml-2" />
        </div>

        <p className="text-lg text-gray-600 italic mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 mb-4">
          <p className="col-span-1">
            <span className="font-semibold text-gray-800">
              Average Rating:{" "}
            </span>
            {averageRating ? (
              <span className="text-yellow-500">
                {averageRating.toFixed(1)} ★
              </span>
            ) : (
              <span className="text-red-500">Not rated yet</span>
            )}
          </p>
          <p className="col-span-1">
            <span className="font-semibold text-gray-800">Servings:</span>{" "}
            {servings}
          </p>
          <p className="col-span-1">
            <span className="font-semibold text-gray-800">Status:</span>{" "}
            {status ? status : "NA"}
          </p>
          <p className="col-span-1">
            <span className="font-semibold text-gray-800">Difficulty: </span>
            <span
              className={`font-medium ${
                difficulty === "easy"
                  ? "text-green-600"
                  : difficulty === "medium"
                  ? "text-orange-600"
                  : "text-red-600"
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </p>
        </div>

        <p className="text-lg text-gray-800">
          <span className="font-semibold text-gray-800">Contributed By:</span>{" "}
          {contributedBy}
        </p>
      </Link>
    </div>
  );
};

export default Recipes;
