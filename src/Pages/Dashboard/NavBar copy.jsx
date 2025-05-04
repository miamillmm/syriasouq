"use client"

import { useLocation } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useContext, useState, useEffect } from "react"
import Translate from "../../utils/Translate"
import { AuthContext } from "../../context/AuthContext" // Adjust the path as needed
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { i18n, t } = useTranslation() // Destructure t for manual translation
  const currentLanguage = i18n.language

  // Use AuthContext to get user and logout function
  const { user, logout } = useContext(AuthContext)
  console.log(user)

  const handleLogout = () => {
    logout() // Use logout from AuthContext
    navigate("/", { replace: true })
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProfileMenu])

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Profile and Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Profile Circle with Username and Phone */}
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full border-2 border-gray-400 bg-gray-200 shadow-xl flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setShowProfileMenu(!showProfileMenu)
              }}
            >
              <span className="font-bold">{user?.username?.slice(0, 1).toUpperCase()}</span>
            </div>
            {/* Display Username and Phone Number */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{user?.username || "N/A"}</span>
              <span className="text-sm text-gray-600">{user?.phone || "N/A"}</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <div
            className={`absolute top-16 ${currentLanguage === "ar" ? "right-4" : "left-4"} min-w-60 p-3 rounded-lg shadow-lg bg-slate-200 z-[99999] flex flex-col gap-2 transition-all`}
            onClick={(e) => e.stopPropagation()}
          >
            <p>{user?.email || user?.phone}</p>
            <hr />
            <Link to={"/change-password"}>{currentLanguage === "ar" ? "تغيير كلمة المرور" : "Change Password"}</Link>
            <hr />
            <button
              className={`text-red-400 cursor-pointer ${currentLanguage === "ar" ? "text-right" : "text-left"}`}
              onClick={handleLogout}
            >
              {currentLanguage === "ar" ? "تسجيل الخروج" : "LogOut"}
            </button>
          </div>
        )}

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6 mt-0">
          {["/addlisting", "/dashboard", "/messages", "/favorites"].map((path, index) => {
            const labels = ["Add New", "My Listing", "Messages", "Favorites"]
            const isActive = location.pathname === path

            return (
              <Link
                key={index}
                to={path}
                className={`relative text-gray-800 text-lg font-medium pb-1 transition duration-300 ${
                  isActive ? "border-b-2 border-[#B80200]" : "hover:border-b-2 hover:border-[#B80200]"
                }`}
              >
                {labels[index] === "Add New" ? (
                  currentLanguage === "ar" ? (
                    "أضافة إعلان جديد"
                  ) : (
                    "Add New"
                  )
                ) : (
                  <Translate text={labels[index]} />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-md p-4 transition-all">
          <div className="flex flex-col gap-4">
            {["/addlisting", "/dashboard", "/messages", "/favorites"].map((path, index) => {
              const labels = ["Add New", "My Listing", "Messages", "Favorites"]
              const isActive = location.pathname === path

              return (
                <Link
                  key={index}
                  to={path}
                  className={`relative text-gray-800 text-lg font-medium py-2 transition duration-300 ${
                    isActive ? "text-[#B80200] font-semibold" : "hover:text-[#B80200]"
                  } ${currentLanguage === "ar" ? "text-right" : "text-left"}`}
                >
                  {labels[index] === "Add New" ? (
                    currentLanguage === "ar" ? (
                      "أضافة إعلان جديد"
                    ) : (
                      "Add New"
                    )
                  ) : (
                    <Translate text={labels[index]} />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
