const express = require("express");
const authController = require("../controllers/authController");
const recipeController = require("../controllers/recipeController");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

//Authentication
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/get/:id").get(authenticateToken, authController.getUserById);

//Favorite Routes
router.route("/favorite").get(authenticateToken, authController.getFavorite);
router
  .route("/addFavorite/:id")
  .post(authenticateToken, authController.addFavorite);
router
  .route("/:userId/recipes")
  .get(authenticateToken, recipeController.searchRecipesByUserId);

router
  .route("/removeFavorite/:id")
  .post(authenticateToken, authController.removeFavorite);

router.route("/logout").post(authenticateToken, authController.logout);
module.exports = router;
