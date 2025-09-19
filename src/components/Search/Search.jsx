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

  // Decode the URL-encoded search term
  const decodedSearchTerm = postName ? decodeURIComponent(postName) : "";

  useEffect(() => {
    if (decodedSearchTerm) {
      dispatch(getPostByTitle(decodedSearchTerm));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, decodedSearchTerm]);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {message}</p>;
  if (!posts?.length) return <p>No posts found for "{decodedSearchTerm}"</p>;

  return (
    <>
      <h1>Search Results</h1>
      <p>Searching for: "{decodedSearchTerm}"</p>
      <p>Found {posts.length} post{posts.length !== 1 ? 's' : ''}</p>

      <div className="search-results">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="search-result-item">
              <Post post={post} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
