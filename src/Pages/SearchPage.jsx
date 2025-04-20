import axios from "axios";
import { useEffect, useState } from "react";
import {
  CiCalendar,
  CiHeart,
  CiLocationOn,
  CiShare2,
  CiWallet,
} from "react-icons/ci";
import { FaList, FaMapMarkerAlt, FaTh, FaTimes } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumb from "./Breadcumb";
import {
  allenginesize,
  arabicMakes,
  getArabicModel,
  getLocalizedLocation,
  getLocalizedMake,
  localizeEngineSize,
  makes,
} from "../utils/utils";
import { useTranslation } from "react-i18next";
import Translate from "../utils/Translate";
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import styles
import "./custom-slider.css"; // Custom styles for black & gray theme
import { alllocation } from "../utils/utils";

const SearchPage = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  // const allenginesize = [
  //   { value: "0-499 cc", label: "0-499 cc" },
  //   { value: "1000-1499 cc", label: "1000-1499 cc" },
  //   { value: "1500-1999 cc", label: "1500-1999 cc" },
  //   { value: "2000-2499 cc", label: "2000-2499 cc" },
  //   { value: "2500-2999 cc", label: "2500-2999 cc" },
  //   { value: "3000-3499 cc", label: "3000-3499 cc" },
  //   { value: "3500-3999 cc", label: "3500-3999 cc" },
  //   { value: "4000+ cc", label: "4000+ cc" },
  //   { value: "500-999 cc", label: "500-999 cc" },
  //   { value: "Other", label: "Other" },
  //   { value: "Unknown", label: "Unknown" },
  // ];

  const allTransmission = [
    { value: "automatic", label: "Automatic", arLabel: "اتوماتيك" },
    { value: "manual", label: "Manual", arLabel: "يدوي" },
    // more transmission types...
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

  const [searchParams] = useSearchParams();
  const make = searchParams.get("make");
  const [datas, setDatas] = useState([]);
  const [view, setView] = useState("list");
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
  }, [make]);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars?status=available`)
      .then((res) => {
        // const sanitizedData = res.data.map((item) => ({
        //   ...item,
        //   make: String(item.make || ""),
        //   location: String(item.location || ""),
        // }));
        setDatas(res.data.data);
      })
      .catch((error) => console.log("Error fetching data:", error));
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
        sortedData.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case "Most Relevant":
        // Example: Sort by recent cars first, then by highest price
        sortedData.sort((a, b) => {
          const dateDiff = new Date(b.createdAt) - new Date(a.createdAt);
          if (dateDiff !== 0) return dateDiff;
          return b.priceUSD - a.priceUSD;
        });
        break;
      default:
        // No sorting — keep original order
        sortedData = [...datas];
        break;
    }

    setDatas(sortedData);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "fuelType" || name === "make") {
        setFilters((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        }));
      }
    } else if (name === "make") {
      setFilters((prev) => ({ ...prev, make: [value] }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
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

    // const matchesKilometer =
    //   !kilometer ||
    //   (kilometer === "0-50000" &&
    //     data.kilometer >= 0 &&
    //     data.kilometer <= 50000) ||
    //   (kilometer === "50001-100000" &&
    //     data.kilometer >= 50001 &&
    //     data.kilometer <= 100000) ||
    //   (kilometer === "100001-150000" &&
    //     data.kilometer >= 100001 &&
    //     data.kilometer <= 150000) ||
    //   (kilometer === "150001-200000" &&
    //     data.kilometer >= 150001 &&
    //     data.kilometer <= 200000) ||
    //   (kilometer === "+200000" && data.kilometer >= 200001);

    const matchesKilometer =
      !kilometer ||
      (data.kilometer >= kilometer[0] && data.kilometer <= kilometer[1]);

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
      (maxPrice ? data.priceUSD <= parseFloat(maxPrice) : true) &&
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

  // const carMakes =
  //   currentLanguage === "ar"
  //     ? [{ label: "الكل", value: "", models: [""] }, ...arabicMakes]
  //     : [
  //         {
  //           label: "All",
  //           value: "",
  //           models: [""],
  //         },
  //         ...makes,
  //       ];

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
          {
            label: "All",
            value: "",
            models: [""],
          },
          ...makes,
        ];

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={""} />
      </h2>

      <div className="grid grid-cols-8 gap-10">
        <div className="xl:col-span-2 col-span-8 shadow rounded">
          <button
            className="xl:hidden block py-2 px-8 rounded shadow bg-red-500 text-white cursor-pointer"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Translate text={"Filter"} />
          </button>
          {/* filter side bar  */}
          <div className="xl:col-span-2 col-span-8 shadow rounded p-4 xl:block hidden">
            <h3 className="font-bold text-xl mb-4">
              {currentLanguage === "ar" ? "تحديد" : "Filters"}
            </h3>
            {/* Make */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {currentLanguage === "ar" ? "نوع السيارة" : "Make"}
              </label>
              {/* <input
                type="text"
                name="make"
                value={filters.make[0] || ""}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                placeholder={
                  currentLanguage === "ar" ? "البحث عن الماركة" : "Search make"
                }
              /> */}
              <div>
                {/* <input
                    type="checkbox"
                    name="make"
                    value={make.label}
                    checked={filters.make.includes(make)}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{make.label}</label> */}
                <select
                  name="make"
                  id=""
                  onChange={handleFilterChange}
                  className="w-full py-2 !bg-white px-2 rounded"
                  value={filters.make}
                >
                  <option hidden selected>
                    <Translate text={"Select Make"} />
                  </option>
                  {carMakes.map((make) => (
                    <option
                      key={make.label}
                      value={make.value}
                      className="ml-2"
                      selected={filters.make.includes(make.value)}
                    >
                      <Translate text={make.label} />
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year */}
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <Translate text={"Year"} />
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minYear"
                  value={filters.minYear}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder={
                    currentLanguage === "ar" ? "الحد الأدنى للسنة" : "Min Year"
                  }
                />
                <input
                  type="number"
                  name="maxYear"
                  value={filters.maxYear}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder={
                    currentLanguage === "ar" ? "الحد الأقصى للسنة" : "Max Year"
                  }
                />
              </div>
            </div> */}

            {/* Year Filter */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
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
              />
              <div
                className={`flex justify-between mt-2 text-sm text-gray-700 ${
                  currentLanguage === "ar" && "flex-row-reverse"
                }`}
              >
                <span>{filters.minYear || 1920}</span>
                <span>{filters.maxYear || 2025}</span>
              </div>
            </div>

            {/* Price */}
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <Translate text={"Price"} />
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder={
                    currentLanguage === "ar" ? "الحد الأدنى للسعر" : "Min Price"
                  }
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder={
                    currentLanguage === "ar" ? "السعر الأقصى" : "Max Price"
                  }
                />
              </div>
            </div> */}

            {/* Price Filter */}
            <div
              className="mb-6 "
              style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}
            >
              <label className="block text-gray-700 font-semibold mb-3">
                <Translate text={"Price"} /> ($)
              </label>
              <Slider
                key={currentLanguage} // Force re-render when language changes
                range
                min={0}
                max={100000}
                step={1000}
                value={[filters.minPrice || 0, filters.maxPrice || 100000]}
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: value[0],
                    maxPrice: value[1],
                  }))
                }
                direction={currentLanguage === "ar" ? "rtl" : "ltr"}
              />
              <div
                className={`flex justify-between mt-2 text-sm text-gray-700 ${
                  currentLanguage === "ar" && "flex-row-reverse"
                }`}
              >
                <span>${filters.minPrice || 0}</span>
                <span>${filters.maxPrice || 100000}</span>
              </div>
            </div>

            {/* Kilometer */}
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <Translate text={"Kilometer"} />
              </label>
              <select
                name="kilometer"
                value={filters.kilometer}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">
                  <Translate text={"Select Kilometer"} />
                </option>
                <option value="0-50000">
                  <Translate text={"0-50,000"} />
                </option>
                <option value="50001-100000">
                  <Translate text={"50,001-100,000"} />
                </option>
                <option value="100001-150000">
                  <Translate text={"100,001-150,000"} />
                </option>
                <option value="150001-200000">
                  <Translate text={"150,001-200,000"} />
                </option>
                <option value="+200000">
                  <Translate text={"+200,000"} />
                </option>
              </select>
            </div> */}

            {/* Kilometer Filter (Now a Proper Range Slider) */}
            {/* Kilometer Filter */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                <Translate text={"Kilometer"} />
              </label>
              <Slider
                range
                min={0}
                max={200000}
                step={5000}
                marks={{
                  0: `0 ${currentLanguage === "ar" ? "كم" : "km"}`,
                  50000: `50k ${currentLanguage === "ar" ? "كم" : "km"}`,
                  100000: `100k ${currentLanguage === "ar" ? "كم" : "km"}`,
                  150000: `150k ${currentLanguage === "ar" ? "كم" : "km"}`,
                  200000: `200k+ ${currentLanguage === "ar" ? "كم" : "km"}`,
                }}
                value={filters.kilometer || [0, 200000]} // Default range
                onChange={(value) => {
                  setFilters((prev) => ({ ...prev, kilometer: value }));
                }}
              />
              <p
                className={`text-center mt-2 text-sm font-medium text-red-600 ${
                  currentLanguage === "ar" && "flex-row-reverse"
                }`}
              >
                <Translate
                  text={
                    filters.kilometer
                      ? `${
                          currentLanguage === "ar"
                            ? `${filters.kilometer[1]} - ${filters.kilometer[0]}`
                            : `${filters.kilometer[0]} - ${filters.kilometer[1]}`
                        } km`
                      : currentLanguage === "ar"
                      ? "الممشى"
                      : "All Kilometers"
                  }
                />
              </p>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {currentLanguage === "ar" ? "الموقع" : "Location"}
              </label>
              <div>
                <select
                  name="location"
                  id=""
                  className="!bg-white py-2 px-2 rounded w-full"
                  onChange={handleFilterChange}
                  value={filters.location}
                >
                  <option hidden selected>
                    {currentLanguage === "ar"
                      ? "حدد الموقع"
                      : "Select Location"}
                  </option>
                  {alllocation.map((loc) => (
                    <option key={loc.label} value={loc.value}>
                      {currentLanguage === "ar" ? loc.arLabel : loc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Engine Size */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {currentLanguage === "ar"
                  ? `حجم المحرك (سي سي)`
                  : `Engine Size (CC)`}
              </label>
              <div>
                <select
                  name="engineSize"
                  id=""
                  className="w-full py-2 px-2 rounded !bg-white"
                  onChange={handleFilterChange}
                  value={filters.engineSize}
                >
                  <option hidden selected>
                    <Translate text={"Select Engine Size"} />
                  </option>
                  {allenginesize.map((size) => (
                    <option key={size.label} value={size.value}>
                      {localizeEngineSize(size.value, currentLanguage)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Transmission */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {currentLanguage === "ar" ? "ناقل الحركة" : "Transmission"}
              </label>
              {allTransmission.map((trans) => (
                <div key={trans.label}>
                  <input
                    type="radio"
                    name="transmission"
                    id={trans.value}
                    value={trans.value}
                    onChange={handleFilterChange}
                    checked={
                      trans.value === filters.transmission &&
                      filters.transmission !== ""
                    }
                  />
                  <label className="ml-2" htmlFor={trans.value}>
                    {currentLanguage === "ar" ? trans.arLabel : trans.label}
                  </label>
                </div>
              ))}
            </div>
            {/* Fuel Type */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <Translate text={"Fuel Type"} />
              </label>
              {allFuelType.map((fuel) => (
                <div key={fuel.label}>
                  <input
                    type="checkbox"
                    name="fuelType"
                    value={fuel.value}
                    onChange={handleFilterChange}
                    checked={filters.fuelType.includes(fuel.value)}
                  />
                  <label className="ml-2">
                    <Translate text={fuel.label} />
                  </label>
                </div>
              ))}
            </div>
            {/* Exterior Color */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <Translate text={"Exterior Color"} />
              </label>
              <select
                name="exteriorColor"
                value={filters.exteriorColor}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option hidden selected>
                  {currentLanguage === "ar"
                    ? `اللون الخارجي`
                    : "Select Exteriror Color"}
                </option>
                {allExteriorColor.map((color) => (
                  <>
                    <option key={color.label} value={color.value}>
                    {currentLanguage === "ar" ? color.arLabel : color.label}
                    </option>
                  </>
                ))}
              </select>
            </div>
            {/* Interior Color */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <Translate text={"Interior Color"} />
              </label>
              <select
                name="interiorColor"
                value={filters.interiorColor}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option hidden selected>
                  <Translate text={"Select Interior Color"} />
                </option>
                {allInteriorColor.map((color) => (
                  <>
                    <option key={color.label} value={color.value}>
                      <Translate text={color.label} />
                    </option>
                  </>
                ))}
              </select>
            </div>
            {/* Button */}
            <div className="mb-4 flex flex-col gap-2">
              <button className="text-white bg-[#fb2c36] w-full py-2 rounded cursor-pointer">
              {currentLanguage === "ar" ? "تطبيق التصفية" : "Apply Filters"}
              </button>
              <button
                className="text-black bg-gray-200 w-full py-2 rounded cursor-pointer"
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
                    {currentLanguage === "ar" ? "إعادة تعيين التصفيات" : "Reset Filters"}
                    </button>
            </div>
          </div>

          {isMobileFilterOpen && (
            <>
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-700/50 z-[999999] p-5">
                <button>
                  <FaTimes
                    className="text-4xl text-white"
                    onClick={() => setIsMobileFilterOpen(false)}
                  />
                </button>
                <div className="xl:col-span-2 col-span-8 shadow rounded p-4 bg-slate-50 h-full overflow-scroll mb-4">
                  <h3 className="font-bold text-xl mb-4">
                    {currentLanguage === "ar" ? "تحديد" : "Filters"}
                  </h3>
                  {/* Make */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      {currentLanguage === "ar" ? "نوع السيارة" : "Make"}
                    </label>
                    {/* <input
                type="text"
                name="make"
                value={filters.make[0] || ""}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                placeholder={
                  currentLanguage === "ar" ? "البحث عن الماركة" : "Search make"
                }
              /> */}
                    <div>
                      {/* <input
                    type="checkbox"
                    name="make"
                    value={make.label}
                    checked={filters.make.includes(make)}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{make.label}</label> */}
                      <select
                        name="make"
                        id=""
                        onChange={handleFilterChange}
                        className="w-full py-2 !bg-white px-2 rounded"
                        value={filters.make}
                      >
                        <option hidden selected>
                          <Translate text={"Select Make"} />
                        </option>
                        {carMakes.map((make) => (
                          <option
                            key={make.label}
                            value={make.value}
                            className="ml-2"
                            selected={filters.make.includes(make.value)}
                          >
                            <Translate text={make.label} />
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-3">
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
                    />
                    <div
                      className={`flex justify-between mt-2 text-sm text-gray-700 ${
                        currentLanguage === "ar" && "flex-row-reverse"
                      }`}
                    >
                      <span>{filters.minYear || 1920}</span>
                      <span>{filters.maxYear || 2025}</span>
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div
                    className="mb-6 "
                    style={{
                      direction: currentLanguage === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    <label className="block text-gray-700 font-semibold mb-3">
                      <Translate text={"Price"} /> ($)
                    </label>
                    <Slider
                      key={currentLanguage} // Force re-render when language changes
                      range
                      min={0}
                      max={100000}
                      step={1000}
                      value={[
                        filters.minPrice || 0,
                        filters.maxPrice || 100000,
                      ]}
                      onChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          minPrice: value[0],
                          maxPrice: value[1],
                        }))
                      }
                      direction={currentLanguage === "ar" ? "rtl" : "ltr"}
                    />
                    <div
                      className={`flex justify-between mt-2 text-sm text-gray-700 ${
                        currentLanguage === "ar" && "flex-row-reverse"
                      }`}
                    >
                      <span>${filters.minPrice || 0}</span>
                      <span>${filters.maxPrice || 100000}</span>
                    </div>
                  </div>

                  {/* Kilometer Filter (Now a Proper Range Slider) */}
                  {/* Kilometer Filter */}
                  <div className="mb-10">
                    <label className="block text-gray-700 font-semibold mb-3">
                      <Translate text={"Kilometer"} />
                    </label>
                    <Slider
                      range
                      min={0}
                      max={200000}
                      step={5000}
                      marks={{
                        0: `0 ${currentLanguage === "ar" ? "كم" : "km"}`,
                        50000: `50k ${currentLanguage === "ar" ? "كم" : "km"}`,
                        100000: `100k ${
                          currentLanguage === "ar" ? "كم" : "km"
                        }`,
                        150000: `150k ${
                          currentLanguage === "ar" ? "كم" : "km"
                        }`,
                        200000: `200k+ ${
                          currentLanguage === "ar" ? "كم" : "km"
                        }`,
                      }}
                      value={filters.kilometer || [0, 200000]} // Default range
                      onChange={(value) => {
                        setFilters((prev) => ({ ...prev, kilometer: value }));
                      }}
                    />
                    <p className="text-center mt-2 text-sm font-medium text-red-600">
                      <Translate
                        text={
                          filters.kilometer
                            ? `${filters.kilometer[0]} - ${filters.kilometer[1]} km`
                            : currentLanguage === "ar"
                            ? "الممشى"
                            : "All Kilometers"
                        }
                      />
                    </p>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      {currentLanguage === "ar" ? "الموقع" : "Location"}
                    </label>
                    <div>
                      <select
                        name="location"
                        id=""
                        className="!bg-white py-2 px-2 rounded w-full"
                        onChange={handleFilterChange}
                        value={filters.location}
                      >
                        <option hidden selected>
                          {currentLanguage === "ar"
                            ? "حدد الموقع"
                            : "Select Location"}
                        </option>
                        {alllocation.map((loc) => (
                          <option key={loc.label} value={loc.value}>
                            {currentLanguage === "ar" ? loc.arLabel : loc.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Engine Size */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      {currentLanguage === "ar"
                        ? `حجم المحرك (سي سي)`
                        : `Engine Size (CC)`}
                    </label>
                    <div>
                      <select
                        name="engineSize"
                        id=""
                        className="w-full py-2 px-2 rounded !bg-white"
                        onChange={handleFilterChange}
                        value={filters.engineSize}
                      >
                        <option hidden selected>
                          <Translate text={"Select Engine Size"} />
                        </option>
                        {allenginesize.map((size) => (
                          <option key={size.label} value={size.value}>
                            {localizeEngineSize(size.value, currentLanguage)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Transmission */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      {currentLanguage === "ar"
                        ? "ناقل الحركة"
                        : "Transmission"}
                    </label>
                    {allTransmission.map((trans) => (
                      <div key={trans.label}>
                        <input
                          type="radio"
                          name="transmission"
                          id={trans.value}
                          value={trans.value}
                          onChange={handleFilterChange}
                          checked={
                            trans.value === filters.transmission &&
                            filters.transmission !== ""
                          }
                        />
                        <label className="ml-2" htmlFor={trans.value}>
                          {currentLanguage === "ar"
                            ? trans.arLabel
                            : trans.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* Fuel Type */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      <Translate text={"Fuel Type"} />
                    </label>
                    {allFuelType.map((fuel) => (
                      <div key={fuel.label}>
                        <input
                          type="checkbox"
                          name="fuelType"
                          value={fuel.value}
                          onChange={handleFilterChange}
                          checked={filters.fuelType.includes(fuel.value)}
                        />
                        <label className="ml-2">
                          <Translate text={fuel.label} />
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* Exterior Color */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      <Translate text={"Exterior Color"} />
                    </label>
                    <select
                      name="exteriorColor"
                      value={filters.exteriorColor}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <option hidden selected>
                        {currentLanguage === "ar"
                          ? `اللون الخارجي`
                          : "Select Exteriror Color"}
                      </option>
                      {allExteriorColor.map((color) => (
                        <>
                          <option key={color.label} value={color.value}>
                            <Translate text={color.label} />
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  {/* Interior Color */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      <Translate text={"Interior Color"} />
                    </label>
                    <select
                      name="interiorColor"
                      value={filters.interiorColor}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <option hidden selected>
                        <Translate text={"Select Interior Color"} />
                      </option>
                      {allInteriorColor.map((color) => (
                        <>
                          <option key={color.label} value={color.value}>
                            <Translate text={color.label} />
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  {/* Button */}
                  <div className="mb-4 flex flex-col gap-2">
                    <button
                      className="text-white bg-[#fb2c36] w-full py-2 rounded cursor-pointer"
                      onClick={() => setIsMobileFilterOpen(false)}
                    >
              {currentLanguage === "ar" ? "تطبيق التصفية" : "Apply Filters"}
              </button>
                    <button
                      className="text-black bg-gray-200 w-full py-2 rounded cursor-pointer"
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
              </div>
            </>
          )}
        </div>
        <div className="xl:col-span-6 col-span-8">
          <div className="flex justify-between xl:items-center mb-4 p-2 rounded bg-transparent xl:flex-row flex-col">
            <h2 className="xl:text-[24px] text-[18px] font-semibold mr-4">
              {filteredData?.length} <Translate text={"Results"} />{" "}
              <span className="text-red-500 xl:text-[15px] text-[12px]">
                <Translate text={"Classified Ads"} />
              </span>
            </h2>
            <div className="flex xl:items-center gap-8 xl:flex-row flex-col">
              {/* <select
                 className="border border-gray-200 p-3 pr-10 rounded-lg bg-white appearance-none h-16 w-full shadow-md text-gray-700 font-medium cursor-pointer"
                style={{ backgroundColor: "#ffff" }}
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  sortData(e.target.value);
                }}
              >
                <option>Most Relevant</option>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Highest Price</option>
                <option>Lowest Price</option>
                
              </select> */}

              <div className="flex items-center space-x-2">
                {/* Left side label */}
                <label className="text-gray-700 font-semibold">
                  <Translate text={"Sort by:"} />
                </label>

                {/* Dropdown with arrow */}
                <div className="relative xl:w-64 w-40">
                  <select
                    className="border border-gray-200 xl:p-3 p-1 pr-10 rounded-lg bg-white appearance-none xl:h-16 h-10 w-full shadow-md text-gray-700 font-medium cursor-pointer"
                    style={{ backgroundColor: "#ffff" }}
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value);
                      sortData(e.target.value);
                    }}
                  >
                    <option value={"Most Relevant"}>
                      <Translate text={"Most Relevant"} />
                    </option>
                    <option value={"Newest"}>
                      <Translate text={"Newest"} />
                    </option>
                    <option value={"Oldest"}>
                      <Translate text={"Oldest"} />
                    </option>
                    <option value={"Highest Price"}>
                      <Translate text={"Highest Price"} />
                    </option>
                    <option value={"Lowest Price"}>
                      <Translate text={"Lowest Price"} />
                    </option>
                  </select>

                  {/* Dropdown Arrow (Right Side) */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 xl:w-20 w-12 xl:h-16 h-10 flex items-center justify-center rounded cursor-pointer border hover:text-red-500 hover:border-red-500 duration-300 ${
                    view === "grid"
                      ? "border-red-500 bg-red-500 duration-100"
                      : "border-gray-200"
                  }`}
                >
                  <FaTh className="w-1/2 h-1/2" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 xl:w-20 w-12 xl:h-16 h-10 flex items-center justify-center rounded cursor-pointer border hover:text-red-500 hover:border-red-500 duration-300 ${
                    view === "list"
                      ? "border-red-500 bg-red-500 duration-100"
                      : "border-gray-200"
                  }`}
                >
                  <FaList className="w-1/2 h-1/2" />
                </button>
              </div>
            </div>
          </div>
          <div
            className={`grid mb-10 ${
              view === "grid"
                ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "gap-6"
            }`}
          >
            {filteredData?.length > 0 ? (
              filteredData?.map((data, index) => (
                <Link to={`/listing/${data._id}`} key={data.id}>
                  <div
                    className={`relative shadow-sm rounded h-full ${
                      index < 0 ? "border-red-500 border-2 bg-[#FFEEE2]" : ""
                    }`} // Apply border to first two cards
                  >
                    {/* Add "Featured" badge */}

                    {/* {index < 2 && (
                      <div className="absolute top-5 left-5 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg z-10 pointer-events-none">
                        <Translate text={"Featured"} />
                      </div>
                    )} */}

                    {view === "grid" ? (
                      <>
                        <div className="flex flex-col-reverse gap-4 bg-slate-100 p-3 rounded">
                          <div className="relative w-full max-w-[350px]">
                            <Link to={`/listing/${data._id}`} key={data._id}>
                              <div className="overflow-hidden rounded-md">
                                <img
                                  alt=""
                                  src={`http://api.syriasouq.com/uploads/cars/${data.images[0]}`}
                                  className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                            <div className="flex items-center justify-between gap-2">
                              <h2 className="text-xl font-bold">
                                <span className="text-lg">$ </span>
                                <Translate
                                  text={data?.priceUSD ? data?.priceUSD : "آخر"}
                                />
                              </h2>
                            </div>
                            <div className="flex md:items-center md:flex-row flex-col md:gap-2 gap-0">
                              <h2 className="text-md">
                                {getLocalizedMake(data, currentLanguage)}
                              </h2>
                              <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                              <h2 className="text-md">
                                {getArabicModel(data, currentLanguage)}
                              </h2>
                            </div>
                            <div className="flex md:items-center md:flex-row flex-col md:gap-3 gap0">
                              <div className="flex items-center gap-1 text-md">
                                <CiCalendar />
                                <span>
                                  <Translate
                                    text={data?.year ? data?.year : "آخر"}
                                  />
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-md">
                                <AiOutlineDashboard />
                                <span>
                                  <Translate
                                    text={
                                      data?.kilometer ? data?.kilometer : "آخر"
                                    }
                                  />{" "}
                                  <Translate text={"km"} />
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-md">
                                <CiLocationOn />
                                <span>
                                  {data?.location
                                    ? getLocalizedLocation(
                                        data?.location,
                                        currentLanguage
                                      )
                                    : "آخر"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-2 md:mt-4">
                              <Link
                                to={`/listing/${data?._id}`}
                                className="block bg-[#B80200] text-white text-lg py-1 px-4 rounded"
                              >
                                <Translate text={"View Details"} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex md:flex-row flex-col-reverse gap-4 bg-slate-100 p-3 rounded">
                          <div className="relative w-full max-w-[350px]">
                            <Link to={`/listing/${data._id}`} key={data._id}>
                              <div className="overflow-hidden rounded-md">
                                <img
                                  alt=""
                                  src={`http://api.syriasouq.com/uploads/cars/${data.images[0]}`}
                                  className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                                />
                              </div>
                            </Link>
                            <div className="absolute top-2 right-2 flex items-center gap-2">
                              {/* <div
                                onClick={() => handleWishlist(data)}
                                className={`hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-white cursor-pointer text-white `}
                              >
                                <CiHeart className="w-1/2 h-1/2" />
                              </div> */}
                              {/* <div
                                onClick={() => handleShare(data)}
                                className={`hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-white cursor-pointer text-white`}
                              >
                                <CiShare2 className="w-1/2 h-1/2" />
                              </div> */}
                            </div>
                          </div>
                          <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                            <div className="flex items-center justify-between gap-2">
                              <h2 className="text-xl font-bold">
                                <span className="text-lg">$ </span>
                                <Translate
                                  text={data?.priceUSD ? data?.priceUSD : "آخر"}
                                />
                              </h2>
                              {/* <span className="block px-2 py-1 rounded bg-[#B80200] text-white text-xs">
                                {currentLanguage === "ar" ? "مميز" : "PREMIUM"}
                              </span> */}
                            </div>
                            <div className="flex items-center gap-2 md:mt-3">
                              <h2 className="text-sm">
                                {getLocalizedMake(data, currentLanguage)}
                              </h2>
                              <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                              <h2 className="text-sm">
                                {getArabicModel(data, currentLanguage)}
                              </h2>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm">
                                <CiCalendar />
                                <span>
                                  <Translate
                                    text={data?.year ? data?.year : "آخر"}
                                  />
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <AiOutlineDashboard />
                                <span>
                                  <Translate
                                    text={
                                      data?.kilometer ? data?.kilometer : "آخر"
                                    }
                                  />{" "}
                                  <Translate text={"km"} />
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm">
                                <CiLocationOn />
                                <span>
                                  {data?.location
                                    ? getLocalizedLocation(
                                        data?.location,
                                        currentLanguage
                                      )
                                    : "آخر"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mt-2 md:mt-4">
                              <Link
                                to={`/listing/${data?._id}`}
                                className="block bg-[#B80200] text-white text-lg py-1 px-4 rounded"
                              >
                                <Translate text={"View Details"} />
                              </Link>
                            </div>
                            {/* <div className="flex items-center justify-end gap-3 text-sm">
                              <Translate text={"Listed By:"} />{" "}
                              {data.user.username}
                            </div> */}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <h2 className="text-3xl text-red-600 text-center">
                <Translate text={"No Results Found"} />
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;