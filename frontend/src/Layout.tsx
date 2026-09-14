import { Outlet } from "react-router-dom";
import Header from "./componets/Header";
import Footer from "./componets/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
