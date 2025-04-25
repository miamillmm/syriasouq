import { useTranslation } from "react-i18next";
import Select from "react-select";
import SyrianFlag from "../assets/flag/syria-flag.png";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Language options
const languages = [
  { value: "en", label: "🇬🇧 EN" },
  {
    value: "ar",
    label: (
      <div className="flex items-center gap-2">
        <img
          src={SyrianFlag}
          className="w-6 h-6 rounded-full shadow-sm"
          alt="Syria Flag"
        />
        <span>AR</span>
      </div>
    ),
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (selectedOption) => {
    const newLang = selectedOption.value;
    i18n.changeLanguage(newLang);

    // Update HTML attributes dynamically
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const currentLanguage = i18n.language;
  const showAddListing = location.pathname !== "/addlisting";

  // Animation variants for fade-in and hover
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <div className="fixed bottom-2 left-0 right-0 flex flex-row items-center justify-between w-full z-50 px-4 pb-safe">
      {/* Language Selector */}
      <motion.div
        className="w-32 sm:w-40"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Select
          options={languages}
          defaultValue={languages.find((lang) => lang.value === i18n.language)}
          onChange={changeLanguage}
          className="text-black"
          menuPlacement="top"
          styles={{
            control: (base) => ({
              ...base,
              background: "linear-gradient(to right, #ffffff, #f1f5f9)",
              borderRadius: "8px",
              border: "1px solid #ddd",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }),
            menu: (base) => ({
              ...base,
              background: "white",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "14px",
            }),
            option: (base) => ({
              ...base,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              padding: "8px 12px",
            }),
            singleValue: (base) => ({
              ...base,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }),
          }}
        />
      </motion.div>

      {/* Add Listing Button */}
      {showAddListing && (
        <motion.div
          className="w-32 sm:w-40"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Link to="/addlisting">
            <motion.button
              className="bg-gradient-to-r from-[#B80200] to-[#A00000] text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 shadow-lg hover:bg-gradient-to-r hover:from-[#A00000] hover:to-[#900000] transition-all"
              whileHover={hoverEffect}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }}
            >
              {currentLanguage === "ar" ? "إضافة إعلان" : "Add Listing"}
              <span className="ml-1">+</span>
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSwitcher;