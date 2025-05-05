"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import cover from "../../assets/service/cover.jpg";
import Translate from "../../utils/Translate";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Extract phone from URL
  const query = new URLSearchParams(location.search);
  const phone = query.get('phone');

  useEffect(() => {
    if (!phone) {
      toast.error("Phone number is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate('/change-password');
    }
  }, [phone, navigate]);

  const handleResetPassword = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          phone,
          otp: data.otp,
          newPassword: data.newPassword,
        }
      );
      console.log("Reset Password Response:", response.data);
      setIsModalOpen(false);
      toast.success("Password reset successfully! Please log in.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate('/login');
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to reset password. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="absolute inset-0 bg-[#304455] opacity-85"></div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-96 z-50">
            <h2 className="text-lg font-bold mb-4">
              <Translate text={"Reset Password"} />
            </h2>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  <Translate text={"OTP"} />
                </label>
                <input
                  type="text"
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "OTP must be a 6-digit number",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter the 6-digit OTP"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  <Translate text={"New Password"} />
                </label>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
                >
                  <Translate text={"Submit"} />
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
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

export default ResetPassword;