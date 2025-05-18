"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { AiOutlineDashboard } from "react-icons/ai"
import { CiCalendar, CiHeart, CiLocationOn, CiShare2 } from "react-icons/ci"
import { TiArrowRight } from "react-icons/ti"
import { Link } from "react-router-dom"
import Translate from "../utils/Translate"
import { useTranslation } from "react-i18next"
import { getArabicModel, getLocalizedLocation, getLocalizedMake } from "../utils/utils"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useWishlist } from "../context/WishlistContext"

const Featured = () => {
  const [cars, setCars] = useState([])
  const { wishlist, handleWishlist, isWishlistLoading } = useWishlist()
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  // Track current image index for each car
  const [currentImageIndices, setCurrentImageIndices] = useState({})
  // Track touch/swipe events
  const [touchStart, setTouchStart] = useState(null)

  // Debug: Log wishlist to verify its contents
  useEffect(() => {
    console.log("Wishlist in Featured:", wishlist)
  }, [wishlist])

  // Fetch all cars when component mounts or when wishlist or currentLanguage changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carRes = await axios.get(`${import.meta.env.VITE_API_URL}/cars?status=available`);
        // Sort by _id (or another field) and slice to get the latest 8
        const sortedCars = carRes.data.data
          .sort((a, b) => new Date(b._id) - new Date(a._id)) // Adjust sorting field
          .slice(0, 8);
        setCars(sortedCars);
        console.log("Fetched cars:", sortedCars); // Debug log
  
        // Initialize current image indices
        const indices = {};
        sortedCars.forEach((car) => {
          indices[car._id] = 0;
        });
        setCurrentImageIndices(indices);
      } catch (error) {
        console.log("Error fetching cars:", error);
        toast.error(
          currentLanguage === "ar" ? "فشل في جلب السيارات" : "Failed to fetch cars",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    };
  
    fetchData();
  }, [currentLanguage, wishlist]);

  const handleShare = (car) => {
    const url = `${window.location.origin}/listing/${car._id}`
    const title = `${getLocalizedMake(car, currentLanguage)} ${getArabicModel(car, currentLanguage)}`
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch((err) => {
          console.error("Share failed: ", err)
          toast.error(currentLanguage === "ar" ? "فشل في مشاركة الرابط!" : "Failed to share URL!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        })
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success(
            currentLanguage === "ar" ? "تم نسخ رابط الإعلان إلى الحافظة!" : "Listing URL copied to clipboard!",
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
          toast.error(currentLanguage === "ar" ? "فشل في نسخ الرابط!" : "Failed to copy URL!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        })
    }
  }

  // Handle image navigation within a card
  const navigateImage = (carId, index) => {
    const car = cars.find((c) => c._id === carId)
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
    const car = cars.find((c) => c._id === carId)
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

  return (
    <div className="container mx-auto  w-screen ">
       <h2 className="text-md sm:text-2xl font-semibold text-black text- bg-slate-100 py-4 text-center">
            {/* <Translate text={"Buy & Sell with Syria Souq"} /> */}

            {currentLanguage === "ar" ? "بيع وشراء مع سيريا سوق " : "Buy & Sell with Syria Souq"}
           
          </h2>
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
      <div className="header flex flex-col md:flex-row justify-between flex-wrap items-center m-8">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352]">
            <Translate text={"Recent listings"} />
          </h2>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Link to={"/search?make=All"}>
            <button className="bg-[#B80200] text-white text-[16px] sm:text-[18px] font-[400] justify-between py-3 sm:py-4 px-8 sm:px-12 rounded-md flex items-center gap-2 cursor-pointer">
              <Translate text={"View All"} />
              <span>
              <TiArrowRight className={currentLanguage === "ar" ? "rotate-180" : ""} />
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 px-4 sm:px-8 md:px-16">
        {cars.length > 0 ? (
          cars.map((data) => (
            <div key={data._id} className="flex md:flex-row flex-col-reverse gap-4 bg-slate-100 p-3 rounded relative">
              <div
                className={`absolute top-2 ${currentLanguage === "ar" ? "left-2" : "right-2"} flex items-center gap-2`}
              >
                <div
                  onClick={() => handleShare(data)}
                  className="hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600"
                >
                  <CiShare2 className="w-[75%] h-[75%]" />
                </div>
              </div>
              <div className="relative w-full max-w-[420px]">
                <Link to={`/listing/${data._id}`}>
                  <div
                    className="overflow-hidden rounded-md relative"
                    onTouchStart={(e) => handleTouchStart(e, data._id)}
                    onTouchEnd={(e) => handleTouchEnd(e, data._id)}
                  >
                    <img
                      alt=""
                      src={`http://api.syriasouq.com/uploads/cars/${data.images[currentImageIndices[data._id] || 0]}`}
                      className="h-56 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                    />
                  </div>
                </Link>
                <div className=" flex items-center gap-2">
                  <div
                    onClick={() => handleWishlist(data)}
                    className={`absolute top-2 ${
                      currentLanguage === "ar" ? "right-2" : "left-2"
                    } hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600 ${
                      wishlist.some((item) => item.car?._id === data._id)
                        ? "bg-[#B80200] border-[#B80200] text-white"
                        : "bg-white"
                    } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <CiHeart className="w-[75%] h-[75%]" />
                  </div>
                </div>
                {/* Navigation Dots */}
                {data.images && data.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {data.images.map((_, index) => (
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
              </div>
              <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-[#B80200]">
  <span className="text-2xl">$ </span>
  {data?.priceUSD ? Number(data?.priceUSD).toLocaleString('en-US') : "آخر"}
</h2>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-md font-bold">{data?.make ? getLocalizedMake(data, currentLanguage) : "آخر"}</h2>
                  <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                  <h2 className="text-md font-bold">{data?.model ? getArabicModel(data, currentLanguage) : "آخر"}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-md">
                    <CiCalendar />
                    <span>{data?.year ? <Translate text={data?.year} /> : "آخر"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-md">
                    <AiOutlineDashboard />
                    <span>
                      {data?.kilometer ? <Translate text={data?.kilometer} /> : "آخر"} <Translate text={"km"} />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-md">
                    <CiLocationOn />
                    <span>{data?.location ? getLocalizedLocation(data?.location, currentLanguage) : "آخر"}</span>
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
          ))
        ) : (
          <div className="">
            <h2 className="text-3xl text-[#B80200] text-center">No Result Found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Featured