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
  const { data } = await api.get(`/posts/id/${id}`);
  // Backend returns the post object directly (not wrapped in { post })
  return data;
};

const getPostByTitle = async (postTitle) => {
  const { data } = await api.get(`/posts/title/${postTitle}`);

  // Normalize the payload so the slice always receives an array
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.posts)) {
    return data.posts;
  }

  return [];
};

const postService = {
  getAllPostsInfo,
  getPostById,
  getPostByTitle,
};

export default postService;
