import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import DashBoard from "./components/RecipeDashboard";
import RecipeComponent from "./components/RecipeComponent";
import RecipePage from "./components/RecipePage";
import FavoriteRecipes from "./components/FavoriteRecipes";
import Logout from "./components/Logout";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Dashboard" element={<DashBoard />} />
          <Route path="/recipe/:id" element={<RecipeComponent />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
