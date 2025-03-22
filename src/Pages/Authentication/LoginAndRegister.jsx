import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import cover from "../../assets/service/cover.jpg";
import Translate from "../../utils/Translate";
import { useTranslation } from "react-i18next";

const LoginAndRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    formState: { errors: loginErrors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    reset: resetRegister,
    formState: { errors: registerErrors },
  } = useForm({
    defaultValues: { username: "", email: "", phone: "", password: "" },
  });

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    reset: resetForgotPassword,
    formState: { errors: forgotPasswordErrors },
  } = useForm({ defaultValues: { email: "" } });

  const handleLogin = async (data) => {
    console.log("Login Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
      );

      if (!response?.data?.message) {
        console.log("Login Response:", response.data);
        const data = response.data;
        localStorage.setItem("SyriaSouq-auth", JSON.stringify(data));
        resetLogin();
        navigate("/dashboard", { replace: true });
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error("Login Error:", error);
    }
  };

  const handleRegister = async (data) => {
    console.log("Register Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );

      console.log(data);

      if (!response?.data?.message) {
        console.log("Register Response:", response.data);
        const data = response.data;
        localStorage.setItem("SyriaSouq-auth", JSON.stringify(data));
        resetRegister();
        navigate("/dashboard", { replace: true });
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error("Register Error:", error.response.data.message);
    }
  };

  const handleForgotPassword = async (data) => {
    console.log("Forgot Password Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        data
      );
      console.log("Forgot Password Response:", response.data);
      resetForgotPassword();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Forgot Password Error:", error);
    }
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="absolute inset-0 bg-[#304455] opacity-85"></div>
      <div className="bg-white shadow-md rounded-lg p-8 w-[90%] sm:w-96 z-10">
        <div className="flex justify-center mb-6 gap-5">
          <button
            onClick={() => setActiveTab("login")}
            className={
              activeTab === "login"
                ? "border-b-4 border-red-400 cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }
          >
            {currentLanguage === "ar" ? "الدخول" : "Login"}
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={
              activeTab === "register"
                ? "border-b-4 border-red-400 cursor-pointer"
                : "text-gray-500 cursor-pointer"
            }
          >
            {currentLanguage === "ar" ? "التسجيل" : "Register"}
          </button>
        </div>
        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4">
            <input
              {...loginRegister("email", { required: "Email is required" })}
              placeholder={
                currentLanguage == "ar"
                  ? "البريد الإلكتروني أو اسم المستخدم"
                  : "Email or Username"
              }
              className="w-full p-3 border rounded-lg"
            />
            {loginErrors.email && (
              <p className="text-red-500 text-sm">
                {loginErrors.email.message}
              </p>
            )}
            <input
              {...loginRegister("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                },
              })}
              type="password"
              placeholder={currentLanguage == "ar" ? "كلمة المرور" : "Password"}
              className="w-full p-3 border rounded-lg"
            />
            {loginErrors.password && (
              <p className="text-red-500 text-sm">
                {loginErrors.password.message}
              </p>
            )}
            {/* <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-red-400 text-sm cursor-pointer"
            >
              <Translate text={"Forgot Password?"} />
            </button> */}
            <Link
              to={"/change-password"}
              className="text-red-400 text-sm cursor-pointer block"
            >
              <Translate text={"Forgot Password?"} />
            </Link>
            <button
              type="submit"
              className="w-full bg-red-500 py-3 rounded-lg cursor-pointer"
            >
              <Translate text={"Login"} />
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleRegisterSubmit(handleRegister)}
            className="space-y-4"
          >
            <input
              {...registerRegister("username", {
                required: "Username is required",
              })}
              placeholder={
                currentLanguage === "ar" ? "اسم المستخدم" : "Username"
              }
              className="w-full p-3 border rounded-lg"
            />
            {registerErrors.username && (
              <p className="text-red-500 text-sm">
                {registerErrors.username.message}
              </p>
            )}
            <input
              {...registerRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder={
                currentLanguage === "ar" ? "بريد إلكتروني" : "E-mail"
              }
              className="w-full p-3 border rounded-lg"
            />
            {registerErrors.email && (
              <p className="text-red-500 text-sm">
                {registerErrors.email.message}
              </p>
            )}
            <input
              {...registerRegister("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numeric values allowed",
                },
              })}
              placeholder={currentLanguage === "ar" ? "هاتف" : "Phone"}
              className="w-full p-3 border rounded-lg"
            />
            {registerErrors.phone && (
              <p className="text-red-500 text-sm">
                {registerErrors.phone.message}
              </p>
            )}
            <input
              {...registerRegister("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                },
              })}
              type="password"
              placeholder={currentLanguage == "ar" ? "كلمة المرور" : "Password"}
              className="w-full p-3 border rounded-lg"
            />
            {registerErrors.password && (
              <p className="text-red-500 text-sm">
                {registerErrors.password.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-red-500 py-3 rounded-lg cursor-pointer"
            >
              <Translate text={"Register"} />
            </button>
          </form>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-96 z-50">
            <h2 className="text-lg font-bold mb-4">
              <Translate text={"Reset Password"} />
            </h2>
            <form onSubmit={handleForgotPasswordSubmit(handleForgotPassword)}>
              <input
                {...forgotPasswordRegister("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg"
              />
              {forgotPasswordErrors.email && (
                <p className="text-red-500 text-sm">
                  {forgotPasswordErrors.email.message}
                </p>
              )}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
                >
                  <Translate text={"Send"} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                >
                  <Translate text={"Cancel"} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAndRegister;
