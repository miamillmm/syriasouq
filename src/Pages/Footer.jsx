import { motion } from "framer-motion";
import { IoIosAt } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
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
  const currentLanguage = i18n.language;

  // Animation variants for fade-in and hover
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const hoverEffect = {
    scale: 1.1,
    transition: { duration: 0.3 },
  };

  return (
    <>
      <div>
        <motion.footer
          className="bg-gradient-to-r from-[#3a3a3a] to-[#4b4b4b] text-white py-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-6 text-center md:text-left">
            {/* Company Section */}
            <motion.div className="space-y-4" variants={fadeIn}>
              <h3 className="font-bold text-2xl text-center">
                {currentLanguage === "ar" ? (
                  <motion.img
                    src={FooterLogoAr}
                    alt="SyriaSouq Logo Arabic"
                    className="max-w-52 w-full md:mx-0 mx-auto"
                    whileHover={hoverEffect}
                  />
                ) : (
                  <motion.img
                    src={FooterLogoEn}
                    alt="SyriaSouq Logo English"
                    className="max-w-52 w-full md:mx-0 mx-auto"
                    whileHover={hoverEffect}
                  />
                )}
              </h3>
              <p className="text-gray-300 text-sm flex justify-center md:justify-start items-center gap-2 capitalize">
                <LuMapPin className="text-red-500" />{" "}
                <Translate text={"Damascus, Syria"} />
              </p>
              <p className="text-gray-300 text-sm flex justify-center md:justify-start items-center gap-2 capitalize">
                <CiAt className="text-red-500" /> syriasouq@outlook.com
              </p>
            </motion.div>

            {/* Useful Links */}
            <motion.div variants={fadeIn}>
              <h3 className="font-bold mb-4 text-lg capitalize">
                <Translate text={"useful links"} />
              </h3>
              <ul className="space-y-2">
                <li>
                  <motion.div whileHover={hoverEffect}>
                    <Link
                      to="/about"
                      className="text-red-500 hover:text-red-400 font-bold transition-colors capitalize"
                    >
                      <Translate text={"About us"} />
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={hoverEffect}>
                    <Link
                      to="/term-and-use"
                      className="text-red-500 hover:text-red-400 font-bold transition-colors capitalize"
                    >
                      <Translate text={"Terms of Use"} />
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={hoverEffect}>
                    <Link
                      to="/privacy-policy"
                      className="text-red-500 hover:text-red-400 font-bold transition-colors capitalize"
                    >
                      <Translate text={"Privacy Policy"} />
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </motion.div>

            {/* Get Social */}
            <motion.div variants={fadeIn}>
              <h3 className="font-bold mb-4 text-lg capitalize">
                {currentLanguage === "ar" ? "راسلنا عبر وسائل التواصل" : "get social"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <motion.div whileHover={hoverEffect}>
                    <Link
                      to="https://www.facebook.com/share/1HKg5LFhzB/?mibextid=wwXIfr"
                      className="text-red-500 hover:text-red-400 flex items-center gap-2 capitalize"
                    >
                      <FaFacebookF className="text-lg" />
                      {currentLanguage === "ar" ? "فيسبوك" : "Facebook"}
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={hoverEffect}>
                    <Link
                      to="https://www.instagram.com/mysyriasouq?igsh=bHFnNWo2aGszcHF4&utm_source=qr"
                      className="text-red-500 hover:text-red-400 flex items-center gap-2 capitalize"
                    >
                      <FaInstagram className="text-lg" />
                      {currentLanguage === "ar" ? "انستاغرام" : "Instagram"}
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={hoverEffect}>
                    <Link
                      to="mailto:syriasouq@outlook.com"
                      className="text-red-500 hover:text-red-400 flex items-center gap-2 capitalize"
                    >
                      <FaEnvelope className="text-lg" />
                      {currentLanguage === "ar" ? "بريد إلكتروني" : "Email"}
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={fadeIn}>
              <h3 className="font-bold mb-4 text-lg capitalize">
                {currentLanguage === "ar" ? "الدعم" : "support"}
              </h3>
              <motion.div whileHover={hoverEffect}>
                <Link
                  to="/contact"
                  className="text-red-500 hover:text-red-400 transition-colors capitalize"
                >
                  {currentLanguage === "ar" ? "تواصل معنا" : "contact us"}
                </Link>
              </motion.div>
            </motion.div>

            {/* Languages */}
            <motion.div variants={fadeIn}>
              <h3 className="font-bold mb-4 text-lg capitalize">
                <Translate text={"languages"} />
              </h3>
              <motion.div whileHover={hoverEffect}>
                <Link
                  to="#"
                  className="text-red-500 hover:text-red-400 transition-colors capitalize"
                >
                  <Translate text={"arabic (arabic language)"} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
        <motion.footer
          className="footer sm:footer-horizontal footer-center text-gray-300 bg-[#272727] p-4"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <aside>
            <p className="capitalize">
              © {new Date().getFullYear()}{" "}
              <Translate text={"SyriaSouq - All rights reserved."} />
            </p>
          </aside>
        </motion.footer>
      </div>
      <LanguageSwitcher />
    </>
  );
};

export default Footer;