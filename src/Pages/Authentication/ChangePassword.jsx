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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    reset: resetForgotPassword,
    control,
    formState: { errors: forgotPasswordErrors },
  } = useForm({ defaultValues: { email: "" } });

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
      toast.success("Check your email for password reset instructions!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error("Failed to send email. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto">
        <div className="bg-white p-6 rounded-lg w-[90%] sm:w-96 z-50">
          <h2 className="text-lg font-bold mb-4">
            <Translate text={"Reset Password"} />
          </h2>
          <form onSubmit={handleForgotPasswordSubmit(handleForgotPassword)}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => {
                const handlePhoneChange = (value, countryData) => {
                  // Ensure country code is always present and only phone number is editable
                  const countryCode = `+${countryData.dialCode}`;
                  const phoneNumber = value.replace(countryCode, "").trim(); // Remove country code part
                  field.onChange(phoneNumber); // Update the phone number field
                };

                return (
                  <div className="w-full flex items-center gap-2">
                    {/* Phone Input */}
                    <PhoneInput
                      country={"sy"} // Default to Syria (or any other country)
                      value={field.value ? `+${field.value}` : ""} // Display country code
                      onChange={handlePhoneChange} // Update value on change
                      inputClass="!w-full !p-3 !pl-14 !border !rounded-lg" // Styling for phone input
                      containerClass="!w-full" // Full width for container
                      buttonClass="!bg-white !border-r !rounded-l-lg" // Keep flag visible and clickable
                      dropdownClass="!bg-white !text-black" // Styling for dropdown
                      disableDropdown={false} // Allow changing country
                      enableSearch
                      // onlyCountries={["sy", "us", "gb", "de", "fr"]} // Restrict countries (optional)
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
    </div>
  );
};

export default ChangePassword;
