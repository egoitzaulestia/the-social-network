import { absUrl } from "../../config/api.js";
import { Link } from "react-router-dom";

const imgStyle = {
  width: "180px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "10px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "12px",
  justifyItems: "center",
  margin: "12px 0",
};

const Post = ({ post, showReadMore = true, authorNameOverride }) => {
  const images = Array.isArray(post?.imageUrls) ? post.imageUrls : [];

  return (
    <article style={{ marginBottom: 32, textAlign: "center" }}>
      <h2>{post?.title}</h2>
      <p style={{ maxWidth: 900, margin: "0 auto 8px" }}>{post?.content}</p>

      {showReadMore && <Link to={`/post/${post?._id}`}>Read more</Link>}

      {images.length > 0 && (
        <div style={gridStyle}>
          {images.map((u, i) => {
            const src = absUrl(u);
            return (
              <img
                key={`${post._id}-img-${i}`}
                src={src}
                alt={
                  post?.title ? `${post.title} (${i + 1})` : `image ${i + 1}`
                }
                style={imgStyle}
                loading="lazy"
                onError={(e) => {
                  // show a tiny transparent pixel if missing (avoid broken icon)
                  e.currentTarget.src =
                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                  e.currentTarget.alt = "image not found";
                }}
                referrerPolicy="no-referrer"
              />
            );
          })}
        </div>
      )}

      <p>Likes: {post?.likes?.length ?? 0}</p>
      <p>Author: {authorNameOverride ?? post?.author?.name ?? "Unknown"}</p>
      <p>
        Created At:{" "}
        {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
      </p>
      {/* <hr /> */}
    </article>
  );
};

export default Post;
