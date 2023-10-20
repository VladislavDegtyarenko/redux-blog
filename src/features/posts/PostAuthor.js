import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return (
    <span className="text-bold items-center before:content-[''] before:relative before:bottom-1 before:mr-2 before:w-8 before:h-[2px] before:bg-indigo-700 before:inline-block">
      by&nbsp;
      {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : "Unknown author"}
    </span>
  );
};
export default PostAuthor;
