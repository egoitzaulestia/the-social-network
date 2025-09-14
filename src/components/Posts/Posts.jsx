import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsInfo } from "../../redux/posts/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPostsInfo());
  }, [dispatch]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!posts?.length) return <p>No posts available</p>;

  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default Posts;
