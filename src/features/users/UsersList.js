import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section className="grid gap-4">
      <h2 className="heading-2">Users</h2>

      <ul className="grid gap-2">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
