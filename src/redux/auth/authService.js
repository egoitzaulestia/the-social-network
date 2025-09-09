import axios from "axios";

// const API_URL = "http://localhost:3000";

// // Register user
// const register = async (userData) => {
//   console.log("from service", userData);
//   const response = await axios.post(`${API_URL}/users/register`, userData);
//   return response.data;
// };

// const login = async (userData) => {
//   const response = await axios.post(`${API_URL}/users/login`, userData);

//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data.user));
//     localStorage.setItem("token", JSON.stringify(response.data.token));
//   }
//   return response.data;
// };

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";
const api = axios.create({ baseURL: API_BASE });

export const register = async (userData) => {
  const { data } = await api.post("/users/register", userData);
  return data;
};

const login = async (userData) => {
  const { data } = await api.post("/users/login", userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
  }
  return data;
};

const authService = {
  register,
  login,
};

export default authService;
