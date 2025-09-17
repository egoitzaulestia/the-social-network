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
  const { data } = await api.get(`/posts/search/${postTitle}`);
  // Backend returns an array of posts matching the title
  return data; // Assuming data is an array of posts
};

const postService = {
  getAllPostsInfo,
  getPostById,
  getPostByTitle,
};

export default postService;
