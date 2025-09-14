import { absUrl } from "../../config/api.js";

const Post = ({ post }) => {
  const cover = post?.imageUrls?.[0] ? absUrl(post.imageUrls[0]) : "";

  return (
    <article style={{ marginBottom: 24 }}>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>

      {cover && (
        <img
          src={cover}
          alt={post?.title || "post image"}
          width="200"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}

      <p>Author: {post?.author?.name ?? "Unknown"}</p>
      <p>
        Created At:{" "}
        {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "-"}
      </p>
      <hr />
    </article>
  );
};

export default Post;
