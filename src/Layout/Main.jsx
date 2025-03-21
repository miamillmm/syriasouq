import { Outlet } from "react-router";
import Navbar from "../Pages/NavBarr";
import Footer from "../Pages/Footer";
import ScrollToTop from "../utils/ScrollToTop";

const Main = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop /> {/* Place it here to ensure it runs on route change */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
