const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const recipeController = require("../controllers/recipeController");

router.route("/create").post(authenticateToken, recipeController.newRecipe);

router.route("/all").get(authenticateToken, recipeController.getAllRecipes);
router
  .route("/single/:id")
  .get(authenticateToken, recipeController.getRecipeById);
router
  .route("/recipe")
  .get(authenticateToken, recipeController.searchRecipeByName);

router.route("/delete/:id").delete(recipeController.removeRecipe);
router.route("/search").get(authenticateToken, recipeController.filterRecipe);

router.route("/rating/:id").post(authenticateToken, recipeController.rating);

router.route("/feedback").post(authenticateToken, recipeController.Suggestions);

router.route("/edit/:id").put(recipeController.editRecipes);

module.exports = router;
