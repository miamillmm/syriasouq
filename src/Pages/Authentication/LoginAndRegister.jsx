import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import cover from "../../assets/service/cover.jpg";
import Translate from "../../utils/Translate";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SyrianFlag from "../../assets/flag/syria-flag.png";

// Import Google Fonts for Arabic
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
  .react-tel-input .flag.sy {
    background-image: url(${SyrianFlag}) !important;
    background-size: cover !important;
    background-position: center !important;
    width: 24px !important;
    height: 16px !important;
  }
  .react-tel-input .country-list {
    max-height: 200px !important;
    overflow-y: auto !important;
    background: white !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  }
  .arabic {
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    text-align: right;
  }
  .arabic .react-tel-input .selected-flag {
    padding-right: 0 !important;
    padding-left: 10px !important;
  }
  .arabic .react-tel-input .country-list {
    text-align: right !important;
  }
`;

const LoginAndRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    control: loginControl,
    formState: { errors: loginErrors },
  } = useForm({ defaultValues: { phone: "", password: "" } });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    reset: resetRegister,
    control: registerControl,
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
    data.email = data.email.toLowerCase();
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
    data.email = data.email.toLowerCase();
    console.log("Register Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );

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
    data.email = data.email.toLowerCase();
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    focus: { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.2)" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <style>{styles}</style>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#304455] opacity-90"></div>
      <motion.div
        className={`bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[28rem] md:w-[32rem] z-10 ${
          currentLanguage === "ar" ? "arabic" : ""
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex justify-center mb-6 gap-8">
          <motion.button
            onClick={() => setActiveTab("login")}
            className={`pb-2 text-lg font-semibold ${
              activeTab === "login"
                ? "border-b-4 border-red-500 text-red-500"
                : "text-gray-500 hover:text-gray-700"
            } ${currentLanguage === "ar" ? "font-['Tajawal']" : ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentLanguage === "ar" ? "الدخول" : "Login"}
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("register")}
            className={`pb-2 text-lg font-semibold ${
              activeTab === "register"
                ? "border-b-4 border-red-500 text-red-500"
                : "text-gray-500 hover:text-gray-700"
            } ${currentLanguage === "ar" ? "font-['Tajawal']" : ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentLanguage === "ar" ? "التسجيل" : "Register"}
          </motion.button>
        </div>
        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-5">
            <input
              {...loginRegister("email")}
              placeholder={
                currentLanguage === "ar"
                  ? "البريد الإلكتروني أو اسم المستخدم"
                  : "Email or Username"
              }
              className="w-full p-3 border rounded-lg"
              type="hidden"
            />
            {loginErrors.email && (
              <p className="text-red-500 text-sm">{loginErrors.email.message}</p>
            )}

            <Controller
              name="phone"
              control={loginControl}
              rules={{ required: currentLanguage === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required" }}
              render={({ field }) => {
                const handlePhoneChange = (value, countryData) => {
                  const countryCode = `+${countryData.dialCode}`;
                  const phoneNumber = value.replace(countryCode, "").trim();
                  field.onChange(phoneNumber);
                };

                return (
                  <div className="w-full flex items-center gap-2">
                    <PhoneInput
                      country={"sy"}
                      value={field.value ? `+${field.value}` : ""}
                      onChange={handlePhoneChange}
                      inputClass={`!w-full !p-3 !border !rounded-lg !border-gray-300 focus:!border-red-500 focus:!ring-2 focus:!ring-red-200 ${
                        currentLanguage === "ar" ? "!pr-14 !pl-4" : "!pl-14"
                      }`}
                      containerClass="!w-full"
                      buttonClass="!bg-white !border !rounded-l-lg"
                      dropdownClass="!bg-white !text-black !rounded-lg !shadow-lg"
                      disableDropdown={false}
                      enableSearch
                      specialLabel={false}
                      countryCodeEditable={false}
                    />
                  </div>
                );
              }}
            />
            {loginErrors.phone && (
              <p className="text-red-500 text-sm">{loginErrors.phone.message}</p>
            )}

            <motion.div
              className="relative w-full"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
            >
              <input
                {...loginRegister("password", {
                  required: currentLanguage === "ar" ? "كلمة المرور مطلوبة" : "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      currentLanguage === "ar"
                        ? "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير على الأقل، وأن تكون بطول 6 أحرف على الأقل"
                        : "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                  },
                })}
                type={showLoginPassword ? "text" : "password"}
                placeholder={currentLanguage === "ar" ? "كلمة المرور" : "Password"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />
              <motion.button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ${
                  currentLanguage === "ar" ? "left-3" : "right-3"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </motion.div>
            {loginErrors.password && (
              <p className="text-red-500 text-sm">{loginErrors.password.message}</p>
            )}
            <Link
              to={"/change-password"}
              className="text-red-500 hover:text-red-600 text-sm block transition-colors"
            >
              <Translate text={"Forgot Password?"} />
            </Link>
            <motion.button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Translate text={"Login"} />
            </motion.button>
          </form>
        ) : (
          <form
            onSubmit={handleRegisterSubmit(handleRegister)}
            className="space-y-5"
          >
            <motion.input
              {...registerRegister("username", {
                required:
                  currentLanguage === "ar"
                    ? "اسم المستخدم مطلوب"
                    : "Username is required",
              })}
              placeholder={
                currentLanguage === "ar" ? "اسم المستخدم" : "Username"
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
            />
            {registerErrors.username && (
              <p className="text-red-500 text-sm">
                {registerErrors.username.message}
              </p>
            )}
            <input
              type="hidden"
              {...registerRegister("email", {
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: currentLanguage === "ar" ? "صيغة البريد الإلكتروني غير صالحة" : "Invalid email format",
                },
              })}
              placeholder={
                currentLanguage === "ar" ? "بريد إلكتروني" : "E-mail"
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
            {registerErrors.email && (
              <p className="text-red-500 text-sm">
                {registerErrors.email.message}
              </p>
            )}

            <Controller
              name="phone"
              control={registerControl}
              rules={{
                required:
                  currentLanguage === "ar"
                    ? "رقم الهاتف مطلوب"
                    : "Phone number is required",
              }}
              render={({ field }) => {
                const handlePhoneChange = (value, countryData) => {
                  const countryCode = `+${countryData.dialCode}`;
                  const phoneNumber = value.replace(countryCode, "").trim();
                  field.onChange(phoneNumber);
                };

                return (
                  <div className="w-full flex items-center gap-2">
                    <PhoneInput
                      country={"sy"}
                      value={field.value ? `+${field.value}` : ""}
                      onChange={handlePhoneChange}
                      inputClass={`!w-full !p-3 !border !rounded-lg !border-gray-300 focus:!border-red-500 focus:!ring-2 focus:!ring-red-200 ${
                        currentLanguage === "ar" ? "!pr-14 !pl-4" : "!pl-14"
                      }`}
                      containerClass="!w-full"
                      buttonClass="!bg-white !border !rounded-l-lg"
                      dropdownClass="!bg-white !text-black !rounded-lg !shadow-lg"
                      disableDropdown={false}
                      enableSearch
                      specialLabel={false}
                      countryCodeEditable={false}
                    />
                  </div>
                );
              }}
            />
            {registerErrors.phone && (
              <p className="text-red-500 text-sm">
                {registerErrors.phone.message}
              </p>
            )}

            <motion.div
              className="relative w-full"
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
            >
              <input
                {...registerRegister("password", {
                  required:
                    currentLanguage === "ar"
                      ? "كلمة المرور مطلوبة"
                      : "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      currentLanguage === "ar"
                        ? "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير على الأقل، وأن تكون بطول 6 أحرف على الأقل"
                        : "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                  },
                })}
                type={showRegisterPassword ? "text" : "password"}
                placeholder={currentLanguage === "ar" ? "كلمة المرور" : "Password"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />
              <motion.button
                type="button"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ${
                  currentLanguage === "ar" ? "left-3" : "right-3"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </motion.div>
            {registerErrors.password && (
              <p className="text-red-500 text-sm">
                {registerErrors.password.message}
              </p>
            )}
            <motion.button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {currentLanguage === "ar" ? "إنشاء حساب" : "Register"}
            </motion.button>
          </form>
        )}
      </motion.div>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-white p-6 rounded-2xl w-[90%] sm:w-[28rem] shadow-2xl z-50 ${
              currentLanguage === "ar" ? "arabic" : ""
            }`}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            dir={currentLanguage === "ar" ? "rtl" : "ltr"}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              <Translate text={"Reset Password"} />
            </h2>
            <form
              onSubmit={handleForgotPasswordSubmit(handleForgotPassword)}
              className="space-y-4"
            >
              <motion.input
                {...forgotPasswordRegister("email", {
                  required: currentLanguage === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: currentLanguage === "ar" ? "صيغة البريد الإلكتروني غير صالحة" : "Invalid email format",
                  },
                })}
                type="email"
                placeholder={currentLanguage === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
              />
              {forgotPasswordErrors.email && (
                <p className="text-red-500 text-sm">
                  {forgotPasswordErrors.email.message}
                </p>
              )}
              <div className="flex justify-between mt-4 gap-4">
                <motion.button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Translate text={"Send"} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Translate text={"Cancel"} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LoginAndRegister;