import React from "react";
import { IoIosAt } from "react-icons/io";
import { TiArrowRight } from "react-icons/ti";
// import bgImg from "../assets/bg-image/car_bg.jpg";
import bgImg from "../assets/bg-image/car_bg-1.jpeg";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";

const Subscribe = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  return (
    <div
      className="relative px-4 md:px-26 py-16 flex justify-center h-screen"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#304455",
          opacity: 0.7,
        }}
      ></div>
      <div className="z-10 w-full">
        <div className="md:w-2/3 mx-auto text-center mb-8 md:mb-14 space-y-5 md:space-y-7">
          <button className="text-sm md:text-[14px] font-[400] text-white bg-[#374b5c] py-2 px-3 md:px-4 rounded cursor-pointer">
            <Translate text={"Subscribe"} />
          </button>
          <div className="text-white">
            <h2 className="text-xl md:text-7xl font-[700] mb-3 md:mb-4 tracking-[-0.05em]">
              <Translate text={""} />
              {currentLanguage === "ar" ? (
                <>إشترك لتلقي آخر الأخبار</>
              ) : (
                <>
                  Sign up to receive{" "}
                  <span className="text-[#B80200] block md:inline">
                    <br className="hidden md:block" /> the latest{" "}
                  </span>
                  news
                </>
              )}
            </h2>
          </div>
          <div className="text-white">
            <p className="text-base md:text-[16px] font-[400] mb-4 leading-6 md:leading-7">
              <Translate text={"All you need to know about"} />
              <br className="hidden md:block" />{" "}
              <Translate text={"everything that matters"} />
            </p>
          </div>
          <div className="w-full md:w-3/4 h-auto bg-[#374b5c] mx-auto rounded-lg md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-full md:rounded-br-full flex flex-col md:flex-row justify-between gap-4 md:gap-5 p-3">
            <div className="border border-gray-400 w-full rounded bg-[#314352] flex justify-between gap-2 p-3">
              <div className="w-10 md:w-12 bg-[#B80200] flex items-center justify-center rounded">
                <IoIosAt className="text-xl md:text-2xl text-white" />
              </div>
              <div className="flex items-center w-full">
                <input
                  className="border-none w-full text-white bg-transparent focus:outline-none"
                  type="email"
                  placeholder="Email"
                  name=""
                  id=""
                />
              </div>
            </div>

            <div className="w-full md:w-20 h-12 md:h-16 rounded-lg md:rounded-tr-full md:rounded-br-full bg-[#B80200] flex justify-center items-center cursor-pointer">
              <TiArrowRight className="text-4xl md:text-6xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
