import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import cover from "../assets/bg-image/cover-2.jpg";
import { useTranslation } from "react-i18next";
import Translate from "../utils/Translate";
import axios from "axios"; // Import axios for API requests

const Contact = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/contact/send",
        formData
      );
      setStatusMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form after submission
    } catch (error) {
      setStatusMessage("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-72 pt-28"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundPosition: "center 30%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#304455", opacity: 0.85 }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-18 h-full flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.04em] pt-10">
            <span className="text-red-500 text-[38px] sm:text-[58px]">
              <Translate text={"Contact"} />
            </span>{" "}
            <Translate text={"us"} />
          </h1>
        </div>
      </div>
      {/* content  */}
      <div className="container mx-auto px-4 sm:px-8 md:px-18 grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        {/* Left Side */}
        <div className="space-y-2 text-center md:text-left">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer">
            <Translate text={"How Can We Help?"} />
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352]">
            <Translate text={"We Are Ready to Help"} />
          </h2>
          <p className="text-gray-500">
            <Translate
              text={`Please fill out the contact form and allow us to help you with any problem you may be facing on the website – SyriaSouq`}
            />
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="bg-[#374b5c] z-10 shadow-lg rounded-2xl w-full p-6 sm:p-8 mt-10 md:-mt-30">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
            <Translate text={"Send a Message"} />
          </h2>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={currentLanguage === "ar" ? "اسم *" : "Name *"}
                className="w-full rounded-lg border-gray-100/50  px-4 py-3 text-white bg-transparent focus:outline-none"
                required
              />
            </div>
            <div className="flex grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={
                  currentLanguage === "ar" ? "بريد إلكتروني *" : "Email *"
                }
                className="w-full rounded-lg border-gray-100/50  px-4 py-3  text-white border-1 bg-transparent focus:outline-none"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={currentLanguage === "ar" ? "هاتف" : "Phone"}
                className="w-full rounded-lg border-gray-100/50  px-4 py-3 text-white bg-transparent focus:outline-none"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-32 p-4 border border-gray-100/50 rounded-lg focus:outline-none placeholder-gray-100/50 text-white"
              placeholder="Message *"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-2/3 bg-red-500 hover:bg-red-500 py-3 sm:py-4 rounded-lg text-[#314352] text-lg cursor-pointer flex justify-between items-center px-12 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Translate text={"Send Message"} />{" "}
                    <TiArrowRight className="text-2xl text-gray-600" />
                  </>
                )}
              </button>
            </div>
            {statusMessage && (
              <p className="text-center text-red-500 mt-4">{statusMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
