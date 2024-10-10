const { faker } = require("@faker-js/faker");
const Recipe = require("../models/recipeModel");

// Function to generate random recipe data
const generateRandomRecipe = (name) => {
  return {
    name, // Random single-word name
    description: faker.lorem.sentence(), // Random description
    ingredients: faker.lorem.words(5).split(" "), // Random 5 ingredients
    cookingTime: faker.number.int({ min: 10, max: 120 }), // Random cooking time between 10 and 120 minutes
    servings: faker.number.int({ min: 1, max: 10 }), // Random servings between 1 and 10
    instructions: faker.lorem.paragraph(), // Random instructions
    difficulty: faker.helpers.arrayElement(["Easy", "Medium", "Hard"]), // Random difficulty
  };
};

// Generate and save multiple random recipes
const generateAndSaveRecipes = async (name, count) => {
  for (let i = 0; i < count; i++) {
    const randomRecipe = generateRandomRecipe(name);
    await Recipe.create(randomRecipe);
  }

  console.log(`${count} random recipes generated and saved.`);
};

module.exports = generateAndSaveRecipes;
