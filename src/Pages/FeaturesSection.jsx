import React, { useState } from "react";

const FeaturesSection = ({selectedFeatures,setSelectedFeatures}) => {
  const features = [
    "360-degree camera",
    "Adaptive headlights",
    "Blind-spot warning",
    "Cooled seats",
    "Heated seats",
    "LED headlights",
    "Performance tyres",
    "Sound system",
    "ABS",
    "Backup camera",
    "Bluetooth",
    "Extensive tool kit",
    "Keyless start",
    "Memory seat",
    "Reversing camera",
    "Traction control",
    "Active head restraints",
    "Blind spot alert",
    "Brake assist",
    "Forward-collision warning",
    "Leather seats",
    "Navigation system",
    "Side airbags",
    "USB port",
  ];

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex items-center w-full mb-5 pl-5">
        <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
          Features
        </h2>
        <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
        <button className="text-gray-400 hover:text-gray-600">▼</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <label
            key={feature}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => toggleFeature(feature)}
              className="peer hidden"
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                selectedFeatures.includes(feature)
                  ? "border-[#FF9540] bg-[#FF9540]"
                  : "border-[#314352] bg-transparent"
              }`}
            >
              {selectedFeatures.includes(feature) && (
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
                selectedFeatures.includes(feature)
                  ? "text-[#FF9540]"
                  : "text-[#314352]"
              }`}
            >
              {feature}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
