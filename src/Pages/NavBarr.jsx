import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/images/logo/logo-new-transparent-bg.png";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#323232fa] text-white py-3 px-4 sm:px-6 md:px-16 lg:px-28 fixed w-full top-0 z-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left: Hamburger Menu (Mobile/Tablet) */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Middle: Logo */}
        <NavLink className="flex-shrink-0" to="/">
          <img
            src={logo}
            className="w-12 sm:w-14 md:w-16"
            alt="SyriaSouq Logo"
          />
        </NavLink>
        <NavLink to="/addlisting">
              <button className="bg-[#B80200] text-white px-4 py-2 rounded-md text-sm sm:hidden lg:text-base font-semibold flex items-center gap-1 hover:bg-red-600 transition-colors shadow-md">
                {currentLanguage === "ar" ? "إضافة إعلان" : "Add Listing"}
                <span>+</span>
              </button>
            </NavLink>
     
        {/* Right: Mobile Actions (Profile Only on Small Screens) */}
        <div className="flex items-center gap-2 sm:gap-3 sm:hidden">
          <Link to={user ? "/dashboard" : "/login-and-register"}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-[#B80200] shadow-sm">
                <FaRegUserCircle className="text-[#B80200] w-6 h-6" />
              </div>
              <p className="bg-gradient-to-r from-[#B80200] to-[#A00000] text-white px-2 py-1 rounded-md text-xs font-bold hover:bg-gradient-to-r hover:from-[#A00000] hover:to-[#900000] transition-all hover:scale-105 shadow-md">
                {currentLanguage === "ar" ? "حسابي" : "My Profile"}
              </p>
            </div>
          </Link>
        </div>
     

        {/* Desktop Navigation */}
        <div className="hidden sm:flex flex-1 justify-between items-center gap-6">
          {/* Left: Nav Links */}
          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-4 lg:gap-6">
              <li className="relative group">
                <NavLink
                  to="/"
                  className="text-sm lg:text-lg font-medium hover:text-[#B80200] transition-colors duration-300"
                >
                  <span className="absolute left-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-2.5 transition-all duration-500 ease-in-out">
                    •
                  </span>
                  <Translate text="Home" />
                </NavLink>
              </li>
              <li className="relative group">
                <div className="dropdown dropdown-hover">
                  <button
                    className="text-sm lg:text-lg font-medium hover:text-[#B80200] transition-colors duration-300 flex items-center"
                    aria-haspopup="true"
                  >
                    <span className="absolute left-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-2.5 transition-all duration-500 ease-in-out">
                      •
                    </span>
                    <Translate text="Page" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1 group-hover:opacity-0 transition-opacity duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white text-gray-800 rounded-lg mt-2 w-48 p-2 shadow-lg"
                  >
                    <li>
                      <NavLink
                        to="/about"
                        className="text-sm hover:text-[#B80200] py-2 px-4 rounded transition-colors duration-300"
                      >
                        <Translate text="About Us" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        className="text-sm hover:text-[#B80200] py-2 px-4 rounded transition-colors duration-300"
                      >
                        <Translate text="Contact" />
                      </NavLink>
                    </li>
                    <li>
                      {user ? (
                        <NavLink
                          to="/dashboard"
                          className="text-sm hover:text-[#B80200] py-2 px-4 rounded transition-colors duration-300"
                        >
                          <Translate text="Listing" />
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/login-and-register"
                          className="text-sm hover:text-[#B80200] py-2 px-4 rounded transition-colors duration-300"
                        >
                          <Translate text="Login/Register" />
                        </NavLink>
                      )}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Actions (Including Add Listing on Larger Screens) */}
          <div className="flex items-center gap-4 lg:gap-6">
            {user ? (
              <>
                <Link to="/dashboard">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <FaRegUserCircle className="text-[#B80200] w-8 h-8" />
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm lg:text-lg text-[#B80200] font-medium hover:underline"
                >
                  <Translate text="Logout" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login-and-register"
                  className="text-sm lg:text-lg font-medium hover:text-[#B80200] transition-colors duration-300"
                >
                  <Translate text="Login" />
                </Link>
                <span className="border-r border-gray-300 h-6"></span>
                <Link
                  to="/login-and-register"
                  className="text-sm lg:text-lg font-medium hover:text-[#B80200] transition-colors duration-300"
                >
                  <Translate text="Register" />
                </Link>
              </>
            )}
            <NavLink to="/addlisting">
              <button className="bg-[#B80200] text-white px-4 py-2 rounded-md text-sm lg:text-base font-semibold flex items-center gap-1 hover:bg-red-600 transition-colors shadow-md">
                {currentLanguage === "ar" ? "إضافة إعلان" : "Add Listing"}
                <span>+</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile/Tablet */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="bg-[#374b5c] text-white w-64 h-full p-6 transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white focus:outline-none"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="space-y-4 mt-10">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-base font-medium hover:text-[#B80200] py-2"
                >
                  {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
                </NavLink>
              </li>
              <li>
                <div className="space-y-2">
                  <span className="block text-base font-medium py-2">
                    <Translate text="Page" />
                  </span>
                  <ul className="ml-4 space-y-2">
                    <li>
                      <NavLink
                        to="/about"
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-sm hover:text-[#B80200] py-1"
                      >
                        <Translate text="About Us" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-sm hover:text-[#B80200] py-1"
                      >
                        {currentLanguage === "ar" ? "تواصل معنا" : "Contact"}
                      </NavLink>
                    </li>
                    {user ? (
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setIsSidebarOpen(false);
                          }}
                          className="block text-sm text-[#B80200] py-1"
                        >
                          <Translate text="Logout" />
                        </button>
                      </li>
                    ) : (
                      <li>
                        <NavLink
                          to="/login-and-register"
                          onClick={() => setIsSidebarOpen(false)}
                          className="block text-sm hover:text-[#B80200] py-1"
                        >
                          <Translate text="Login/Register" />
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              <li>
                <NavLink
                  to="/addlisting"
                  onClick={() => setIsSidebarOpen(false)}
                  className="block"
                >
                  <button className="bg-white px-4 py-2 text-[#B80200] rounded-md text-sm font-semibold hover:bg-gray-100 w-full text-left">
                    {currentLanguage === "ar" ? "إضافة إعلان" : "Add Listing"}
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;