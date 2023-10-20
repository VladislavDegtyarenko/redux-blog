import { Link } from "react-router-dom";
import Container from "./Container";
import ThemeSelect from "./ThemeSelect";

const Header = () => {
  const navLinks = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "post",
      title: "Post",
    },
    {
      to: "user",
      title: "Users",
    },
  ];

  return (
    <header className="sticky top-0  py-4 bg-white dark:bg-neutral-800  shadow-md">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold">
            Blog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {navLinks.map(({ to, title }) => (
                <li key={title}>
                  <Link
                    to={to}
                    className="hover:underline focus:underline hover:decoration-indigo-700 focus:decoration-indigo-700"
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <li>
                <ThemeSelect />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
