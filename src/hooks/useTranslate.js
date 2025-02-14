import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const translationCache = {}; // Cache translations

export const useTranslate = (text) => {
  const { t, i18n } = useTranslation(); // Get selected language & translation function
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const targetLang = i18n.language;
    if (!text || targetLang === "en") {
      setTranslatedText(text); // No translation needed for English
      return;
    }

    // 🔹 First, check manual translations from locales
    const manualTranslation = t(text, { defaultValue: text });
    if (manualTranslation !== text) {
      setTranslatedText(manualTranslation);
      return;
    }

    const cacheKey = `${text}-${targetLang}`;
    if (translationCache[cacheKey]) {
      setTranslatedText(translationCache[cacheKey]); // Use cached translation
      return;
    }

    // 🔥 Fallback: Use Google Translate API for automatic translation
    const GOOGLE_TRANSLATE_URL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;

    axios
      .get(GOOGLE_TRANSLATE_URL)
      .then((res) => {
        const translated = res.data[0].map((t) => t[0]).join(""); // Extract translation
        translationCache[cacheKey] = translated; // Cache result
        setTranslatedText(translated);
      })
      .catch((error) => {
        console.error("❌ Translation error:", error);
        setTranslatedText(text); // Fallback to original text
      });
  }, [text, i18n.language]);

  return translatedText;
};
