import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "remixicon/fonts/remixicon.css";
import axiosInstance from "./axiosConfig";

const MarkFavorite = ({ initialFavorite, recipeId }) => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null; // Ensure token exists before decoding

  // Initialize state based on initialFavorite
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleFavoriteClick = async (event) => {
    event.preventDefault();

    if (!decodedToken) return; // Prevent action if no user is decoded

    const feedbackData = {
      userId: decodedToken.id,
      recipeId: recipeId,
    };

    try {
      let response;

      if (isFavorite) {
        response = await axiosInstance.post(`/user/removeFavorite/${recipeId}`, feedbackData);
        setFeedbackMessage("Removed from Favorites Successfully");
      } else {
        response = await axiosInstance.post(`/user/addFavorite/${recipeId}`, feedbackData);
        setFeedbackMessage("Marked as Favorite Successfully");
      }

      // Toggle the favorite status
      setIsFavorite((prev) => !prev);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setFeedbackMessage("Some Problem Occurred");
      setIsError(true);
    }

    // Clear feedback message after 3 seconds
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleFavoriteClick}
        className="cursor-pointer outline-none"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <i
          className={`ri-star ${
            isFavorite ? "ri-star-fill text-yellow-500" : "ri-star-line text-gray-400"
          } text-2xl`}
        ></i>
      </button>
      {feedbackMessage && (
        <p className={`ml-2 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
          {feedbackMessage}
        </p>
      )}
    </div>
  );
};

export default MarkFavorite;
