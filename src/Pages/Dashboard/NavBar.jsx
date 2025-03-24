import { useLocation } from "react-router";
import Translate from "../../utils/Translate";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
    console.log(storedUser);
    if (storedUser) {
      return setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("SyriaSouq-auth");
    navigate("/", { replace: true });
  };

  return (
    <nav className="p-4">
      <div className="flex items-center gap-6 mb-5 relative w-fit">
        <div
          className="w-10 h-10 rounded-full border-2 border-gray-400 bg-gray-200 shadow-xl flex items-center justify-center cursor-pointer"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <span className="font-bold ">
            {user?.username?.slice(0, 1).toUpperCase()}
          </span>
        </div>

        {showProfileMenu && (
          <>
            <div className="absolute top-10 left-0 min-w-60 p-3 rounded-lg shadow-lg bg-slate-200 z-[99999] flex flex-col gap-2 transition-all">
              <p>{user?.email}</p>
              <hr />
              <Link to={"/change-password"}>Change Password</Link>
              <hr />
              <button
                className="text-red-400 text-left cursor-pointer"
                onClick={handleLogout}
              >
                LogOut
              </button>
            </div>
          </>
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
