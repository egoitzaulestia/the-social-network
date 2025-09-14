import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
const api = axios.create({ baseURL: API_BASE });

const getAllPostsInfo = async () => {
  const { data } = await api.get("/posts/full");
  return data.posts; // Return the data.posts
};

const postService = {
  getAllPostsInfo,
};

export default postService;
