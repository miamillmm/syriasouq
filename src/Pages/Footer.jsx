import { IoIosAt } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import LanguageSwitcher from "../utils/LanguageSwitcher";
import { LuMapPin } from "react-icons/lu";
import { CiAt } from "react-icons/ci";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import FooterLogoEn from "../assets/images/logo/footer-logo-en-transparent.png";
import FooterLogoAr from "../assets/images/logo/footer-logo-ar-transparent.png";

const Footer = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  return (
    <>
      <div>
        <footer className="bg-[#4b4b4bfa] text-white py-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-6 text-center md:text-left">
            {/* Company Section */}
            <div className="space-y-1">
              <h3 className="font-bold text-2xl text-center">
                {currentLanguage === "ar" ? (
                  <>
                    <img
                      src={FooterLogoAr}
                      alt=""
                      className="max-w-52 w-full md:mx-0 mx-auto"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={FooterLogoEn}
                      alt=""
                      className="max-w-52 w-full md:mx-0 mx-auto"
                    />
                  </>
                )}
              </h3>
              <p className="text-gray-300 text-sm flex justify-center md:justify-start items-center gap-2">
                <LuMapPin /> <Translate text={"Damascus, Syria"} />
              </p>
              <p className="text-gray-300 text-sm flex justify-center md:justify-start items-center gap-2">
                <CiAt /> syriasouq@outlook.com
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-bold mb-3">
                <Translate text={"useful links"} />
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/about"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"About us"} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/term-and-use"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"Terms of Use"} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-red-500 hover:underline font-bold"
                  >
                    <Translate text={"Privacy Policy"} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Social */}
            <div>
              <h3 className="font-bold mb-3">
                {currentLanguage === "ar"
                  ? `راسلنا عن طريق البريد الالكتروني`
                  : "get social"}
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="https://www.facebook.com/share/1HKg5LFhzB/?mibextid=wwXIfr"
                    className="text-red-500 hover:underline font-bold"
                  >
                    {currentLanguage === "ar" ? "فيسبوك" : "facebook"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/mysyriasouq?igsh=bHFnNWo2aGszcHF4&utm_source=qr"
                    className="text-red-500 hover:underline font-light"
                  >
                    {currentLanguage === "ar" ? "انستاغرام" : "instagram"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="mailto:syriasouq@outlook.com"
                    className="text-red-500 hover:underline font-light"
                  >
                    {currentLanguage === "ar" ? "بريد إلكتروني" : "Email"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-3">
                {currentLanguage === "ar" ? "الدعم" : "support"}
              </h3>
              <Link
                to="/contact"
                className="text-red-500 hover:underline font-light"
              >
                {currentLanguage === "ar" ? "تواصل معنا" : "contact us"}
              </Link>
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-bold mb-3">
                <Translate text={"languages"} />
              </h3>
              <Link to="#" className="text-red-500 hover:underline font-light">
                <Translate text={"arabic (arabic language)"} />
              </Link>
            </div>
          </div>
        </footer>
        <footer className="footer sm:footer-horizontal footer-center text-gray-300 bg-[#272727fa] p-4">
          <aside>
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Translate text={"SyriaSouq - All rights reserved."} />
            </p>
          </aside>
        </footer>
      </div>
      <LanguageSwitcher />
    </>
  );
};

export default Footer;
