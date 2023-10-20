import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import { useParams } from "react-router-dom";
import PostContent from "./PostContent";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className="space-y-4">
      <PostContent post={post} linkVariant="Edit" />
    </article>
  );
};

export default SinglePostPage;
