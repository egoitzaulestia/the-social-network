import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostById } from "../../redux/posts/postsSlice";

const PostDetail = () => {
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // dispatch action to get post by id
    dispatch(getPostById(id));
  }, [dispatch, id]);

  if (!post) return <p>Loading…</p>;
  //   if (post.isError) return <p>Error: {post.message}</p>;
  if (!post) return <p>No post found</p>;
  console.log(post);

  return <div>PostDetail</div>;
};

export default PostDetail;
