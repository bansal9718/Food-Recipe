import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Handle token decoding and error checking
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Invalid Token:", error);

      return null; // Return null to not render the sidebar if token is invalid
    }
  } else {
    console.error("Token not found.");
    // Optionally, you can navigate to a login page or show a message here
    // navigate("/login");
    return null; // Return null to not render the sidebar if no token is present
  }

  const handleFavorites = (event) => {
    event.preventDefault();
    navigate(`/favorites`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 w-64 p-4 min-h-screen">
      <h2 className="text-xl font-bold text-gray-900 mb-4">My Recipes</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleFavorites}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-150 transform hover:scale-105 active:scale-95"
        >
          Show Favorites
        </button>
        {decodedToken && (
          <Link to={`/myRecipes/${decodedToken.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-150 transform hover:scale-105 active:scale-95">
              My Added Recipes
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
