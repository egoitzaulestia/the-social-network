import axios from "axios";

const API_URL = "http://localhost:3000";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
