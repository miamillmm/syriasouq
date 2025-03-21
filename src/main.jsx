import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import "./i18n";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./utils/ScrollToTop";
import Router from "./Routes/Routes"; // Import the Router component here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RouterProvider router={router}>
      <ScrollToTop /> */}
    {/* <ScrollRestoration /> */}
    <Router />
    <ToastContainer />
    {/* </RouterProvider> */}
  </StrictMode>
);
