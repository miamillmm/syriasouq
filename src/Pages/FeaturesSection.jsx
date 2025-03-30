import React from "react";
import Translate from "../utils/Translate";
import { features } from "../utils/utils";

const FeaturesSection = ({
  selectedFeatures,
  setSelectedFeatures,
  currentLanguage,
}) => {
  const toggleFeature = (featureValue) => {
    if (selectedFeatures.includes(featureValue)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== featureValue));
    } else {
      setSelectedFeatures([...selectedFeatures, featureValue]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center w-full mb-5 pl-5">
        <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
          <Translate text={"Features"} />
        </h2>
        <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
        <button className="text-gray-400 hover:text-gray-600">▼</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <label
            key={feature.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature.value)}
              onChange={() => toggleFeature(feature.value)}
              className="peer hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                selectedFeatures.includes(feature.value)
                  ? "border-red-500 bg-red-500"
                  : "border-[#314352] bg-transparent"
              }`}
            >
              {selectedFeatures.includes(feature.value) && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <span
              className={`${
                selectedFeatures.includes(feature.value)
                  ? "text-red-500"
                  : "text-[#314352]"
              }`}
            >
              {currentLanguage === "ar"
                ? feature.arLabel || feature.label
                : feature.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
