import React from "react";
import { jwtDecode } from "jwt-decode";

const ProfileButton = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = `/MyProfile/${decodedToken.id}`;
  };
  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300"
      >
        My Profile
      </button>
    </div>
  );
};

export default ProfileButton;
