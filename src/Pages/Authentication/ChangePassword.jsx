"use client"

import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import cover from "../../assets/service/cover.jpg";
import Translate from "../../utils/Translate";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    reset: resetForgotPassword,
    control,
    formState: { errors: forgotPasswordErrors },
  } = useForm({ defaultValues: { phone: "" } });

  const handleForgotPassword = async (data) => {
    console.log("Forgot Password Data:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { phone: data.phone } // Phone number includes country code
      );
      console.log("Forgot Password Response:", response.data);
      resetForgotPassword();
      setIsModalOpen(false);
      toast.success("Check your WhatsApp for the OTP!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate(`/reset-password?phone=${encodeURIComponent(data.phone)}`);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again.",
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
    navigate(-1);
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
              <Translate text={"Request OTP"} />
            </h2>
            <form onSubmit={handleForgotPasswordSubmit(handleForgotPassword)}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => {
                  return (
                    <div className="w-full flex items-center gap-2">
                      <PhoneInput
                        country={"sy"}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        inputClass="!w-full !p-3 !pl-14 !border !rounded-lg"
                        containerClass="!w-full"
                        buttonClass="!bg-white !border-r !rounded-l-lg"
                        dropdownClass="!bg-white !text-black"
                        disableDropdown={false}
                        enableSearch
                      />
                    </div>
                  );
                }}
              />
              {forgotPasswordErrors.phone && (
                <p className="text-red-500 text-sm">
                  {forgotPasswordErrors.phone.message}
                </p>
              )}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
                >
                  <Translate text={"Send OTP"} />
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

export default ChangePassword;