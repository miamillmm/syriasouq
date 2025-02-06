import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { welcome: "Welcome to my website", post: "User post" },
    },
    ar: {
      translation: { welcome: "مرحبًا بك في موقعي", post: "منشور المستخدم" },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
