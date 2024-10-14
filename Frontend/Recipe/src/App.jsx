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
import AddRecipe from "./components/AddRecipe";
import UserRecipes from "./components/UserRecipes";
import EditRecipes from "./components/EditRecipes";
import MyProfile from "./components/MyProfile";
import ChangePassword from "./components/ChangePassword";
import DashboardLayout from "./components/DashBoardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/Dashboard"
            element={
              <DashboardLayout>
                <DashBoard />
              </DashboardLayout>
            }
          />
          <Route path="/recipe/:id" element={<RecipeComponent />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Add" element={<AddRecipe />} />
          <Route path="/myRecipes/:id" element={<UserRecipes />} />
          <Route path="/edit/:id" element={<EditRecipes />} />
          <Route path="/MyProfile/:id" element={<MyProfile />} />
          <Route
            path="/change-password/:id"
            element={<ChangePassword />}
          ></Route>
        </Route>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
