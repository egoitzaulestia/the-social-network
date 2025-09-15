import axios from "axios";
import { API_BASE } from "../../config/api.js";

const api = axios.create({ baseURL: API_BASE });

const getAllPostsInfo = async (page = 1, limit = 10) => {
  const { data } = await api.get("/posts/full", {
    params: { page, limit },
  });
  return data.posts; // Return the data.posts
};

const getPostById = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data.post; // Return the data.post
};

const postService = {
  getAllPostsInfo,
  getPostById,
};

export default postService;
