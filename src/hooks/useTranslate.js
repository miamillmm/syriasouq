import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/translate`; // Use your main backend

const translationCache = {}; // Cache translations

export const useTranslate = (text) => {
  const { i18n } = useTranslation(); // Get selected language
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const targetLang = i18n.language;
    if (!text || targetLang === "en") {
      setTranslatedText(text); // No translation needed for English
      return;
    }

    const cacheKey = `${text}-${targetLang}`;
    if (translationCache[cacheKey]) {
      setTranslatedText(translationCache[cacheKey]); // Use cached translation
      return;
    }

    axios
      .post(API_URL, { text, targetLang })
      .then((res) => {
        translationCache[cacheKey] = res.data.translatedText;
        setTranslatedText(res.data.translatedText);
      })
      .catch((error) => {
        console.error("❌ Translation error:", error);
        setTranslatedText(text); // Fallback to original text
      });
  }, [text, i18n.language]);

  return translatedText;
};
