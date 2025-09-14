import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsInfo } from "../../redux/posts/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPostsInfo());
  }, []);

  return (
    <>
      {/* {posts && posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts && posts.map((post) => <Post key={post._id} post={post} />)
      )}{" "} */}

      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <img src={post.imageUrl} alt={post.title} width="200" />
            <p>Author: {post.author.name}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <hr />
          </div>
        ))}
    </>
  );
};

export default Posts;
