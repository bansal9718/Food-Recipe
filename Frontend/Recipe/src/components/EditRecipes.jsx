import { React, useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";
import myImage from "../../assets/restaurant-fill.png";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditRecipes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [servings, setServings] = useState("");
  const [cookingTime, setCookingTime] = useState();
  const [difficulty, setDifficulty] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get(`/food/single/${id}`);
        const recipe = response.data.recipe;

        setName(recipe.name);
        setDescription(recipe.description);
        setInstructions(recipe.instructions);
        setIngredients(recipe.ingredients);
        setServings(recipe.servings);
        setCookingTime(recipe.cookingTime);
        setDifficulty(recipe.difficulty);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to fetch recipe.");
      }
    };

    fetchRecipe();
  }, [id]);

  const handleIngredientChange = (index, value) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index] = value;
      return updatedIngredients;
    });
  };

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.length > 1
        ? prevIngredients.filter((_, i) => i !== index)
        : prevIngredients
    );
  };

  const handleRecipeSubmit = async (event) => {
    event.preventDefault();

    const recipeData = {
      name,
      description,
      instructions,
      ingredients,
      servings,
      cookingTime,
      difficulty:
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase(),
    };

    try {
      const response = await axiosInstance.put(`/food/edit/${id}`, recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess("Recipe edited successfully! Redirecting...");
        setError("");
        setTimeout(() => {
          navigate(`/myRecipes/${decodedToken.id}`); // Use navigate to redirect
        }, 2000);
      } else {
        throw new Error("Failed to edit recipe.");
      }
    } catch (error) {
      console.error("Error editing recipe", error);
      setError("Failed to edit recipe.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <span className="text-4xl font-sans font-semibold text-center text-gray-900 mb-8">
        Edit Your Recipe
        <img
          src={myImage}
          alt="Recipe Icon"
          className="inline-block w-10 h-10 ml-2"
        />
      </span>

      <form
        onSubmit={handleRecipeSubmit}
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Eg: Pizza"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your Recipe"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-lg font-medium text-gray-700"
          >
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="Eg: Cheese"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block text-lg font-medium text-gray-700"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-grow">
            <label
              htmlFor="servings"
              className="block text-lg font-medium text-gray-700"
            >
              Servings
            </label>
            <input
              type="number"
              id="servings"
              value={servings || ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setServings(value);
                }
              }}
              placeholder="0"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>

          <div className="flex-grow">
            <label
              htmlFor="cookingTime"
              className="block text-lg font-medium text-gray-700"
            >
              Cooking Time (min)
            </label>
            <input
              type="number"
              id="cookingTime"
              value={cookingTime || ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setCookingTime(value);
                }
              }}
              placeholder="0"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="difficulty-select"
            className="block text-lg font-medium text-gray-700"
          >
            Difficulty
          </label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">--Choose Difficulty--</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {success && <div className="text-green-500">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipes;
