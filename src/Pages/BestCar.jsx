// import React from "react";
// import { IoIosGitCompare } from "react-icons/io";
import flag from "../assets/flag/syriaflag.jpg";
import img1 from "../assets/icon/service_1.png";
import img2 from "../assets/icon/service_2.png";
import img3 from "../assets/icon/service_3.png";
import img4 from "../assets/icon/service_4.png";

const BestCar = () => {
  return (
    <div
      className="relative px-6 md:px-26 py-16 mb-16 flex justify-center h-auto"
      style={{
        backgroundImage: `url(${flag})`,
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
      {/* content  */}
      <div className="z-10 w-full">
        <div className="md:w-2/3 mx-auto text-center mb-14">
          {/* <button className="text-[12px] md:text-[14px] font-[400] text-white bg-[#374b5c] py-2 px-4 rounded cursor-pointer">
            Explore the best car listings
          </button> */}
          <div className="text-white">
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-[700] mb-4 tracking-[-0.05em]">
              Everything <span className="text-red-500">you need</span>
              <br />
              in <span className="text-red-500">SyriaSouq</span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 w-full">
          <div className="w-full h-auto bg-[#374b5c] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img1} alt="image-1" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              Huge cars inventory
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              There are hundreds of options
            </p>
          </div>
          <div className="w-full h-auto bg-[#374b5c] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img2} alt="image-2" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              A Trusted Syrian Website
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              Syrian owned website for the people
            </p>
          </div>
          <div className="w-full h-auto bg-[#374b5c] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img3} alt="image-3" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              Account protected
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              To post an advertisement each account is checked through safety &
              security
            </p>
          </div>
          <div className="w-full h-auto bg-[#374b5c] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img4} alt="image-4" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              Transactions Seller to Client
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              Easy transactions and communication between client & seller
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCar;
