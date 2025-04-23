import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("SyriaSouq-auth")) || null
  );
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLogin = async (data, reset, currentLanguage) => {
    data.email = data.email.toLowerCase();
    console.log("Login Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
      );

      if (!response?.data?.message) {
        console.log("Login Response:", response.data);
        const userData = response.data;
        localStorage.setItem("SyriaSouq-auth", JSON.stringify(userData));
        setUser(userData);
        reset();
        toast.success(
          currentLanguage === "ar"
            ? "تم تسجيل الدخول بنجاح!"
            : "Logged in successfully!"
        );
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          (currentLanguage === "ar"
            ? "فشل تسجيل الدخول"
            : "Failed to log in")
      );
      console.error("Login Error:", error);
    }
  };

  const handleRegister = async (data, reset, currentLanguage) => {
    data.email = data.email.toLowerCase();
    console.log("Register Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );

      if (!response?.data?.message) {
        console.log("Register Response:", response.data);
        const userData = response.data;
        localStorage.setItem("SyriaSouq-auth", JSON.stringify(userData));
        setUser(userData);
        reset();
        toast.success(
          currentLanguage === "ar"
            ? "تم إنشاء الحساب بنجاح!"
            : "Account created successfully!"
        );
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          (currentLanguage === "ar"
            ? "فشل إنشاء الحساب"
            : "Failed to register")
      );
      console.error("Register Error:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("SyriaSouq-auth");
      setUser(null);
      toast.info(
        currentLanguage === "ar"
          ? "تم تسجيل الخروج"
          : "Logged out successfully"
      );
      navigate("/login-and-register", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(
        currentLanguage === "ar"
          ? "فشل تسجيل الخروج"
          : "Failed to log out"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleLogin, handleRegister, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};