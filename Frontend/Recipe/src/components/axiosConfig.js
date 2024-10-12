import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://food-recipe-1-efz0.onrender.com/api/v1", // Your backend base URL
  // baseURL: "http://localhost:3000/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
