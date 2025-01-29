import { Outlet } from "react-router";
import Navbar from "../Pages/NavBarr";
import Footer from "../Pages/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
