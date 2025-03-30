import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Router from "./Routes/Routes"; // Import Router
import i18n from "./i18n"; // Import i18n instance

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    // Function to update direction when language changes
    const updateDirection = (lang) => {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      setCurrentLanguage(lang);
    };

    // Listen for language changes
    i18n.on("languageChanged", updateDirection);

    // Initial setup
    updateDirection(i18n.language);

    // Cleanup listener on unmount
    return () => {
      i18n.off("languageChanged", updateDirection);
    };
  }, []); // ✅ No unnecessary dependencies

  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
