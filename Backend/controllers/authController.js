const express = require("express");
const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all details" });
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const user = await User.create({ username, email, password });

    if (!user) {
      return res.status(500).json({ message: "Signup failed" });
    }

    const createdUser = await User.findById(user._id).select(" -password");
    return res.status(201).json({ message: "Signup successful", createdUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during signup",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Pls provide Email and Password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User doesn't exists" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  const token = await user.generateToken();
  if (!token) {
    return res.status(400).json({ message: "Token generation failed" });
  }
  user.password = undefined;

  return res.status(200).json({
    message: "Logged in successfully",
    user,
    token,
  });
};

const logout = async (req, res) => {
  res.status(200).json({
    message: "Successfully logged out",
  });
};

const addFavorite = async (req, res) => {
  const { userId } = req.body; // Get userId from the request body
  const recipeId = req.params.id; // Get recipeId from the request params

  if (!userId || !recipeId) {
    return res.status(400).json({ message: "Enter details" }); // Change status to 400 for bad request
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }

  // Ensure favorites is initialized
  if (!user.favorites) {
    user.favorites = []; // Initialize if undefined
  }

  if (user.favorites.includes(recipeId)) {
    // If the recipe is already a favorite, remove it
    user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
    await user.save(); // Save changes to the user
    return res.status(200).json({ message: "Recipe removed from favorites." });
  } else {
    // If the recipe is not a favorite, add it
    user.favorites.push(recipeId);
    await user.save(); // Save changes to the user
    return res.status(200).json({ message: "Recipe added to favorites." });
  }
};

const removeFavorite = async (req, res) => {
  const { userId } = req.body; // Get userId from the request body
  const recipeId = req.params.id; // Get recipeId from the request params

  if (!userId || !recipeId) {
    return res.status(400).json({ message: "Enter details" }); // Change status to 400 for bad request
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }

  // Ensure favorites is initialized
  if (!user.favorites) {
    user.favorites = []; // Initialize if undefined
  }
  try {
    if (user.favorites.includes(recipeId)) {
      // If the recipe is already a favorite, remove it
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== recipeId
      );
      await user.save(); // Save changes to the user
      return res
        .status(200)
        .json({ message: "Recipe removed from favorites." });
    }
  } catch (error) {
    console.error("Some Error Occurred", error);
    return res.status.json({ message: "Recipe not a favorite" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id; // Get userId from URL parameters

  if (!userId) {
    return res.status(400).json({ message: "Provide User Id" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Some error occurred", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFavorite = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      message: "Favorite recipes fetched successfully.",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not fetch user." });
  }
};

module.exports = {
  signup,
  login,
  addFavorite,
  getFavorite,
  removeFavorite,
  getUserById,
  logout,
};
