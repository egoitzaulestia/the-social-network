import axios from "axios";

const API_URL = "http://localhost:3000";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

const authService = {
  register,
};

export default authService;
