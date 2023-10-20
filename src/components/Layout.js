import Container from "./Container";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-neutral-100 text-neutral-800 dark:bg-black dark:text-neutral-100 grid min-h-[100dvh] grid-rows-[auto_1fr] gap-8">
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout;
