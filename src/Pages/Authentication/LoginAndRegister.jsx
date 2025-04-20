import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import cover from "../../assets/service/cover.jpg";
import Translate from "../../utils/Translate";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles
import SyrianFlag from "../../assets/flag/syria-flag.png"; // Import the new Syrian flag

// Custom CSS to override the Syrian flag
const styles = `
  .react-tel-input .flag.sy {
    background-image: url(${SyrianFlag}) !important;
    background-size: cover !important;
    background-position: center !important;
    width: 24px !important;
    height: 16px !important;
  }
`;

const LoginAndRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    data.email = data.email.toLowerCase(); // Convert email to lowercase
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
    data.email = data.email.toLowerCase(); // Convert email to lowercase
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
    data.email = data.email.toLowerCase(); // Convert email to lowercase
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

      <style>{styles}</style>
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
              {...loginRegister("email")}
              placeholder={
                currentLanguage == "ar"
                  ? "البريد الإلكتروني أو اسم المستخدم"
                  : "Email or Username"
              }
              className="w-full p-3 border rounded-lg"
              type="hidden"
            />
            {loginErrors.email && (
              <p className="text-red-500 text-sm">
                {loginErrors.email.message}
              </p>
            )}

            <Controller
              name="phone"
              control={loginControl}
              rules={{ required: "Phone number is required" }}
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
                      inputClass="!w-full !p-3 !pl-14 !border !rounded-lg"
                      containerClass="!w-full"
                      buttonClass="!bg-white !border-r !rounded-l-lg"
                      dropdownClass="!bg-white !text-black"
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
              <p className="text-red-500 text-sm">
                {loginErrors.phone.message}
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
                required:
                  currentLanguage === "ar"
                    ? "اسم المستخدم مطلوب"
                    : "Username is required",
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
              type="hidden"
              {...registerRegister("email", {
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format",
                },
              })}
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
                      inputClass="!w-full !p-3 !pl-14 !border !rounded-lg"
                      containerClass="!w-full"
                      buttonClass="!bg-white !border-r !rounded-l-lg"
                      dropdownClass="!bg-white !text-black"
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

            <input
              {...registerRegister("password", {
                required:
                  currentLanguage === "ar"
                    ? `كلمة المرور مطلوبة`
                    : `Password is required`,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    currentLanguage === "ar"
                      ? `يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير على الأقل، وأن تكون بطول 6 أحرف على الأقل`
                      : `Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long`,
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
{
                currentLanguage === "ar" ? " إنشاء حساب" : "Register"
              }           
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