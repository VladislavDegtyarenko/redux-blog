import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import ReactionButtons from "./ReactionButtons";

const PostContent = ({ post, linkVariant, bodySnippet }) => {
  let linkTo;
  let linkText;

  switch (linkVariant) {
    case "View":
      linkTo = `/post/${post.id}`;
      linkText = "View Post";
      break;

    case "Edit":
      linkTo = `/post/edit/${post.id}`;
      linkText = "Edit Post";
      break;

    default:
      break;
  }

  return (
    <>
      <h2 className="heading-2">{post.title}</h2>
      <p className="text-base text-neutral-600 dark:text-neutral-100">
        {bodySnippet ? `${post.body.substring(0, 75)}...` : post.body}
      </p>
      <p className="flex flex-wrap space-x-4 text-neutral-600 dark:text-neutral-100">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <footer className="flex flex-wrap-reverse gap-4 items-center">
        {linkTo ? (
          <Link
            to={linkTo}
            className="bg-indigo-700 hover:bg-indigo-800 transition-colors text-neutral-100 px-4 py-2 rounded-xl inline-flex text-center whitespace-nowrap"
          >
            {linkText}
          </Link>
        ) : null}
        <ReactionButtons post={post} />
      </footer>
    </>
  );
};

export default PostContent;
