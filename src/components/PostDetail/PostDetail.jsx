import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostById, clearPost } from "../../redux/posts/postsSlice";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const { post, isLoading, isError, message } = useSelector(
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
  console.log(post);

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <i>By {post.author?.name || "Unknown author"}</i>
      </p>
    </article>
  );
};

export default PostDetail;
