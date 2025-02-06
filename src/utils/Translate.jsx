import { useTranslate } from "../hooks/useTranslate";

const Translate = ({ text }) => {
  const translatedText = useTranslate(text);
  return <>{translatedText}</>; // Return translated text inside JSX
};

export default Translate;
