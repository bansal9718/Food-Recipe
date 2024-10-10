const express = require("express");
const app = express();
const connectDB = require("./server");
require("dotenv").config();
const authRoutes = require("./routes/authRouter");
const recipeRoutes = require("./routes/recipeRouter");
const randomData = require("./utils/randomRecipes");
const cors = require("cors");

app.use(express.json());

app.use(cors({
  origin: '*', // Replace with your client origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header']
}));
//routes mounting

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/food", recipeRoutes);

//DB Connection
connectDB();

// randomData("sandwich", 5);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//Global error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});
