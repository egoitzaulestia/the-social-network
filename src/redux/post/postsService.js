import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({ baseURL: API_URL });

const getAllPostsInfo = async () => {
  const { data } = await api.get("/posts/full");
  return data;
};

const postService = {
  getAllPostsInfo,
};

export default postService;
