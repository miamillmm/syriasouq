import { useTranslation } from "react-i18next";
import Select from "react-select";
import SyrianFlag from "../assets/flag/syria-flag.png";

// Language options with flags & short names
const languages = [
  { value: "en", label: "🇬🇧 EN" },
  {
    value: "ar",
    label: (
      <>
        <div className="flex items-center gap-2">
          <img src={SyrianFlag} className="w-8" /> AR
        </div>
      </>
    ),
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  return (
    <div className="fixed bottom-4 left-4 w-40 z-50">
      <Select
        options={languages}
        defaultValue={languages[0]}
        onChange={changeLanguage}
        className="text-black"
        menuPlacement="top" // 🔥 This makes the dropdown open upwards!
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
  );
};

export default LanguageSwitcher;
