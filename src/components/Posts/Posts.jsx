import Post from "../Post/Post";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPostsInfo } from "../../redux/posts/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsInfo());
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <Post />
    </>
  );
};

export default Posts;
