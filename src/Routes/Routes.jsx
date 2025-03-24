import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import LoginAndRegister from "../Pages/Authentication/LoginAndRegister";
import CarDetails from "../Pages/CarDetails";
import AddListingPage from "../Pages/AddListingPage";
import Dashboard from "../Pages/Dashboard";
import MessagesPage from "../Pages/Dashboard/MessagesPage";
import SearchPage from "../Pages/SearchPage";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsPage from "../Pages/TermAndUse";
import PasswordChangePage from "../Pages/Authentication/PasswordChangePage";
import ChangePassword from "../Pages/Authentication/ChangePassword";
import Favorites from "../Pages/Dashboard/Favorites";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login-and-register" element={<LoginAndRegister />} />
          <Route
            path="/change-password/:token"
            element={<PasswordChangePage />}
          />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/listing/:id" element={<CarDetails />} />
          <Route path="/addlisting" element={<AddListingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-and-use" element={<TermsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
