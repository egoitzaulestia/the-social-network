import { absUrl } from "../../config/api.js";
import { Link } from "react-router-dom";
import { HeartIcon, UserIcon, ClockIcon } from "../Icons/Icons.jsx";
import "../../assets/sass/main.scss";

const Post = ({ post, showReadMore = true, authorNameOverride }) => {
  const images = Array.isArray(post?.imageUrls) ? post.imageUrls : [];
  
  // Format date to be more concise
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <article className="post-card">
      {/* Card Header */}
      <div className="post-card__header">
        <Link to={`/post/${post?._id}`} className="post-card__title">
          {post?.title}
        </Link>
      </div>

      {/* Card Content */}
      <div className="post-card__content">
        <p className="post-card__text">{post?.content}</p>

        {showReadMore && (
          <Link to={`/post/${post?._id}`} className="post-card__read-more">
            Read more
          </Link>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div className="post-card__images">
            {images.map((u, i) => {
              const src = absUrl(u);
              return (
                <img
                  key={`${post._id}-img-${i}`}
                  src={src}
                  alt={post?.title ? `${post.title} (${i + 1})` : `image ${i + 1}`}
                  className="post-card__image"
                  loading="lazy"
                  onError={(e) => {
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
      </div>

      {/* Card Footer */}
      <div className="post-card__footer">
        <div className="post-card__meta">
          {/* Likes */}
          <div className="post-card__likes">
            <HeartIcon className="post-card__icon" />
            <span>{post?.likes?.length ?? 0}</span>
          </div>

          {/* Author */}
          <div className="post-card__meta-item">
            <UserIcon className="post-card__icon" />
            <span className="post-card__author">
              {authorNameOverride ?? post?.author?.name ?? "Unknown"}
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="post-card__meta-item">
          <ClockIcon className="post-card__icon" />
          <span className="post-card__date">{formatDate(post?.createdAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default Post;
