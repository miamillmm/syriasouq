import React from "react";
import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import LoginAndRegister from "../Pages/Authentication/LoginAndRegister";
import CarDetails from "../Pages/CarDetails";
import AddListingPage from "../Pages/AddListingPage";

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
        path: "/cardetails/:carname",
        element: <CarDetails />,
      },
      {
        path: "/addlisting",
        element: <AddListingPage />,
      },

    ],
  },
]);

export default router;
