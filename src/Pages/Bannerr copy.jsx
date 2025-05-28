import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/bg-image/banner-img-4.jpeg";
import imgForMobile from "../assets/bg-image/banner-img-for-mobile-2.jpeg";
import Translate from "../utils/Translate";
import { arabicMakes as arMake, makes as enMakes, alllocation } from "../utils/utils";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const BannerSection = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [searchMake, setSearchMake] = useState(null);
  const [make, setMake] = useState(null);
  const [searchModel, setSearchModel] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  const makes = [
    { label: "All", value: "All", models: ["All"] },
    ...enMakes,
    { label: "Other", value: "Other", models: ["Other"] },
  ];
  const arabicMakes = [
    { label: "الكل", value: "الكل", models: ["الكل"] },
    ...arMake,
    { label: "أخرى", value: "أخرى", models: ["أخرى"] },
  ];

  // Add "All" option to alllocation
  const locations = [
    { value: "All", label: currentLanguage === "ar" ? "الكل" : "All", arLabel: "الكل" },
    ...alllocation,
  ];

  const handleSearch = (e) => {
    e.preventDefault();
      const query = `/search?make=${searchMake}${searchModel ? `&model=${searchModel}` : ""}${
        searchLocation ? `&location=${searchLocation}` : ""
      }`;
      navigate(query);
   
  };

  const modelOptions =
    currentLanguage === "ar"
      ? make
        ? arabicMakes
            .find((m) => m.value === make.value)
            ?.models.map((model) => ({
              value: model,
              label: model,
            })) || []
        : []
      : make
      ? makes
          .find((m) => m.value === make.value)
          ?.models.map((model) => ({
            value: model,
            label: model,
          })) || []
      : [];

  const handleChange = (selectedOption) => {
    setMake(selectedOption);
    setSearchMake(selectedOption ? selectedOption.value : null);
    setSearchModel(null); // Reset model when make changes
  };

  const handleModelChange = (selectedOption) => {
    setSearchModel(selectedOption ? selectedOption.value : null);
  };

  const handleLocationChange = (selectedOption) => {
    setSearchLocation(selectedOption ? selectedOption.value : null);
  };

  const options = currentLanguage === "ar" ? arabicMakes : makes;

  const [bgImage, setBgImage] = useState(
    window.innerWidth < 768 ? imgForMobile : img
  );

  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 768 ? imgForMobile : img);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#323232fa",
      borderColor: "#B80200",
      color: "white",
      padding: "5px",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#B80200",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#323232fa",
      borderRadius: "0.5rem",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#B80200" : isFocused ? "#4a4a4a" : "#323232fa",
      color: "white",
      "&:active": {
        backgroundColor: "#B80200",
      },
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#bbb",
    }),
  };

  return (
    <div
      className="relative border-t-2 border-[#576877] py-10 pt-52 sm:py-24 flex items-center justify-center md:min-h-[80vh] min-h-[70vh] bg-banner-mobile"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>
        {`
          @media (max-width: 767px) {
            .bg-banner-mobile {
              background-position: center -30px !important;
            }
          }
        `}
      </style>
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#304455",
          opacity: 0.0,
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 md:py-10 grid grid-cols-1 gap-4 items-center w-full">
        <div className="bg-[#323232fa] shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8 mx-auto mt-12 md:mt-0">
        <h2 className="text-2xl sm:text-lg font-semibold text-white text-center mb-4">
            <Translate text={"Find Your Perfect Car"} />

           
          </h2>
          <form className="space-y-5" onSubmit={handleSearch}>
            <div className="space-y-4">
              <Select
                options={options}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
                onChange={handleChange}
                placeholder={currentLanguage === "ar" ? "-- النوع --" : "-- Make --"}
                className="w-full"
                styles={selectStyles}
                isSearchable
              />
              <Select
                options={modelOptions}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
                WORonChange={handleModelChange}
                placeholder={currentLanguage === "ar" ? "-- الموديل --" : "-- Model --"}
                className="w-full"
                styles={selectStyles}
                isSearchable
                isDisabled={!make}
              />
              <Select
                options={locations}
                getOptionLabel={(e) => (currentLanguage === "ar" ? e.arLabel : e.label)}
                getOptionValue={(e) => e.value}
                onChange={handleLocationChange}
                placeholder={currentLanguage === "ar" ? "-- الموقع --" : "-- Location --"}
                className="w-full"
                styles={selectStyles}
                isSearchable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white hover:bg-slate-200 py-3 sm:py-4 rounded-lg text-[#B80200] text-lg font-semibold transition-colors duration-200"
            >
              {currentLanguage === "ar" ? "بحث" : "Search"}
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;