import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostById, clearPost } from "../../redux/posts/postsSlice";
import Post from "../Post/Post";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { post, posts: allPosts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    // fetch on mount / id change
    dispatch(getPostById(id));
    // clear previous post on unmount
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, id]);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {message}</p>;
  if (!post) return <p>No post found</p>;

  const authorName =
    // If backend populated author (object)
    (post && typeof post.author === "object" && post.author?.name) ||
    // Fallback: try to find the name from the list page data in store
    (allPosts || [])
      .find((p) => p?._id === id && p && typeof p.author === "object")
      ?.author?.name ||
    "Unknown author";

  return (<Post post={post} showReadMore={false} authorNameOverride={authorName} />);
};

export default PostDetail;
