"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { CiCalendar, CiHeart, CiLocationOn, CiShare2 } from "react-icons/ci"
import { FaList, FaTh, FaTimes } from "react-icons/fa"
import { Link, useSearchParams } from "react-router-dom"
import Breadcrumb from "./Breadcumb"
import {
  allenginesize,
  arabicMakes,
  getArabicModel,
  getLocalizedLocation,
  getLocalizedMake,
  localizeEngineSize,
  makes,
  alllocation,
} from "../utils/utils"
import { useTranslation } from "react-i18next"
import Translate from "../utils/Translate"
import { AiOutlineDashboard } from "react-icons/ai"
import Slider from "rc-slider"
import "rc-slider/assets/index.css" // Import styles
import "./custom-slider.css" // Custom styles for black & gray theme
import { toast } from "react-toastify" // Import react-toastify
import "react-toastify/dist/ReactToastify.css" // Import react-toastify styles
import { ToastContainer } from "react-toastify" // Import ToastContainer
import { useWishlist } from "../context/WishlistContext" // Import WishlistContext

const SearchPage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language // Gets current language
  const { wishlist, handleWishlist, isWishlistLoading } = useWishlist() // Use WishlistContext

  const allTransmission = [
    { value: "automatic", label: "Automatic", arLabel: "اتوماتيك" },
    { value: "manual", label: "Manual", arLabel: "يدوي" },
    // more transmission types...
  ]
  const allFuelType = [
    { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Petrol", label: "Petrol" },
  ]
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
  ]
  const allInteriorColor = [
    { value: "Beige", label: "Beige" },
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
    { value: "Brown", label: "Brown" },
    { value: "Red", label: "Red" },
    { value: "White", label: "White" },
    { value: "Other", label: "Other" },
  ]

  const [searchParams] = useSearchParams()
  const make = searchParams.get("make")
  const [datas, setDatas] = useState([])
  const [isLoading, setIsLoading] = useState(true) // New state for loading
  const [view, setView] = useState("list")
  const [sortOption, setSortOption] = useState("Most Relevant")
  const [filters, setFilters] = useState({
    make: [],
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    kilometer: "",
    location: [], // Changed to array to support multiple selections
    engineSize: "",
    transmission: "",
    fuelType: [],
    exteriorColor: "",
    interiorColor: "",
  })

  const [currentImageIndices, setCurrentImageIndices] = useState({})
  // Track touch/swipe events
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    const make = searchParams.get("make")
    const location = searchParams.get("location") // Get location from URL

    if (make === "null" && location === "null") return // Skip if both are null

    const updatedFilters = { ...filters }

    // Handle make filter
    if (make && make !== "null") {
      if (currentLanguage === "ar" && make !== "الكل" && make !== "" && make !== "All") {
        const currentMake = arabicMakes.find((mk) => mk.value === make)?.enValue
        updatedFilters.make = [currentMake || ""]
      } else {
        updatedFilters.make = [make !== "All" && make !== "Other" && make !== "الكل" ? make : ""]
      }
    } else {
      updatedFilters.make = []
    }

    // Handle location filter
    if (location && location !== "null") {
      updatedFilters.location = [location !== "All" && location !== "الكل" ? location : ""]
    } else {
      updatedFilters.location = []
    }

    setFilters(updatedFilters)
  }, [searchParams, currentLanguage]) // Dependencies: searchParams, currentLanguage

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden" // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto" // Restore scrolling
    }

    // Cleanup on component unmount or when isMobileFilterOpen changes
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileFilterOpen])

  useEffect(() => {
    setIsLoading(true) // Set loading to true before fetching data
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars?status=available`)
      .then((res) => {
        setDatas(res.data.data)
        setIsLoading(false) // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log("Error fetching data:", error)
        setIsLoading(false) // Set loading to false even if there's an error
      })
  }, [])

  useEffect(() => {
    // Initialize current image indices
    const indices = {}
    datas.forEach((car) => {
      indices[car._id] = 0
    })
    setCurrentImageIndices(indices)
  }, [datas])

  const sortData = (option) => {
    let sortedData = [...datas]

    switch (option) {
      case "Newest":
        sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "Oldest":
        sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case "Highest Price":
        sortedData.sort((a, b) => b.priceUSD - a.priceUSD)
        break
      case "Lowest Price":
        sortedData.sort((a, b) => a.priceUSD - b.priceUSD)
        break
      case "Most Relevant":
        // Example: Sort by recent cars first, then by highest price
        sortedData.sort((a, b) => {
          const dateDiff = new Date(b.createdAt) - new Date(a.createdAt)
          if (dateDiff !== 0) return dateDiff
          return b.priceUSD - a.priceUSD
        })
        break
      default:
        // No sorting — keep original order
        sortedData = [...datas]
        break
    }

    setDatas(sortedData)
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      if (name === "fuelType" || name === "make" || name === "location") {
        setFilters((prev) => ({
          ...prev,
          [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value),
        }))
      }
    } else if (name === "make") {
      setFilters((prev) => ({ ...prev, make: [value] }))
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }))
    }
  }

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
    } = filters

    const matchesKilometer = !kilometer || (data.kilometer >= kilometer[0] && data.kilometer <= kilometer[1])

    const matchesEngineSize =
      !engineSize || engineSize === "Other" || engineSize === "Unknown" || data.engineSize === engineSize

    return (
      (make.length > 0
        ? make.some((m) =>
            String(data.make || "")
              .toLowerCase()
              .includes(m.toLowerCase()),
          )
        : true) &&
      (minYear ? data.year >= Number.parseInt(minYear, 10) : true) &&
      (maxYear ? data.year <= Number.parseInt(maxYear, 10) : true) &&
      (minPrice ? data.priceUSD >= Number.parseFloat(minPrice) : true) &&
      (maxPrice >= 110000 || (maxPrice ? data.priceUSD <= Number.parseFloat(maxPrice) : true)) &&
      matchesKilometer &&
      (location.length > 0
        ? location.some((loc) =>
            String(data.location || "")
              .toLowerCase()
              .includes(loc.toLowerCase()),
          )
        : true) &&
      matchesEngineSize &&
      (transmission ? data.transmission === transmission : true) &&
      (fuelType.length > 0 ? fuelType.includes(data.fuelType) : true) &&
      (!exteriorColor ||
        data.exteriorColor.toLowerCase() === exteriorColor.toLowerCase() ||
        (exteriorColor.toLowerCase() === "other" && !allExteriorColor.includes(data.exteriorColor.toLowerCase()))) &&
      (!interiorColor ||
        data.interiorColor.toLowerCase() === interiorColor.toLowerCase() ||
        (interiorColor.toLowerCase() === "other" && !allInteriorColor.includes(data.interiorColor.toLowerCase())))
    )
  })

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
        ]

  // Custom Handle component with tooltip
  const CustomHandle = (props) => {
    const { value, dragging, index, ...restProps } = props
    return (
      <div className="relative">
        <Slider.Handle value={value} {...restProps} />
        {dragging && (
          <div
            className="absolute -top-8 text-xs bg-gray-800 text-white px-2 py-1 rounded"
            style={{ transform: "translateX(-50%)" }}
          >
            {value}
          </div>
        )}
      </div>
    )
  }

  // Handle image navigation within a card
  const navigateImage = (carId, index) => {
    const car = datas.find((c) => c._id === carId)
    if (!car || !car.images || car.images.length <= 1) return

    setCurrentImageIndices((prev) => ({
      ...prev,
      [carId]: index,
    }))
  }

  // Handle swipe gestures
  const handleTouchStart = (e, carId) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, carId })
  }

  const handleTouchEnd = (e, carId) => {
    if (!touchStart || touchStart.carId !== carId) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const car = datas.find((c) => c._id === carId)
    if (!car || !car.images || car.images.length <= 1) return

    const swipeThreshold = 50 // Minimum swipe distance in pixels
    if (Math.abs(deltaX) > swipeThreshold) {
      setCurrentImageIndices((prev) => {
        const currentIndex = prev[carId] || 0
        let newIndex
        if (deltaX < 0) {
          // Swipe left (next)
          newIndex = (currentIndex + 1) % car.images.length
        } else {
          // Swipe right (prev)
          newIndex = (currentIndex - 1 + car.images.length) % car.images.length
        }
        return { ...prev, [carId]: newIndex }
      })
    }
    setTouchStart(null)
  }

  // Get visible navigation dots (up to 6)
  const getVisibleDots = (images, currentIndex) => {
    const totalImages = images.length
    if (totalImages <= 6) return images.map((_, index) => index)

    const halfWindow = 2 // Show 2 dots before and after current
    let start = Math.max(0, currentIndex - halfWindow)
    let end = Math.min(totalImages, start + 6)

    // Adjust if near the end
    if (end === totalImages) {
      start = Math.max(0, end - 6)
    }

    const visibleIndices = []
    for (let i = start; i < end; i++) {
      visibleIndices.push(i)
    }
    return visibleIndices
  }

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={currentLanguage === "ar"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={""} />
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
        </div>
      ) : (
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
              <h3 className="font-bold text-xl mb-4">{currentLanguage === "ar" ? "تحديد" : "Filters"}</h3>
              {/* Make */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{currentLanguage === "ar" ? "نوع السيارة" : "Make"}</label>
                <div>
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

              {/* // Year Filter (Desktop) */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  <Translate text={"Year"} />: {filters.minYear || 1920} - {filters.maxYear || 2025}
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
                  handle={CustomHandle}
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
              {/* // Price Filter (Desktop) */}
              <div className="mb-16" style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}>
              <label className="block text-gray-700 font-semibold mb-3">
    <Translate text={"Price"} /> ($): {filters.minPrice || 0} -{" "}
    {filters.maxPrice === 125000 || !filters.maxPrice
      ? currentLanguage === "ar" ? "الكل" : "Any"
      : filters.maxPrice}
  </label>
  <Slider
    key={currentLanguage}
    range
    min={0}
    max={125000}
    step={1000}
    marks={{
      0: `$0`,
      25000: `$25k`,
      50000: `$50k`,
      75000: `$75k`,
      100000: `$100k`,
      125000: currentLanguage === "ar" ? "الكل" : "Any",
    }}
    value={[Number(filters.minPrice) || 0, Number(filters.maxPrice) || 125000]}
    onChange={(value) =>
      setFilters((prev) => ({
        ...prev,
        minPrice: value[0],
        maxPrice: value[1],
      }))
    }
    handle={CustomHandle}
    direction={currentLanguage === "ar" ? "rtl" : "ltr"}
  />
</div>
              {/* // Kilometer Filter (Desktop) */}
              <div className="mb-16">
                <label className="block text-gray-700 font-semibold mb-3">
                  <Translate text={"Kilometer"} />: {filters.kilometer ? filters.kilometer[0] : 0} -{" "}
                  {filters.kilometer ? filters.kilometer[1] : currentLanguage === "ar" ? "الكل" : "Any"}{" "}
                  {currentLanguage === "ar" ? "كم" : "km"}
                </label>
                <Slider
    range
    min={0}
    max={200000}
    step={5000}
    marks={{
      0: `0 ${currentLanguage === "ar" ? "كم" : "km"}`,
      40000: `40k ${currentLanguage === "ar" ? "كم" : "km"}`,
      80000: `80k ${currentLanguage === "ar" ? "كم" : "km"}`,
      120000: `120k ${currentLanguage === "ar" ? "كم" : "km"}`,
      160000: `160k ${currentLanguage === "ar" ? "كم" : "km"}`,
      200000: currentLanguage === "ar" ? "الكل" : "Any",
    }}
    value={filters.kilometer || [0, 200000]}
    onChange={(value) => {
      setFilters((prev) => ({ ...prev, kilometer: value }))
    }}
    handle={CustomHandle}
  />
                <p
                  className={`text-center mt-2 text-sm font-medium text-red-600 ${
                    currentLanguage === "ar" && "flex-row-reverse"
                  }`}
                ></p>
              </div>

              {/* Location */}
              <div className="my-8 mt-16">
                <label className="block text-gray-700 mb-2">{currentLanguage === "ar" ? "الموقع" : "Location"}</label>
                <div>
                  {alllocation.map((loc) => (
                    <div key={loc.label} className="mb-2">
                      <input
                        type="checkbox"
                        name="location"
                        id={loc.value}
                        value={loc.value}
                        onChange={handleFilterChange}
                        checked={filters.location.includes(loc.value)}
                      />
                      <label className="mx-2" htmlFor={loc.value}>
                        {currentLanguage === "ar" ? loc.arLabel : loc.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Engine Size */}
              <div className="my-4">
                <label className="block text-gray-700 mb-2">
                {currentLanguage === "ar" ? `عدد الاسطوانات` : `Number Of Cylinders`}
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
                      <Translate text={"Select Number Of Cylinders"} />
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
                      checked={trans.value === filters.transmission && filters.transmission !== ""}
                    />
                    <label className="mx-2" htmlFor={trans.value}>
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
                    <label className="mx-2">
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
                    {currentLanguage === "ar" ? `اللون الخارجي` : "Select Exteriror Color"}
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
                  {currentLanguage === "ar" ? "تطبيق الفلترة" : "Apply Filters"}
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
                      location: [],
                      engineSize: "",
                      transmission: "",
                      fuelType: [],
                      exteriorColor: "",
                      interiorColor: "",
                    })
                  }
                >
                  {currentLanguage === "ar" ? "إعادة تعيين الفلترة" : "Reset Filters"}
                </button>
              </div>
            </div>

            {isMobileFilterOpen && (
              <>
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-700/50 z-[999999] p-5">
                  <button>
                    <FaTimes className="text-4xl text-white" onClick={() => setIsMobileFilterOpen(false)} />
                  </button>
                  <div className="xl:col-span-2 col-span-8 shadow rounded p-4 bg-slate-50 h-full overflow-scroll mb-4">
                    <h3 className="font-bold text-xl mb-4">{currentLanguage === "ar" ? "تحديد" : "Filters"}</h3>
                    {/* Make */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        {currentLanguage === "ar" ? "نوع السيارة" : "Make"}
                      </label>
                      <div>
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

                    {/* // Year Filter (Mobile) */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-semibold mb-3">
                        <Translate text={"Year"} />: {filters.minYear || 1920} - {filters.maxYear || 2025}
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
                        handle={CustomHandle}
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

                    {/* // Price Filter (Mobile) */}
                    <div className="mb-14" style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}>
                    <label className="block text-gray-700 font-semibold mb-3">
    <Translate text={"Price"} /> ($): {filters.minPrice || 0} -{" "}
    {filters.maxPrice === 125000 || !filters.maxPrice
      ? currentLanguage === "ar" ? "الكل" : "Any"
      : filters.maxPrice}
  </label>
  <Slider
    key={currentLanguage}
    range
    min={0}
    max={125000}
    step={1000}
    marks={{
      0: `$0`,
      25000: `$25k`,
      50000: `$50k`,
      75000: `$75k`,
      100000: `$100k`,
      125000: currentLanguage === "ar" ? "الكل" : "Any",
    }}
    value={[Number(filters.minPrice) || 0, Number(filters.maxPrice) || 125000]}
    onChange={(value) =>
      setFilters((prev) => ({
        ...prev,
        minPrice: value[0],
        maxPrice: value[1],
      }))
    }
    handle={CustomHandle}
    direction={currentLanguage === "ar" ? "rtl" : "ltr"}
  />
</div>

                    {/* // Kilometer Filter (Mobile) */}
                    <div className="mb-10">
                      <label className="block text-gray-700 font-semibold mb-3">
                        <Translate text={"Kilometer"} />: {filters.kilometer ? filters.kilometer[0] : 0} -{" "}
                        {filters.kilometer ? filters.kilometer[1] : currentLanguage === "ar" ? "الكل" : "Any"}{" "}
                        {currentLanguage === "ar" ? "كم" : "km"}
                      </label>
                      <Slider
    range
    min={0}
    max={200000}
    step={5000}
    marks={{
      0: `0 ${currentLanguage === "ar" ? "كم" : "km"}`,
      40000: `40k ${currentLanguage === "ar" ? "كم" : "km"}`,
      80000: `80k ${currentLanguage === "ar" ? "كم" : "km"}`,
      120000: `120k ${currentLanguage === "ar" ? "كم" : "km"}`,
      160000: `160k ${currentLanguage === "ar" ? "كم" : "km"}`,
      200000: currentLanguage === "ar" ? "الكل" : "Any",
    }}
    value={filters.kilometer || [0, 200000]}
    onChange={(value) => {
      setFilters((prev) => ({ ...prev, kilometer: value }))
    }}
    handle={CustomHandle}
  />
                      <p
                        className={`text-center mt-2 text-sm font-medium text-red-600 ${
                          currentLanguage === "ar" && "flex-row-reverse"
                        }`}
                      ></p>
                    </div>

                    {/* Location */}
                    <div className="my-8 mt-16">
                      <label className="block text-gray-700 mb-2">
                        {currentLanguage === "ar" ? "الموقع" : "Location"}
                      </label>
                      <div>
                        {alllocation.map((loc) => (
                          <div key={loc.label} className="mb-2">
                            <input
                              type="checkbox"
                              name="location"
                              id={loc.value}
                              value={loc.value}
                              onChange={handleFilterChange}
                              checked={filters.location.includes(loc.value)}
                            />
                            <label className="mx-2" htmlFor={loc.value}>
                              {currentLanguage === "ar" ? loc.arLabel : loc.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Engine Size */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        {currentLanguage === "ar" ? `عدد الاسطوانات` : `Number Of Cylinders`}
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
                            {/* <Translate text={""} /> */}
                            {currentLanguage === "ar" ? `حدد عدد السلندر` : `Select Number Cylinders`}

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
                            type="checkbox"
                            name="transmission"
                            id={trans.value}
                            value={trans.value}
                            onChange={handleFilterChange}
                            checked={trans.value === filters.transmission && filters.transmission !== ""}
                          />
                          <label className="mx-2" htmlFor={trans.value}>
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
                          <label className="mx-2">
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
                          {currentLanguage === "ar" ? `اللون الخارجي` : "Select Exteriror Color"}
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
                      <button
                        className="text-white bg-[#fb2c36] w-full py-2 rounded cursor-pointer"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        {currentLanguage === "ar" ? "تطبيق الفلترة" : "Apply Filters"}
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
                            location: [],
                            engineSize: "",
                            transmission: "",
                            fuelType: [],
                            exteriorColor: "",
                            interiorColor: "",
                          })
                        }
                      >
                  {currentLanguage === "ar" ? "إعادة تعيين الفلترة" : "Reset Filters"}
                  </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="xl:col-span-6 col-span-8">
            <div className="flex justify-between xl:items-center mb-4 p-2 rounded bg-transparent xl:flex-row flex-col">
              <h2 className="xl:text-[24px] text-[18px] font-semibold mr-4 mb-2">
                {filteredData?.length} <Translate text={"Results"} />{" "}
                <span className="text-red-500 xl:text-[15px] text-[12px]">
                  <Translate text={"Classified Ads"} />
                </span>
              </h2>
              <div className="flex xl:items-center gap-8 xl:flex-row flex-col">
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
                        setSortOption(e.target.value)
                        sortData(e.target.value)
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
                      view === "grid" ? "border-red-500 bg-red-500 duration-100" : "border-gray-200"
                    }`}
                  >
                    <FaTh className="w-1/2 h-1/2" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 xl:w-20 w-12 xl:h-16 h-10 flex items-center justify-center rounded cursor-pointer border hover:text-red-500 hover:border-red-500 duration-300 ${
                      view === "list" ? "border-red-500 bg-red-500 duration-100" : "border-gray-200"
                    }`}
                  >
                    <FaList className="w-1/2 h-1/2" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`grid mb-10 ${view === "grid" ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "gap-6"}`}
            >
              {filteredData?.length > 0 ? (
                filteredData?.map((data, index) => (
                  <div key={data.id}>
                    <div
                      className={`relative shadow-sm rounded h-full ${
                        index < 0 ? "border-red-500 border-2 bg-[#FFEEE2]" : ""
                      }`} // Apply border to first two cards
                    >
                      {view === "grid" ? (
                        <>
                          <div className="relative flex flex-col-reverse gap-4 bg-slate-100 p-3 rounded">
                            {/* Share Button */}
                            <div
                              className={`absolute top-2 ${currentLanguage === "ar" ? "left-2" : "right-2"} flex items-center gap-2`}
                            >
                              <div
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const url = `${window.location.origin}/listing/${data._id}`
                                  const title = `${getLocalizedMake(data, currentLanguage)} ${getArabicModel(data, currentLanguage)}`
                                  if (navigator.share) {
                                    navigator
                                      .share({
                                        title: title,
                                        url: url,
                                      })
                                      .catch((err) => {
                                        console.error("Share failed: ", err)
                                        toast.error(
                                          currentLanguage === "ar" ? "فشل في مشاركة الرابط!" : "Failed to share URL!",
                                          {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                          },
                                        )
                                      })
                                  } else {
                                    navigator.clipboard
                                      .writeText(url)
                                      .then(() => {
                                        toast.success(
                                          currentLanguage === "ar"
                                            ? "تم نسخ رابط الإعلان إلى الحافظة!"
                                            : "Listing URL copied to clipboard!",
                                          {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                          },
                                        )
                                      })
                                      .catch((err) => {
                                        console.error("Failed to copy URL: ", err)
                                        toast.error(
                                          currentLanguage === "ar" ? "فشل في مشاركة الرابط!" : "Failed to copy URL!",
                                          {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                          },
                                        )
                                      })
                                  }
                                }}
                                className="hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600"
                              >
                                <CiShare2 className="w-[75%] h-[75%]" />
                              </div>
                            </div>
                            <Link to={`/listing/${data._id}`}>
                              <div className="relative w-full max-w-[400px]">
                                <div
                                  className="overflow-hidden rounded-md max-w-[400px]"
                                  onTouchStart={(e) => handleTouchStart(e, data._id)}
                                  onTouchEnd={(e) => handleTouchEnd(e, data._id)}
                                >
                                  <img
                                    alt=""
                                    src={`http://api.syriasouq.com/uploads/cars/${data.images[currentImageIndices[data._id] || 0]}`}
                                    className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out sm:h-56"
                                  />
                                  {/* Navigation Dots */}
                                  {data.images && data.images.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                                      {getVisibleDots(data.images, currentImageIndices[data._id] || 0).map((index) => (
                                        <button
                                          key={index}
                                          onClick={() => navigateImage(data._id, index)}
                                          className={`w-2 h-2 rounded-full ${
                                            index === (currentImageIndices[data._id] || 0)
                                              ? "bg-white"
                                              : "bg-gray-400"
                                          }`}
                                          aria-label={`Go to image ${index + 1}`}
                                        />
                                      ))}
                                    </div>
                                  )}
                                  {/* Wishlist Button on Image */}
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      if (!isWishlistLoading) {
                                        handleWishlist(data)
                                      }
                                    }}
                                    className={`absolute top-2 ${currentLanguage === "ar" ? "left-2" : "right-2"} hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600 ${
                                      wishlist.some((item) => item.car?._id === data._id)
                                        ? "bg-[#B80200] border-[#B80200] text-white"
                                        : "bg-white"
                                    } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                  >
                                    <CiHeart className="w-[75%] h-[75%]" />
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                              <div className="flex items-center justify-between gap-2">
                              <h2 className="text-2xl font-bold text-[#B80200]">
  <span className="text-2xl">$ </span>
  {data?.priceUSD ? Number(data?.priceUSD).toLocaleString('en-US') : "آخر"}
</h2>
                              </div>
                              <div className="flex items-center flex-row gap-2 ">
                                <h2 className="text-md font-bold">{getLocalizedMake(data, currentLanguage)}</h2>
                                <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                              </div>
                              <div>
                              <h2 className="text-md font-bold">{getArabicModel(data, currentLanguage)}</h2>

                              </div>
                              <div className="flex items-center flex-row md:gap-3 gap-1">
                                <div className="flex items-center gap-1 text-md">
                                  <CiCalendar />
                                  <span>
                                    <Translate text={data?.year ? data?.year : "آخر"} />
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-md">
                                  <AiOutlineDashboard />
                                  <span>
                                    <Translate text={data?.kilometer ? data?.kilometer : "آخر"} />{" "}
                                    <Translate text={"km"} />
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-md">
                                  <CiLocationOn />
                                  <span>
                                    {data?.location ? getLocalizedLocation(data?.location, currentLanguage) : "آخر"}
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
                          <div className="relative flex md:flex-row flex-col-reverse gap-4 bg-slate-100 p-3 rounded">
                            {/* Share Button */}
                            <div
                              className={`absolute top-2 ${currentLanguage === "ar" ? "left-2" : "right-2"} flex items-center gap-2`}
                            >
                              <div
                                onClick={(e) => {
                                  e.stopPropagation() // Prevent the Link click event
                                  const url = `${window.location.origin}/listing/${data._id}`
                                  const title = `${getLocalizedMake(data, currentLanguage)} ${getArabicModel(data, currentLanguage)}`
                                  if (navigator.share) {
                                    navigator
                                      .share({
                                        title: title,
                                        url: url,
                                      })
                                      .catch((err) => {
                                        console.error("Share failed: ", err)
                                        toast.error(
                                          currentLanguage === "ar" ? "فشل في مشاركة الرابط!" : "Failed to share URL!",
                                          {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                          },
                                        )
                                      })
                                  } else {
                                    navigator.clipboard
                                      .writeText(url)
                                      .then(() => {
                                        toast.success(
                                          currentLanguage === "ar"
                                            ? "تم نسخ رابط الإعلان إلى الحافظة!"
                                            : "Listing URL copied to clipboard!",
                                          {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                          },
                                        )
                                      })
                                      .catch((err) => {
                                        console.error("Failed to copy URL: ", err)
                                        toast.error(
                                          currentLanguage === "ar" ? "فشل في مشاركة الرابط!" : "Failed to copy URL!",
                                          {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                          },
                                        )
                                      })
                                  }
                                }}
                                className="hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600"
                              >
                                <CiShare2 className="w-[75%] h-[75%]" />
                              </div>
                            </div>
                            <Link to={`/listing/${data._id}`}>
                              <div className="relative w-full max-w-[400px]">
                                <div
                                  className="overflow-hidden rounded-md"
                                  onTouchStart={(e) => handleTouchStart(e, data._id)}
                                  onTouchEnd={(e) => handleTouchEnd(e, data._id)}
                                >
                                  <img
                                    alt=""
                                    src={`http://api.syriasouq.com/uploads/cars/${data.images[currentImageIndices[data._id] || 0]}`}
                                    className="h-56 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                                  />
                                  {/* Navigation Dots */}
                                  {data.images && data.images.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                                      {getVisibleDots(data.images, currentImageIndices[data._id] || 0).map((index) => (
                                        <button
                                          key={index}
                                          onClick={() => navigateImage(data._id, index)}
                                          className={`w-2 h-2 rounded-full ${
                                            index === (currentImageIndices[data._id] || 0)
                                              ? "bg-white"
                                              : "bg-gray-400"
                                          }`}
                                          aria-label={`Go to image ${index + 1}`}
                                        />
                                      ))}
                                    </div>
                                  )}
                                  {/* Wishlist Button on Image */}
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault() // Prevent default behavior
                                      e.stopPropagation() // Stop event from bubbling up to parent Link
                                      if (!isWishlistLoading) {
                                        handleWishlist(data)
                                      }
                                    }}
                                    className={`absolute top-2 ${currentLanguage === "ar" ? "left-2" : "right-2"} hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600 ${
                                      wishlist.some((item) => item.car?._id === data._id)
                                        ? "bg-[#B80200] border-[#B80200] text-white"
                                        : "bg-white"
                                    } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                  >
                                    <CiHeart className="w-1/2 h-1/2" />
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                              <div className="flex items-center justify-between gap-2">
                              <h2 className="text-2xl font-bold text-[#B80200]">
  <span className="text-2xl">$ </span>
  {data?.priceUSD ? Number(data?.priceUSD).toLocaleString('en-US') : "آخر"}
</h2>
                              </div>
                              <div className="flex items-center gap-2 md:mt-3">
                                <h2 className="text-md font-bold">{getLocalizedMake(data, currentLanguage)}</h2>
                                <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                                <h2 className="text-md font-bold">{getArabicModel(data, currentLanguage)}</h2>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-md">
                                  <CiCalendar />
                                  <span>
                                    <Translate text={data?.year ? data?.year : "آخر"} />
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-md">
                                  <AiOutlineDashboard />
                                  <span>
                                    <Translate text={data?.kilometer ? data?.kilometer : "آخر"} />{" "}
                                    <Translate text={"km"} />
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-md">
                                  <CiLocationOn />
                                  <span>
                                    {data?.location ? getLocalizedLocation(data?.location, currentLanguage) : "آخر"}
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
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-3xl text-red-600 text-center">
                  <Translate text={"No Results Found"} />
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage