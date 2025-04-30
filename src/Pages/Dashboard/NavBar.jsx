import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import Translate from "../../utils/Translate";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Use AuthContext to get user and logout function
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logout(); // Use logout from AuthContext
    navigate("/", { replace: true });
  };

  return (
    <nav className="p-4">
      <div className="flex items-center gap-6 mb-5 relative w-fit">
        {/* Profile Circle with Username and Phone */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-gray-400 bg-gray-200 shadow-xl flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span className="font-bold">
              {user?.username?.slice(0, 1).toUpperCase()}
            </span>
          </div>
          {/* Display Username and Phone Number */}
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {user?.username || "N/A"}
            </span>
            <span className="text-sm text-gray-600">
              {user?.phone || "N/A"}
            </span>
          </div>
        </div>

        {showProfileMenu && (
          <div
            className={`absolute top-10 ${
              currentLanguage === "ar" ? "right-0" : "left-0"
            } min-w-60 p-3 rounded-lg shadow-lg bg-slate-200 z-[99999] flex flex-col gap-2 transition-all`}
          >
            <p>{user?.email || user?.phone}</p>
            <hr />
            <Link to={"/change-password"}>
              {currentLanguage === "ar"
                ? `تغيير كلمة المرور`
                : "Change Password"}
            </Link>
            <hr />
            <button
              className={`text-red-400 text-left cursor-pointer ${
                currentLanguage === "ar" && "text-right"
              }`}
              onClick={handleLogout}
            >
              {currentLanguage === "ar" ? `تسجيل الخروج` : "LogOut"}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {["/addlisting", "/dashboard", "/messages", "/favorites"].map(
          (path, index) => {
            const labels = ["Add New", "My Listing", "Messages", "Favorites"];
            const isActive = location.pathname === path;

            return (
              <Link
                key={index}
                to={path}
                className={`relative text-gray-800 text-lg font-medium pb-1 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-[#B80200]"
                    : "hover:border-b-2 hover:border-[#B80200]"
                }`}
              >
                <Translate text={labels[index]} />
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
};

export default Navbar;