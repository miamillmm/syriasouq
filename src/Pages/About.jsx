import React from "react";
import cover from "../assets/bg-image/cover-1.jpg";
import service1 from "../assets/service/service1.png";
import service2 from "../assets/service/service2.png";
import service3 from "../assets/service/service3.png";
import { NavLink } from "react-router";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import hand from "../assets/bg-image/hand.jpg";
import { TiArrowRight } from "react-icons/ti";
import Subscribe from "./Subscribe";

const About = () => {
  return (
    <div>
      {/* top bg  */}
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
            <span className="text-[#FF9540] text-[38px] sm:text-[58px]">About</span> SyriaSouq
          </h1>

          {/* Breadcrumb */}
          <div className="bg-white/10 backdrop-blur-none  w-1/6 flex justify-center  p-4 rounded-tr-lg rounded-tl-lg mt-auto">
            <nav className="flex items-center text-sm text-gray-300 space-x-2">
              <NavLink
                to="/"
                className="hover:text-[#ff9540] duration-500 transition-all ease-in-out"
              >
                Home
              </NavLink>
              <MdOutlineKeyboardArrowRight />
              <span className="text-white">Contact</span>
            </nav>
          </div>
        </div>
      </div>
      {/* #1 sale website  */}
      <section className="flex flex-col md:flex-row items-center bg-white gap-10 px-4 sm:px-8 lg:px-25 py-8 sm:py-15">
        {/* Image Section */}
        <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
          <img
            src={hand}
            alt="Handshake in Syrian Street"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 w-full text-center md:text-left md:ml-20 space-y-3">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer tracking-[-0.04em]">
            About us
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352] space-y-1 tracking-[-0.04em] sm:mr-10">
            The #1 Syrian Sales Website
          </h2>
          <p className="text-gray-500">
            Created by a Syrian to form a sales community that is safe, reliable
            and easy for everyone to use to their benefit. Enjoy!
          </p>

          <button
            type="submit"
            className="w-full sm:w-2/3 bg-[#374B5C] py-3 sm:py-4 rounded-lg text-[#ff9540] text-lg cursor-pointer flex justify-between items-center px-6 sm:px-12 mt-6 sm:mt-10"
          >
            Explore Listings{" "}
            <span>
              <TiArrowRight className="text-3xl text-[#ff9540]" />
            </span>
          </button>
        </div>
      </section>

      {/* best sales  */}
      <section className="bg-[#F8FAFD] py-8 sm:py-12">
        <div className="text-center mb-8">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer tracking-[-0.04em]">
            Why choose us?
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352] space-y-1 tracking-[-0.04em] sm:mr-10 leading-[1]">
            We are the best <br />
            sales platform for you
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Stat Item */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h3
              className="text-[#ff9540] text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "Monoton, sans-serif" }}
            >
              <span className="extra-font">120</span>
              <span className="text-[15px]">k</span>
            </h3>
            <p className="text-[#314352] mt-2">Listings added</p>
          </div>

          {/* Stat Item */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h3
              className="text-[#ff9540] text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "Monoton, sans-serif" }}
            >
              <span className="extra-font">2.7</span>
              <span className="text-[15px]">m</span>
            </h3>
            <p className="text-[#314352] mt-2">Daily searches</p>
          </div>

          {/* Stat Item */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-[#ff9540] text-3xl sm:text-4xl font-bold">
              <span className="extra-font">20k</span>
              <span className="text-[20px]">+</span>
            </h3>
            <p className="text-[#314352] mt-2">Registered users</p>
          </div>

          {/* Stat Item */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-[#ff9540] text-3xl sm:text-4xl font-bold ">
              <span className="extra-font">50</span>
              <span className="text-[20px]">+</span>
            </h3>
            <p className="text-[#314352] mt-2">Quality awards</p>
          </div>
        </div>
      </section>

      {/* how syria works section  */}
      <section className="bg-gray-50 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer tracking-[-0.04em]">
            We Can Assist You Further
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352] space-y-1 tracking-[-0.04em] sm:mr-10 leading-[1]">
            How SyriaSouq works
          </h2>
        </div>

        {/* Steps Section */}
        <div className="relative flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full max-w-5xl mx-auto space-y-12 lg:space-y-0">
          {/* Horizontal Dashed Line */}
          <div className="absolute inset-0 flex items-center justify-between w-full">
            <div className="w-full flex items-center">
              <div className="w-2/3 mx-auto h-px border-dashed border-t-2 border-[#FF9540]"></div>
            </div>
          </div>

          {/* Step Cards */}
          <div className="relative flex flex-col lg:flex-row justify-between items-center w-full space-y-12 lg:space-y-0">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-4 ">
              {/* Circle SVG */}
              <div className="flex items-center justify-center w-16 h-16">
                <img src={service1} alt="Search Icon" className="w-full h-full" />
              </div>

              {/* Icon */}
              <div className="pt-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="27"
                    height="27"
                    rx="13.5"
                    fill="#FDFDFE"
                    stroke="#F17851"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* Step Title */}
              <h3 className="text-2xl tracking-[-0.04em] font-bold text-[#314352]">Search</h3>

              {/* Step Description */}
              <p className="text-gray-600 text-[16px]">
                Use the Search bar and the icons to find what you are looking
                for.
              </p>
            </div>

            {/* Right Arrow */}
            <div className="hidden lg:flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="25"
                viewBox="0 0 16 25"
                fill="none"
              >
                <path
                  d="M1.11914 23.7492C17.1613 9.08347 19.7173 17.7527 2.72758 1.96159"
                  stroke="#F17851"
                  strokeWidth="3"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Circle SVG */}
              <div className="flex items-center justify-center w-16 h-16">
                <img src={service2} alt="Find Icon" className="w-full h-full" />
              </div>

              {/* Icon */}
              <div className="pt-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="27"
                    height="27"
                    rx="13.5"
                    fill="#FDFDFE"
                    stroke="#F17851"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* Step Title */}
              <h3 className="text-2xl tracking-[-0.04em] font-bold text-[#314352]">Find</h3>

              {/* Step Description */}
              <p className="text-gray-600 text-[16px]">
                Check out each brand, type and model of car you are looking for.
              </p>
            </div>

            {/* Right Arrow */}
            <div className="hidden lg:flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="25"
                viewBox="0 0 16 25"
                fill="none"
              >
                <path
                  d="M1.11914 23.7492C17.1613 9.08347 19.7173 17.7527 2.72758 1.96159"
                  stroke="#F17851"
                  strokeWidth="3"
                />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Circle SVG */}
              <div className="flex items-center justify-center w-16 h-16">
                <img src={service3} alt="Connect Icon" className="w-full h-full" />
              </div>

              {/* Icon */}
              <div className="pt-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="27"
                    height="27"
                    rx="13.5"
                    fill="#FDFDFE"
                    stroke="#F17851"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              {/* Step Title */}
              <h3 className="text-2xl tracking-[-0.04em] font-bold text-[#314352]">Connect</h3>

              {/* Step Description */}
              <p className="text-gray-600 text-[16px]">
                Connect to the seller through easy communication and get your
                car today!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="my-10">
        <Subscribe />
      </div>
    </div>
  );
};

export default About;
