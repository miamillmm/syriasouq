import axios from "axios";
import { useEffect, useState } from "react";
import {
  CiCalendar,
  CiLocationOn,
  CiShare2,
} from "react-icons/ci";
import { FaList, FaTh, FaTimes } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./custom-slider.css";
import { useTranslation } from "react-i18next";
import Translate from "../utils/Translate";
import Select from "react-select";
import {
  allenginesize,
  arabicMakes,
  getArabicModel,
  getLocalizedLocation,
  getLocalizedMake,
  localizeEngineSize,
  makes,
  alllocation,
} from "../utils/utils";

const SearchPage = () => {
  const { i18n, t } = useTranslation(); // Destructure t here
  const currentLanguage = i18n.language;

  const allTransmission = [
    { value: "automatic", label: "Automatic", arLabel: "اتوماتيك" },
    { value: "manual", label: "Manual", arLabel: "يدوي" },
  ];
  const allFuelType = [
    { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Petrol", label: "Petrol" },
  ];
  const allExteriorColor = [
    { value: "Black", label: "Black", arLabel: "أسود" },
    { value: "Blue", label: "Blue", arLabel: "أزرق" },
    { value: "Brown", label: "Brown", arLabel: "بني" },
    { value: "Gold", label: "Gold", arLabel: "ذهبي" },
    { value: "Green", label: "Green", arLabel: "أخضر" },
    { value: "Red", label: "Red", arLabel: "أحمر" },
    { value: "Pink", label: "Pink", arLabel: "وردي" },
    { value: "Purple", label: "Purple", arLabel: "أرجواني" },
    { value: "Silver", label: "Silver", arLabel: "فضي" },
    { value: "White", label: "White", arLabel: "أبيض" },
    { value: "Other", label: "Other", arLabel: "آخر" },
  ];
  const allInteriorColor = [
    { value: "Beige", label: "Beige" },
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
    { value: "Brown", label: "Brown" },
    { value: "Red", label: "Red" },
    { value: "White", label: "White" },
    { value: "Other", label: "Other" },
  ];

  const sortOptions = [
    { value: "Most Relevant", label: "Most Relevant" },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
    { value: "Highest Price", label: "Highest Price" },
    { value: "Lowest Price", label: "Lowest Price" },
  ];

  const [searchParams] = useSearchParams();
  const make = searchParams.get("make");
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("Most Relevant");
  const [filters, setFilters] = useState({
    make: [],
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    kilometer: "",
    location: "",
    engineSize: "",
    transmission: "",
    fuelType: [],
    exteriorColor: "",
    interiorColor: "",
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    if (
      currentLanguage === "ar" &&
      make !== "الكل" &&
      make !== "" &&
      make !== "All"
    ) {
      const currentMake = arabicMakes.find((mk) => mk.value === make)?.enValue;
      setFilters((prev) => ({
        ...prev,
        make: [currentMake],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        make: [
          make !== "All" && make !== "Other" && make !== "الكل" ? make : "",
        ],
      }));
    }
  }, [make, currentLanguage]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars?status=available`)
      .then((res) => {
        setDatas(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const sortData = (option) => {
    let sortedData = [...datas];
    switch (option) {
      case "Newest":
        sortedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Oldest":
        sortedData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "Highest Price":
        sortedData.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case "Lowest Price":
        sortedData.sort((a, b) => a.priceUSD - a.priceUSD);
        break;
      case "Most Relevant":
        sortedData.sort((a, b) => {
          const dateDiff = new Date(b.createdAt) - new Date(a.createdAt);
          if (dateDiff !== 0) return dateDiff;
          return b.priceUSD - a.priceUSD;
        });
        break;
      default:
        sortedData = [...datas];
        break;
    }
    setDatas(sortedData);
  };

  const handleFilterChange = (name, value) => {
    if (name === "fuelType") {
      setFilters((prev) => ({
        ...prev,
        [name]: value ? [...prev[name], value] : prev[name].filter((item) => item !== value),
      }));
    } else if (name === "make") {
      setFilters((prev) => ({ ...prev, make: [value] }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleShare = async (data) => {
    const shareUrl = `${window.location.origin}/listing/${data._id}`;
    const shareData = {
      title: `${getLocalizedMake(data, currentLanguage)} ${getArabicModel(data, currentLanguage)}`,
      text: `Check out this ${data.year} ${getLocalizedMake(data, currentLanguage)} for $${data.priceUSD}!`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      setShareMessage("Failed to share. Please try again.");
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  const filteredData = datas.filter((data) => {
    const {
      make,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      kilometer,
      location,
      engineSize,
      transmission,
      fuelType,
      exteriorColor,
      interiorColor,
    } = filters;

    const matchesKilometer =
      !kilometer ||
      (data.kilometer >= kilometer[0] &&
        (kilometer[1] >= 210000 || data.kilometer <= kilometer[1]));

    const matchesEngineSize =
      !engineSize ||
      engineSize === "Other" ||
      engineSize === "Unknown" ||
      data.engineSize === engineSize;

    return (
      (make.length > 0
        ? make.some((m) =>
            String(data.make || "")
              .toLowerCase()
              .includes(m.toLowerCase())
          )
        : true) &&
      (minYear ? data.year >= parseInt(minYear, 10) : true) &&
      (maxYear ? data.year <= parseInt(maxYear, 10) : true) &&
      (minPrice ? data.priceUSD >= parseFloat(minPrice) : true) &&
      (maxPrice >= 110000 || (maxPrice ? data.priceUSD <= parseFloat(maxPrice) : true)) &&
      matchesKilometer &&
      (location
        ? String(data.location || "")
            .toLowerCase()
            .includes(location.toLowerCase())
        : true) &&
      matchesEngineSize &&
      (transmission ? data.transmission === transmission : true) &&
      (fuelType.length > 0 ? fuelType.includes(data.fuelType) : true) &&
      (!exteriorColor ||
        data.exteriorColor.toLowerCase() === exteriorColor.toLowerCase() ||
        (exteriorColor.toLowerCase() === "other" &&
          !allExteriorColor.includes(data.exteriorColor.toLowerCase()))) &&
      (!interiorColor ||
        data.interiorColor.toLowerCase() === interiorColor.toLowerCase() ||
        (interiorColor.toLowerCase() === "other" &&
          !allInteriorColor.includes(data.interiorColor.toLowerCase())))
    );
  });

  const carMakes =
    currentLanguage === "ar"
      ? [
          { label: "الكل", value: "", models: [""] },
          ...arabicMakes.map((make) => ({
            ...make,
            value: make.enValue,
          })),
        ]
      : [
          { label: "All", value: "", models: [""] },
          ...makes,
        ];

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ef4444",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ef4444" : "#fff",
      color: state.isSelected ? "#fff" : "#374151",
      "&:hover": {
        backgroundColor: "#fee2e2",
        color: "#374151",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      zIndex: 9999, // Ensure dropdown is on top
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure portal dropdown is on top
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            <Translate text={"Search Results"} />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <button
              className="lg:hidden w-full py-3 px-6 bg-red-600 text-white rounded-lg font-semibold mb-4"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Translate text={"Filter"} />
            </button>

            <div className="hidden lg:block">
              <FilterContent
                filters={filters}
                handleFilterChange={handleFilterChange}
                setFilters={setFilters}
                carMakes={carMakes}
                alllocation={alllocation}
                allenginesize={allenginesize}
                allTransmission={allTransmission}
                allFuelType={allFuelType}
                allExteriorColor={allExteriorColor}
                allInteriorColor={allInteriorColor}
                currentLanguage={currentLanguage}
                localizeEngineSize={localizeEngineSize}
                setIsMobileFilterOpen={setIsMobileFilterOpen}
                selectStyles={selectStyles}
              />
            </div>

            {isMobileFilterOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      <Translate text={"Filters"} />
                    </h3>
                    <FaTimes
                      className="text-2xl text-gray-600 cursor-pointer"
                      onClick={() => setIsMobileFilterOpen(false)}
                    />
                  </div>
                  <FilterContent
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    setFilters={setFilters}
                    carMakes={carMakes}
                    alllocation={alllocation}
                    allenginesize={allenginesize}
                    allTransmission={allTransmission}
                    allFuelType={allFuelType}
                    allExteriorColor={allExteriorColor}
                    allInteriorColor={allInteriorColor}
                    currentLanguage={currentLanguage}
                    localizeEngineSize={localizeEngineSize}
                    setIsMobileFilterOpen={setIsMobileFilterOpen}
                    selectStyles={selectStyles}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredData?.length} <Translate text={"Results"} />{" "}
                <span className="text-red-600 text-sm">
                  <Translate text={"Classified Ads"} />
                </span>
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-48">
                  <Select
                    options={sortOptions.map((option) => ({
                      value: option.value,
                      label: t(option.label),
                    }))}
                    value={sortOptions.find((option) => option.value === sortOption)}
                    onChange={(option) => {
                      setSortOption(option.value);
                      sortData(option.value);
                    }}
                    placeholder={t("Sort by")}
                    styles={selectStyles}
                    menuPortalTarget={document.body} // Ensure dropdown renders in portal
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-lg border ${
                      view === "grid"
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-300 text-gray-600"
                    } hover:bg-red-600 hover:text-white hover:border-red-600 transition`}
                  >
                    <FaTh className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-lg border ${
                      view === "list"
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-300 text-gray-600"
                    } hover:bg-red-600 hover:text-white hover:border-red-600 transition`}
                  >
                    <FaList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
              </div>
            ) : filteredData?.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredData.map((data) => (
                  <div
                    key={data._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div
                      className={`${
                        view === "grid"
                          ? "flex flex-col"
                          : "flex flex-col sm:flex-row"
                      }`}
                    >
                      <div className="relative">
                        <Link to={`/listing/${data._id}`}>
                          <img
                            alt={data.make}
                            src={`http://api.syriasouq.com/uploads/cars/${data.images[0]}`}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </Link>
                        <button
                          onClick={() => handleShare(data)}
                          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                          title="Share"
                        >
                          <CiShare2 className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            ${data?.priceUSD || "N/A"}
                          </h3>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-gray-700 font-medium">
                              {getLocalizedMake(data, currentLanguage)}
                            </span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-gray-700 font-medium">
                              {getArabicModel(data, currentLanguage)}
                            </span>
                          </div>
                          <div className="flex flex-col space-y-1 mt-3 text-gray-600 text-sm">
                            <div className="flex items-center space-x-2">
                              <CiCalendar className="w-5 h-5" />
                              <span>
                                <Translate text={data?.year || "N/A"} />
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <AiOutlineDashboard className="w-5 h-5" />
                              <span>
                                <Translate
                                  text={data?.kilometer || "N/A"}
                                /> <Translate text={"km"} />
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CiLocationOn className="w-5 h-5" />
                              <span>
                                {data?.location
                                  ? getLocalizedLocation(
                                      data?.location,
                                      currentLanguage
                                    )
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-4">
                          <Link
                            to={`/listing/${data?._id}`}
                            className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-red-700 transition"
                          >
                            <Translate text={"View Details"} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-red-600">
                  <Translate text={"No Results Found"} />
                </h2>
              </div>
            )}
            {shareMessage && (
              <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
                {shareMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterContent = ({
  filters,
  handleFilterChange,
  setFilters,
  carMakes,
  alllocation,
  allenginesize,
  allTransmission,
  allFuelType,
  allExteriorColor,
  allInteriorColor,
  currentLanguage,
  localizeEngineSize,
  setIsMobileFilterOpen,
  selectStyles,
}) => {
  const { t } = useTranslation();

  const makeOptions = carMakes.map((make) => ({
    value: make.value,
    label: t(make.label),
  }));

  const locationOptions = alllocation.map((loc) => ({
    value: loc.value,
    label: currentLanguage === "ar" ? loc.arLabel : loc.label,
  }));

  const engineSizeOptions = allenginesize.map((size) => ({
    value: size.value,
    label: localizeEngineSize(size.value, currentLanguage),
  }));

  const exteriorColorOptions = allExteriorColor.map((color) => ({
    value: color.value,
    label: currentLanguage === "ar" ? color.arLabel : color.label,
  }));

  const interiorColorOptions = allInteriorColor.map((color) => ({
    value: color.value,
    label: t(color.label),
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">
        <Translate text={"Filters"} />
      </h3>

      {/* Make */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Make"} />
        </label>
        <Select
          options={makeOptions}
          value={makeOptions.find((option) => option.value === filters.make[0]) || null}
          onChange={(option) => handleFilterChange("make", option ? option.value : "")}
          placeholder={t("Select Make")}
          styles={selectStyles}
          isClearable
          menuPortalTarget={document.body} // Ensure dropdown renders in portal
        />
      </div>

      {/* Year Filter */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Year"} />
        </label>
        <Slider
          range
          min={1920}
          max={2025}
          step={1}
          value={[filters.minYear || 1920, filters.maxYear || 2025]}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              minYear: value[0],
              maxYear: value[1],
            }))
          }
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{filters.minYear || 1920}</span>
          <span>{filters.maxYear || 2025}</span>
        </div>
      </div>

      {/* Price Filter */}
      <div style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Price"} /> ($)
        </label>
        <Slider
          range
          min={0}
          max={110000}
          step={1000}
          marks={{
            0: `$0`,
            25000: `$25k`,
            50000: `$50k`,
            75000: `$75k`,
            90000: `$90k`,
            110000: `Any`,
          }}
          value={[filters.minPrice || 0, filters.maxPrice || 110000]}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              minPrice: value[0],
              maxPrice: value[1],
            }))
          }
          direction={currentLanguage === "ar" ? "rtl" : "ltr"}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.minPrice || 0}</span>
          <span>{filters.maxPrice >= 110000 ? "Any" : `$${filters.maxPrice}`}</span>
        </div>
      </div>

      {/* Kilometer Filter */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Kilometer"} />
        </label>
        <Slider
          range
          min={0}
          max={210000}
          step={4000}
          marks={{
            0: `0 ${currentLanguage === "ar" ? "كم" : "km"}`,
            40000: `40k ${currentLanguage === "ar" ? "كم" : "km"}`,
            80000: `80k ${currentLanguage === "ar" ? "كم" : "km"}`,
            120000: `120k ${currentLanguage === "ar" ? "كم" : "km"}`,
            160000: `160k ${currentLanguage === "ar" ? "كم" : "km"}`,
            210000: `Any`,
          }}
          value={filters.kilometer || [0, 210000]}
          onChange={(value) => setFilters((prev) => ({ ...prev, kilometer: value }))}
          className="mb-2"
        />
        <p className="text-center text-sm font-medium text-red-600">
          <Translate
            text={
              filters.kilometer
                ? `${
                    currentLanguage === "ar"
                      ? `${filters.kilometer[1] >= 210000 ? "Any" : filters.kilometer[1]} - ${filters.kilometer[0]}`
                      : `${filters.kilometer[0]} - ${filters.kilometer[1] >= 210000 ? "Any" : filters.kilometer[1]}`
                  } km`
                : currentLanguage === "ar"
                ? "الممشى"
                : "All Kilometers"
            }
          />
        </p>
      </div>

      {/* Location */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Location"} />
        </label>
        <Select
          options={locationOptions}
          value={locationOptions.find((option) => option.value === filters.location) || null}
          onChange={(option) => handleFilterChange("location", option ? option.value : "")}
          placeholder={t("Select Location")}
          styles={selectStyles}
          isClearable
          menuPortalTarget={document.body} // Ensure dropdown renders in portal
        />
      </div>

      {/* Engine Size */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Engine Size (CC)"} />
        </label>
        <Select
          options={engineSizeOptions}
          value={engineSizeOptions.find((option) => option.value === filters.engineSize) || null}
          onChange={(option) => handleFilterChange("engineSize", option ? option.value : "")}
          placeholder={t("Select Engine Size")}
          styles={selectStyles}
          isClearable
          menuPortalTarget={document.body} // Ensure dropdown renders in portal
        />
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Transmission"} />
        </label>
        <div className="space-y-2">
          {allTransmission.map((trans) => (
            <div key={trans.label} className="flex items-center">
              <input
                type="radio"
                name="transmission"
                id={trans.value}
                value={trans.value}
                onChange={(e) => handleFilterChange("transmission", e.target.value)}
                checked={trans.value === filters.transmission}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <label htmlFor={trans.value} className="ml-2 text-gray-700">
                {currentLanguage === "ar" ? trans.arLabel : trans.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Fuel Type"} />
        </label>
        <div className="space-y-2">
          {allFuelType.map((fuel) => (
            <div key={fuel.label} className="flex items-center">
              <input
                type="checkbox"
                name="fuelType"
                value={fuel.value}
                onChange={(e) => handleFilterChange("fuelType", e.target.checked ? e.target.value : null)}
                checked={filters.fuelType.includes(fuel.value)}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <label className="ml-2 text-gray-700">
                <Translate text={fuel.label} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Exterior Color */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Exterior Color"} />
        </label>
        <Select
          options={exteriorColorOptions}
          value={exteriorColorOptions.find((option) => option.value === filters.exteriorColor) || null}
          onChange={(option) => handleFilterChange("exteriorColor", option ? option.value : "")}
          placeholder={t("Select Exterior Color")}
          styles={selectStyles}
          isClearable
          menuPortalTarget={document.body} // Ensure dropdown renders in portal
        />
      </div>

      {/* Interior Color */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          <Translate text={"Interior Color"} />
        </label>
        <Select
          options={interiorColorOptions}
          value={interiorColorOptions.find((option) => option.value === filters.interiorColor) || null}
          onChange={(option) => handleFilterChange("interiorColor", option ? option.value : "")}
          placeholder={t("Select Interior Color")}
          styles={selectStyles}
          isClearable
          menuPortalTarget={document.body} // Ensure dropdown renders in portal
        />
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button
          className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          onClick={() => setIsMobileFilterOpen && setIsMobileFilterOpen(false)}
        >
          <Translate text={"Apply Filters"} />
        </button>
        <button
          className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          onClick={() =>
            setFilters({
              make: [],
              minYear: "",
              maxYear: "",
              minPrice: "",
              maxPrice: "",
              kilometer: "",
              location: "",
              engineSize: "",
              transmission: "",
              fuelType: [],
              exteriorColor: "",
              interiorColor: "",
            })
          }
        >
          <Translate text={"Reset Filters"} />
        </button>
      </div>
    </div>
  );
};

export default SearchPage;