import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostById, clearPost } from "../../redux/posts/postsSlice";
import { absUrl } from "../../config/api.js";

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

  const images = Array.isArray(post?.imageUrls) ? post.imageUrls : [];
  const likesCount = Array.isArray(post?.likes) ? post.likes.length : 0;

  const authorName =
    // If backend populated author (object)
    (post && typeof post.author === "object" && post.author?.name) ||
    // Fallback: try to find the name from the list page data in store
    (allPosts || [])
      .find((p) => p?._id === id && p && typeof p.author === "object")
      ?.author?.name ||
    "Unknown author";

  return (
    <article style={{ textAlign: "center" }}>
      <h2>{post.title}</h2>
      <p style={{ maxWidth: 900, margin: "0 auto 8px" }}>{post.content}</p>

      {images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
            justifyItems: "center",
            margin: "12px 0",
          }}
        >
          {images.map((u, i) => (
            <img
              key={`${post._id}-img-${i}`}
              src={absUrl(u)}
              alt={post?.title ? `${post.title} (${i + 1})` : `image ${i + 1}`}
              style={{ width: "180px", height: "120px", objectFit: "cover", borderRadius: "10px" }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                e.currentTarget.alt = "image not found";
              }}
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      )}

      <p>Likes: {likesCount}</p>
      <p>Author: {authorName}</p>
      <p>
        Created At: {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
      </p>
    </article>
  );
};

export default PostDetail;
