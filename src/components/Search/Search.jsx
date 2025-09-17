import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByTitle, reset } from "../../redux/posts/postsSlice";
import Post from "../Post/Post";

const Search = () => {
  const { postName } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (store) => store.posts
  );

  useEffect(() => {
    if (postName) {
      dispatch(getPostByTitle(postName));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, postName]);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {message}</p>;
  if (!posts?.length) return <p>No posts found for "{postName}"</p>;

  return (
    <>
      <h1>Search</h1>
      <p>Searching for: {postName}</p>
      {/* {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <hr />
        </div>
      ))} */}

      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
            <hr />
            <br />
          </div>
        ))}
    </>
  );
};

export default Search;
