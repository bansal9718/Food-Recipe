const Recipe = require("../models/recipeModel");
const RecipeError = require("../utils/customError");
const SuccessResponse = require("../utils/SuccessReponse");

const newRecipe = async (req, res, next) => {
  const {
    name,
    description,
    ingredients,
    cookingTime,
    instructions,
    servings,
    difficulty,
  } = req.body;

  const userId = req.user.id;
  try {
    const recipe = await Recipe.create({
      name,
      description,
      ingredients,
      cookingTime,
      instructions,
      servings,
      difficulty,
      contributedBy: userId,
    });

    if (!recipe) {
      throw new RecipeError("Provide all details for Recipe", 400);
    }

    // Send the success response
    return new SuccessResponse("Recipe Created Successfully", recipe, 201).send(
      res
    );
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    const recipeCount = await Recipe.countDocuments();

    if (!recipes || recipes.length === 0) {
      throw new RecipeError("No recipes found", 400);
    }

    // Send the success response
    return new SuccessResponse(
      "Recipes fetched Successfully",
      { recipeCount, recipes },
      200
    ).send(res);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

const searchRecipesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find recipes contributed by the specified user
    const recipes = await Recipe.find({ contributedBy: userId });
   
    // Check if recipes were found
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    // Send the found recipes with a 200 status code
    return res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    // Return a 500 status code for server errors
    return res
      .status(500)
      .json({ message: "An error occurred while fetching recipes." });
  }
};

const searchRecipeByName = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    throw new RecipeError("Recipe Name Required", 400);
  }

  try {
    const recipe = await Recipe.find({ name: new RegExp(name, "i") });

    if (!recipe) {
      throw new RecipeError("No Recipe found", 400);
    }

    // Send the success response
    return new SuccessResponse(
      "Recipe fetched Successfully",
      recipe,

      200
    ).send(res);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params; // Correctly destructuring id from req.params

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID." }); // Corrected the status method
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." }); // Added proper status for not found
    }

    return res
      .status(200)
      .json({ message: "Recipe found successfully.", recipe }); // Sending a response with status and recipe
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Server error." }); // Handle server error
  }
};

const filterRecipe = async (req, res) => {
  try {
    const { name, servings, difficulty, cookingTime } = req.query;

    const matchStage = {};

    // Filter by name if provided
    if (name) {
      matchStage.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    // Only filter by servings if provided
    if (servings) {
      matchStage.servings = { $gte: parseInt(servings) }; // Example: find servings greater than or equal to provided
    }

    // Only filter by difficulty if provided
    if (difficulty) {
      matchStage.difficulty = difficulty;
    }

    // Only filter by cookingTime if provided
    if (cookingTime) {
      matchStage.cookingTime = { $gte: parseInt(cookingTime) }; // Example: find cooking time greater than or equal to provided
    }

    const recipe = await Recipe.aggregate([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "users",
          let: { contributorId: { $toObjectId: "$contributedBy" } }, // Convert to ObjectId
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$contributorId"] },
              },
            },
          ],
          as: "contributor",
        },
      },
      {
        $unwind: {
          path: "$contributor",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
          recipes: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    console.log(recipe);
    if (!recipe || recipe.length == 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).json({
      message: "Recipes fetched successfully",
      recipes: recipe,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching recipes." });
  }
};

const rating = async (req, res) => {
  const { rating, userId, recipeId } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found." });
  }

  const existingUserRatingIndex = recipe.ratings.findIndex(
    (r) => r.userId.toString() === userId.toString()
  );

  if (existingUserRatingIndex > -1) {
    recipe.ratings[existingUserRatingIndex].rating = rating;
  } else {
    recipe.ratings.push({ userId, rating });
  }

  //Average Rating Calculation

  const totalRating = recipe.ratings.reduce((sum, r) => sum + r.rating, 0);
  const averageRating =
    recipe.ratings.length > 0 ? totalRating / recipe.ratings.length : 0;

  recipe.averageRating = averageRating;
  await recipe.save();

  return res.status(200).json({
    message: "Recipe rated successfully.",
    averageRating: recipe.averageRating,
  });
};

const Suggestions = async (req, res) => {
  const { recipeId, suggestion, userId } = req.body; // Extracting variables

  // Validate input
  if (!recipeId || !suggestion || !userId) {
    return res
      .status(400)
      .json({ message: "Please provide recipeId, suggestion, and userId." });
  }

  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found." }); // Use 404 for not found
  }

  // Check if the user has already provided a suggestion
  const existingUserSuggestionIndex = recipe.suggestions.findIndex((r) => {
    return r.userId.toString() === userId.toString(); // Ensure userId is checked correctly
  });

  // Update existing suggestion or add a new one
  if (existingUserSuggestionIndex > -1) {
    recipe.suggestions[existingUserSuggestionIndex].suggestion = suggestion; // Update feedback
  } else {
    recipe.suggestions.push({ userId, suggestion }); // Add new suggestion
  }

  // Save the recipe with the updated suggestions
  await recipe.save();

  // Return a success response
  return res.status(200).json({ message: "Suggestion saved successfully." });
};

module.exports = {
  newRecipe,
  getAllRecipes,
  searchRecipeByName,
  filterRecipe,
  rating,
  Suggestions,
  getRecipeById,
  searchRecipesByUserId,
};
