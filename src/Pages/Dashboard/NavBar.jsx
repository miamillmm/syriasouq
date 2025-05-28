import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import Translate from "../../utils/Translate";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  // Use AuthContext to get user, logout, and fetchUserData
  const { user, logout, fetchUserData } = useContext(AuthContext);
  console.log(user)
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError(
        currentLanguage === "ar"
          ? "يرجى اختيار صورة"
          : "Please select an image"
      );
      return;
    }

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setError(
        currentLanguage === "ar"
          ? "يرجى تحميل صورة فقط"
          : "Please upload an image only"
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError(
        currentLanguage === "ar"
          ? "حجم الصورة يجب أن يكون أقل من 5 ميغابايت"
          : "Image size must be less than 5MB"
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = user.jwt // Assuming JWT is stored in localStorage
      formData.append("jwt", token); // Append JWT to formData

      // const res = await axios.post("/api/auth/upload-image", formData, {
      console.log(token)
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(
        currentLanguage === "ar"
          ? "تم تحميل الصورة بنجاح"
          : "Image uploaded successfully"
      );
      setError("");
      // fetchUserData(user._id); // Refresh user data to update profileImage
      setTimeout(() => {
        setShowProfileMenu(false);
        setSuccess("");
      }, 2000); // Close dropdown after 2 seconds
    } catch (err) {
      setError(
        currentLanguage === "ar"
          ? "فشل تحميل الصورة. حاول مرة أخرى."
          : "Failed to upload image. Please try again."
      );
      console.error("Error uploading image:", err);
    }
  };

  return (
    <nav className="p-4">
      <div className="flex items-center gap-6 mb-5 relative w-fit">
        {/* Profile Circle with Username and Phone */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-gray-400 shadow-xl flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {user?.profileImage ? (
              <img
                // src={`http://localhost:5001/${user.profileImage}`}
                src={`https://api.syriasouq.com${user.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold">
                {user?.username?.slice(0, 1).toUpperCase()}
              </span>
            )}
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
            className={`absolute top-10 ${currentLanguage === "ar" ? "right-0" : "left-0"} min-w-60 p-3 rounded-lg shadow-lg bg-slate-200 z-[99999] flex flex-col gap-2 transition-all`}
          >
            <p>{user?.email || user?.phone}</p>
            <hr />
            <Link to={"/change-password"}>
              {currentLanguage === "ar" ? "تغيير كلمة المرور" : "Change Password"}
            </Link>
            <hr />
            {/* Upload Profile Image */}
            <div className="flex flex-col gap-1">
              <label
                className={`text-sm ${currentLanguage === "ar" ? "text-right" : "text-left"}`}
              >
                {currentLanguage === "ar" ? "تحميل صورة الملف الشخصي" : "Upload Profile Image"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
            </div>
            <hr />
            <button
              className={`text-red-400 cursor-pointer ${currentLanguage === "ar" ? "text-right" : "text-left"}`}
              onClick={handleLogout}
            >
              {currentLanguage === "ar" ? "تسجيل الخروج" : "LogOut"}
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
                {labels[index] === "Add New"
                  ? currentLanguage === "ar"
                    ? "أضافة إعلان جديد"
                    : "Add New"
                  : <Translate text={labels[index]} />}
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
};

export default Navbar;