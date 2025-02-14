import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import avatar from "../assets/images/avatar/photo.png";
import logo from "../assets/images/logo/logo.png";
import Translate from "../utils/Translate";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("SyriaSouq-auth");
    navigate("/");
  };

  return (
    <nav className="bg-[#323232fa] w-screen text-white py-4 px-4 md:px-28 fixed z-20">
      <div className="flex justify-between items-center">
        {/* Left: Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
        <NavLink className="w-14 md:hidden" to="/">
          <img src={logo} className="w-14" alt="Logos" />
        </NavLink>

        <Link to={"/addlisting"} className="block md:hidden">
          <button className="bg-[#B80200] text-[#314352] px-2 py-1 rounded-md  cursor-pointer text-xs">
            <Translate text={"Add Listing"} /> <span>+</span>
          </button>
        </Link>

        {/* Right: Avatar (Mobile) */}
        <div className="avatar md:hidden">
          <div className="w-12 rounded-full">
            <img src={avatar} alt="avatar" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="w-full hidden md:flex justify-between items-center space-x-6">
          <div className="flex items-center justify-between gap-10">
            <NavLink className="w-14" to="/">
              <img src={logo} className="w-14" alt="Logo" />
            </NavLink>
            <ul className="flex items-center space-x-6">
              <li className="relative group">
                <NavLink
                  to="/"
                  className="hover:text-[#B80200] duration-500 text-[18px] font-[500]"
                >
                  <span className="absolute left-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-2.5 transition-all duration-500 ease-in-out">
                    •
                  </span>
                  <Translate text={"Home"} />
                </NavLink>
              </li>
              <li className="relative group">
                <div className="dropdown dropdown-hover">
                  <button className="hover:text-[#B80200] duration-500 text-[18px] font-[500] cursor-pointer flex items-center">
                    <span className="absolute left-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-2.5 transition-all duration-500 ease-in-out">
                      •
                    </span>
                    <Translate text={"Page"} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1 transition-all duration-500 group-hover:opacity-0"
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
                    className="dropdown-content menu text-black bg-base-100 rounded-box z-10 mt-10 w-44 p-2 shadow-sm"
                  >
                    <li>
                      <NavLink
                        to="/about"
                        className="hover:text-[#B80200] duration-500 text-[18px] font-[500]"
                      >
                        <Translate text={"About Us"} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        className="hover:text-[#B80200] duration-500 text-[18px] font-[500]"
                      >
                        <Translate text={"Contact"} />
                      </NavLink>
                    </li>
                    <li>
                      {user ? (
                        <NavLink
                          to="/dashboaard"
                          className="hover:text-[#B80200] duration-500 text-[18px] font-[500]"
                        >
                          <Translate text={"Listing"} />
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/login-and-register"
                          className="hover:text-[#B80200] duration-500 text-[18px] font-[500]"
                        >
                          <Translate text={"Login/Register"} />
                        </NavLink>
                      )}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative group flex items-center justify-between gap-10">
            {/* Currency Dropdown */}
            <div className="dropdown dropdown-hover">
              <button className="hover:text-[#B80200] duration-500 text-[18px] font-[500] cursor-pointer flex items-center">
                <Translate text={"SYP"} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 transition-all duration-300 group-hover:opacity-0"
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
                className="dropdown-content menu text-black hover:text-[#B80200] text-[18px] font-[500] bg-base-100 rounded-box z-10 w-32 mt-10 p-2 shadow-sm"
              >
                <li>
                  <NavLink to="/about">
                    <Translate text={"USD"} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact">
                    <Translate text={"SYP"} />
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Avatar */}
            {user && (
              <>
                <div className="avatar">
                  <Link to={"/dashboard"}>
                    <div className="w-10 rounded-full h-10 bg-teal-400 !flex items-center justify-center font-black text-lg">
                      {/* <img src={avatar} alt="avatar" /> */}
                      <Translate
                        text={(() => {
                          const firstLetter =
                            user?.username?.charAt(0).toUpperCase() || "?";
                          return firstLetter;
                        })()}
                      />
                    </div>
                  </Link>
                </div>
              </>
            )}

            {/* Login/Register */}
            {user && (
              <button
                onClick={handleLogout}
                className="cursor-pointer text-[#B80200]"
              >
                <Translate text={"Logout"} />
              </button>
            )}
            {!user && (
              <>
                <Link
                  to="/login-and-register"
                  className="hover:text-[#B80200] text-[18px] font-[500] duration-500"
                >
                  <Translate text={"Login"} />
                </Link>
                <span className="border-r border-gray-300 h-6"></span>
                <Link
                  to="/login-and-register"
                  className="hover:text-[#B80200] text-[18px] font-[500] duration-500"
                >
                  <Translate text={"Register"} />
                </Link>
              </>
            )}

            {/* Add Listing Button */}
            <NavLink to="/addlisting">
              <button className="bg-[#B80200] px-4 py-2 rounded-md  cursor-pointer text-white">
                <Translate text={"Add Listing"} /> <span>+</span>
              </button>
            </NavLink>
            {/* <button className="bg-red-500 text-[#314352] text-[18px] font-light px-4 py-2 rounded-md cursor-pointer">
              Add Listing 
            </button> */}
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="bg-[#374b5c] text-white w-64 h-full p-6 shadow-md z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white focus:outline-none cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
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
            <ul className="space-y-4">
              <li>
                <NavLink to="/" className="block hover:text-[#B80200]">
                  <Translate text={"Home"} />
                </NavLink>
              </li>
              <li>
                <div className="dropdown">
                  <button className="hover:text-[#B80200]">
                    <Translate text={"Page"} />
                  </button>
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <NavLink
                        to="/about"
                        className="block hover:text-[#B80200]"
                      >
                        <Translate text={"About Us"} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        className="block hover:text-[#B80200]"
                      >
                        <Translate text={"Contact"} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login-and-register"
                        className="block hover:text-[#B80200]"
                      >
                        <Translate text={"Login/Register"} />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/addlisting">
                  <button className="bg-[#B80200] px-4 py-2 text-white rounded-md hover:bg-[#B80200] cursor-pointer">
                    <Translate text={"Add Listing"} />
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
