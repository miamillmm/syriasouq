import { createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login-and-register",
        element: <LoginAndRegister />,
      },
      {
        path: "/listing/:id",
        element: <CarDetails />,
      },
      {
        path: "/addlisting",
        element: <AddListingPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/messages",
        element: <MessagesPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/term-and-use",
        element: <TermsPage />,
      },
    ],
  },
]);

export default router;
