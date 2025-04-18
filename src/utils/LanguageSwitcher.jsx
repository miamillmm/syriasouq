import { useTranslation } from "react-i18next";
import Select from "react-select";
import SyrianFlag from "../assets/flag/syria-flag.png";
import { Link } from "react-router-dom";
import Translate from "./Translate";

// Language options
const languages = [
  { value: "en", label: "🇬🇧 EN" },
  {
    value: "ar",
    label: (
      <div className="flex items-center gap-2">
        <img src={SyrianFlag} className="w-8" alt="Syria Flag" /> AR
      </div>
    ),
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (selectedOption) => {
    const newLang = selectedOption.value;
    i18n.changeLanguage(newLang);

    // Update HTML attributes dynamically
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const currentLanguage = i18n.language; // Gets current language

  return (
    <>
      <div className="fixed bottom-4 right-2 w-40 z-50 shadow">
        <Link to={"/addlisting"} className="block ">
          <button className="bg-[#B80200] text-white px-4 py-2 rounded-md cursor-pointer text-md">
            {currentLanguage === "ar" ? "إضافة إعلان" : "Add Listing"}{" "}
            <span>+</span>
          </button>
        </Link>
      </div>
      <div className="fixed bottom-4 left-4 w-40 z-50">
        <Select
          options={languages}
          defaultValue={languages.find((lang) => lang.value === i18n.language)}
          onChange={changeLanguage}
          className="text-black"
          menuPlacement="top"
          styles={{
            control: (base) => ({
              ...base,
              background: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
              cursor: "pointer",
            }),
            menu: (base) => ({
              ...base,
              background: "white",
              borderRadius: "8px",
              fontSize: "34px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }),
          }}
        />
      </div>
    </>
  );
};

export default LanguageSwitcher;
