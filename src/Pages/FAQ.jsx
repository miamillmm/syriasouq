"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Translate from "../utils/Translate"
import { useTranslation } from "react-i18next"

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-[#314352]">
          <Translate text={question} />
        </h3>
        <span className="text-red-500">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-5 px-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600">
          <Translate text={answer} />
        </p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const [openIndex, setOpenIndex] = useState(0)

  const faqData = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section. There you will find all your orders with their current status and tracking information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. For certain regions, we also offer cash on delivery options.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary depending on your location. Domestic orders typically arrive within 3-5 business days, while international orders may take 7-14 business days. Expedited shipping options are available at checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging. Please note that certain items like personalized products cannot be returned unless defective.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. You can see the shipping options available to your country during checkout.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-18 py-12">
      <div className="text-center mb-10">
        <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer">
          <Translate text={"Frequently Asked Questions"} />
        </button>
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352] mt-2">
          <Translate text={"Common Questions"} />
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-2">
          <Translate text={"Find answers to the most common questions about our services and platform"} />
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleFAQ(index)}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          <Translate text={"Can't find what you're looking for?"} />
        </p>
        <a
          href="#contact-form"
          className="inline-flex items-center text-red-500 font-medium mt-2 hover:text-red-600 transition-colors"
        >
          <Translate text={"Contact our support team"} />
          <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  )
}

export default FAQ
