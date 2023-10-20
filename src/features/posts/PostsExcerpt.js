import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostContent from "./PostContent";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="bg-white- dark:bg-neutral-800 p-8 space-y-4 border border-transparent rounded-xl shadow-md ">
      <PostContent post={post} linkVariant="View" bodySnippet />
    </article>
  );
};

export default PostsExcerpt;
