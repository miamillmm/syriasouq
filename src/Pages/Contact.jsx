import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import { NavLink } from "react-router";
import cover from "../assets/bg-image/cover-2.jpg";

const Contact = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-72 pt-28"
        style={{
          backgroundImage: `url(${cover})`,
          // backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#304455",
            opacity: 0.85,
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-18 h-full flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.04em] pt-10">
            <span className="text-red-500 text-[38px] sm:text-[58px]">
              Contact
            </span>{" "}
            us
          </h1>

          {/* Breadcrumb */}
          <div className="bg-white/10 backdrop-blur-none w-full sm:w-1/6 flex justify-center  p-4 rounded-tr-lg rounded-tl-lg mt-auto">
            <nav className="flex items-center text-sm text-gray-300 space-x-2">
              <NavLink
                to="/"
                className="hover:text-red-500 duration-500 transition-all ease-in-out"
              >
                Home
              </NavLink>
              <MdOutlineKeyboardArrowRight />
              <span className="text-white">Contact</span>
            </nav>
          </div>
        </div>
      </div>
      {/* content  */}
      <div className="container mx-auto px-4 sm:px-8 md:px-18 grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        {/* Left Side */}
        <div className="space-y-2 text-center md:text-left">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer">
            How Can We Help?
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352]">
            We Are Ready to Help
          </h2>
          <p className="text-gray-500">
            Please fill out the contact form and allow us to help you with any
            problem you may be facing on the website – SyriaSouq
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="bg-[#374b5c] z-10 shadow-lg rounded-2xl w-full p-6 sm:p-8 mt-10 md:-mt-30">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
            Send a Message
          </h2>
          <form className="space-y-4 sm:space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                name="make"
                placeholder="Name *"
                className="w-full rounded-lg border-gray-100/50  px-4 py-3 text-white bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="make"
                placeholder="Email *"
                className="w-full rounded-lg border-gray-100/50  px-4 py-3  text-white border-1 bg-transparent focus:outline-none"
              />
              <input
                type="text"
                name="make"
                placeholder="Phone"
                className="w-full rounded-lg border-gray-100/50  px-4 py-3 text-white bg-transparent focus:outline-none"
              />
            </div>
            <textarea
              // className="p-4 w-full rouned-md border-1 border-gray-100/50"
              className="w-full h-32 p-4 border border-gray-100/50 rounded-lg focus:outline-none placeholder-gray-100/50"
              placeholder="Message *"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-2/3 bg-red-500 hover:bg-red-500 py-3 sm:py-4 rounded-lg text-[#314352] text-lg cursor-pointer flex justify-between items-center px-12"
              >
                Send Message{" "}
                <span>
                  <TiArrowRight className="text-2xl text-gray-600" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <section className="bg-[#F8FAFD] py-12">
        <div className="relative max-w-6xl mx-auto bg-[#FDFDFE] rounded-lg p-8 text-center space-y-5">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-400 w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#FDFDFE]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75v3.75A2.25 2.25 0 0114.25 18.75H9.75A2.25 2.25 0 017.5 16.5v-3.75M3 8.25l9-6 9 6m-18 0v9a2.25 2.25 0 002.25 2.25H18.75A2.25 2.25 0 0021 17.25V8.25M3 8.25l9 6m9-6l-9 6"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mt-5">
            Write to Us
          </h2>
          <p className="text-gray-600 mt-2">syriasouq.shop@outlook.com</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
