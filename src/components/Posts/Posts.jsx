import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsInfo, reset } from "../../redux/posts/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (store) => store.posts
  );

  useEffect(() => {
    const fetcAllPosts = async () => {
      dispatch(getAllPostsInfo());
      dispatch(reset());
    };
    fetcAllPosts();
  }, [dispatch]);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {message}</p>;
  if (!posts?.length) return <p>No posts available</p>;

  return (
    <>{posts && posts.map((post) => <><Post key={post._id} post={post} /> <hr /><br/></>)}</>
  );
};

export default Posts;
