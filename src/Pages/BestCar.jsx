// import React from "react";
// import { IoIosGitCompare } from "react-icons/io";
// import flag from "../assets/flag/syriaflag.jpg";
import { useTranslation } from "react-i18next";
import flag from "../assets/flag/syriaflag-1.jpeg";
import img1 from "../assets/icon/service_1.png";
import img2 from "../assets/icon/service_2.png";
import img3 from "../assets/icon/service_3.png";
import img4 from "../assets/icon/service_4.png";
import Translate from "../utils/Translate";

const BestCar = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

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
              {currentLanguage === "ar" ? (
                <>كل شئ تحتاجه موجود في سيريا سوق</>
              ) : (
                <>
                  Everything <span className="text-[#B80200]">you need</span>
                  <br />
                  in <span className="text-[#B80200]">SyriaSouq</span>
                </>
              )}
            </h1>
          </div>
          <h1
  className="hidden"
>
  A Trusted Second Hand Car Dealers in Syria
</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 w-full">
          <div className="w-full h-auto bg-[#323232fa] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img1} alt="image-1" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              {currentLanguage === "ar"
                ? "اعلانات سيارات غير محدودة"
                : "Huge cars inventory"}
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              <Translate text={"There are hundreds of options"} />
            </p>
          </div>
          <div className="w-full h-auto bg-[#323232fa] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img2} alt="image-2" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              <Translate text={"A Trusted Syrian Website"} />
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              {currentLanguage === "ar"
                ? "خدمة الجميع بلا استثناء"
                : "Syrian owned website for the people"}
            </p>
          </div>
          <div className="w-full h-auto bg-[#323232fa] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img3} alt="image-3" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              <Translate text={"Account protected"} />
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              {currentLanguage === "ar"
                ? "يخضع كل اعلان وحساب للمراجعة قبل النشر لضمان السلامة والامان"
                : "To post an advertisement each account and ad is checked through safety & security"}
            </p>
          </div>
          <div className="w-full h-auto bg-[#323232fa] py-8 px-6 text-center space-y-3 rounded">
            <div className="w-14 h-14 rounded-full flex justify-center items-center bg-[#314352] mx-auto">
              <img src={img4} alt="image-4" className="w-8 h-8" />
            </div>
            <h2 className="text-lg md:text-[24px] font-[700] leading-none text-[#F3F4F6]">
              {currentLanguage === "ar"
                ? "التواصل مع البائع بشكل مباشر"
                : "Transactions Seller to Client"}
            </h2>
            <p className="text-sm md:text-base text-[#9AA4AD] leading-none">
              {currentLanguage === "ar"
                ? `موقع سيريا سوق هو منصة إعلانية فقط، ولا يتحمل أي مسؤولية عن أي معاملات تتم عبره. نوصي المشترين والبائعين بالتواصل بوضوح والتحقق من التفاصيل قبل إتمام أي عملية شراء`
                : `SyriaSouq.com acts solely as an advertising platform and has no responsibility for transactions; buyers and sellers are encouraged to communicate effectivley before purchase`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCar;
