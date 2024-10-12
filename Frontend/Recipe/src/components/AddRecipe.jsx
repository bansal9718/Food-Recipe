import { React, useState } from "react";
import axiosInstance from "./axiosConfig";
import myImage from "../../assets/restaurant-fill.png";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [servings, setServings] = useState("");
  const [cookingTime, setCookingTime] = useState();
  const [difficulty, setDifficulty] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleRecipeSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setError("Please enter a recipe name.");
      return;
    }

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
      const response = await axiosInstance.post("/food/create", recipeData);
      console.log(response);

      setName("");
      setDescription("");
      setIngredients([""]);
      setInstructions("");
      setServings("");
      setCookingTime("");
      setDifficulty("");

      setSuccess("Recipe added successfully! Redirecting...");
      setError("");

      setTimeout(() => {
        window.location.href = "/Dashboard";
      }, 2000);
    } catch (error) {
      console.error("Error adding recipe", error);
      setError("Failed to add recipe.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <span className="text-4xl font-sans font-semibold text-center text-gray-900 mb-8">
        Enter Your Recipe
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
                required
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
              onChange={(e) => setServings(Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={cookingTime}
              onChange={(e) => setCookingTime(Number(e.target.value))}
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

        <button
          type="submit"
          className="w-full bg-green-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          Submit
        </button>

        {success && <p className="mt-4 text-green-500">{success}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddRecipe;
