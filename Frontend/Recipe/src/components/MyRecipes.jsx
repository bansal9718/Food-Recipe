import React, { useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import {
  RiStarSFill,
  RiFileList2Line,
  RiTimerFill,
  RiRestaurantLine,
  RiCheckboxCircleLine,
  RiListOrdered,
  RiBookOpenLine,
  RiEdit2Line,
  RiFeedbackLine,
} from "react-icons/ri";
import axiosInstance from "./axiosConfig";

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleEdit = async (e) => {
    e.preventDefault();
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (e) => {
    try {
      const response = await axiosInstance.delete(`/food/delete/${id}`);
      setSuccess("Removed Successfully");
      window.location.href = `/recipe/${id}`;
    } catch (error) {
      console.error(error);
      setError("Deletion Failed");
    }
  };

  return (
    <div>
      <Link
        to={`/recipe/${id}`}
        className="block border border-gray-300 rounded-lg p-6 mb-4 shadow-lg hover:shadow-xl transition duration-300 bg-white transform hover:scale-105"
      >
        <h1 className="text-2xl font-bold italic text-gray-800 mb-2 flex items-center">
          <RiFileList2Line className="mr-1" />
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </h1>

        <p className="text-sm text-gray-600 italic mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
          <div className="flex items-center">
            <RiStarSFill className="text-yellow-500 mr-1" />
            <span className="font-semibold">Average Rating:</span>
            {averageRating ? (
              <span className="text-yellow-500 ml-1">
                {averageRating.toFixed(1)} ★
              </span>
            ) : (
              <span className="ml-1">Not rated yet</span>
            )}
          </div>
          <div className="flex items-center">
            <RiRestaurantLine className="text-gray-600 mr-1" />
            <span className="font-semibold">Servings:</span>
            <span className="ml-1">{servings}</span>
          </div>
          <div className="flex items-center">
            <RiTimerFill className="mr-1 text-gray-600" />
            <span className="font-semibold">Cooking Time:</span>
            <span className="ml-1">{cookingTime} min</span>
          </div>
          <div className="flex items-center">
            <RiCheckboxCircleLine className="mr-1 text-gray-600" />
            <span className="font-semibold">Difficulty:</span>
            <span className="ml-1">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <RiListOrdered className="mr-1" />
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 pl-5">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <RiBookOpenLine className="mr-1" />
            Instructions
          </h3>
          <p className="text-gray-700">{instructions}</p>
        </div>

        {suggestions && (
          <p className="text-gray-700 mt-4 flex items-center">
            <RiFeedbackLine className="mr-1" /> {/* Icon for Feedback */}
            <span className="font-semibold">Feedback:</span> {suggestions}
          </p>
        )}
        <button
          onClick={handleEdit}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
        >
          <RiEdit2Line className="mr-1" />
          Edit
        </button>
      </Link>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300 flex items-center"
      >
        <RiEdit2Line className="mr-1" />
        Remove
      </button>
      {success && (
        <p className="mt-4 text-1xl text-green-600 text-center">{success}</p>
      )}
    </div>
  );
};

export default MyRecipes;
