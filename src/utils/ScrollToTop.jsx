import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component scrolls to the top when the route changes
const ScrollToTop = () => {
  const location = useLocation(); // Gets the current location object

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the route changes
  }, [location]); // Runs whenever the location (route) changes

  return null;
};

export default ScrollToTop;
