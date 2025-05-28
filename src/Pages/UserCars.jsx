"use client"

import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { CiShare2, CiHeart, CiCalendar, CiLocationOn } from "react-icons/ci"
import { AiOutlineDashboard } from "react-icons/ai"
import Translate from "../utils/Translate"
import {
  getArabicModel,
  getLocalizedLocation,
  getLocalizedMake,
} from "../utils/utils"
import { motion } from "framer-motion"

const UserCars = () => {
  const { userId } = useParams()
  const [user,setUser]=useState()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentImageIndices, setCurrentImageIndices] = useState({})
  const [wishlist, setWishlist] = useState([])
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.language

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars/user/${userId}`)
        setUser(response.data.data[0].user)
        setCars(response.data.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching user cars:", err)
        setError(t("error.fetchingCars"))
        setLoading(false)
      }
    }
    fetchUserCars()
  }, [userId, t])

  const navigateImage = (carId, index) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [carId]: index,
    }))
  }

  const handleWishlist = async (car) => {
    setIsWishlistLoading(true)
    try {
      console.log("Adding/removing car to wishlist:", car._id)
      setWishlist((prev) =>
        prev.some((item) => item.car?._id === car._id)
          ? prev.filter((item) => item.car?._id !== car._id)
          : [...prev, { car }],
      )
    } catch (error) {
      console.error("Error updating wishlist:", error)
    } finally {
      setIsWishlistLoading(false)
    }
  }

  const handleShare = (car) => {
    console.log("Sharing car:", car._id)
    const shareUrl = `${window.location.origin}/listing/${car._id}`
    if (navigator.share) {
      navigator.share({
        title: `${car.make} ${car.model}`,
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert(t("linkCopied"))
    }
  }

  const handleTouchStart = (e, carId) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    e.target.dataset.startX = startX
  }

  const handleTouchEnd = (e, carId) => {
    const startX = parseFloat(e.target.dataset.startX)
    const endX = e.changedTouches[0].clientX
    const swipeDistance = endX - startX
    const swipeThreshold = 50
    const currentIndex = currentImageIndices[carId] || 0
    const imagesLength = cars.find((car) => car._id === carId)?.images?.length || 1

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        navigateImage(carId, currentIndex === 0 ? imagesLength - 1 : currentIndex - 1)
      } else {
        navigateImage(carId, currentIndex === imagesLength - 1 ? 0 : currentIndex + 1)
      }
    }
  }

  if (loading) {
    return (
      <div className="pt-24 px-4 sm:px-6 md:px-16 lg:px-28 pb-safe bg-gradient-to-b min-h-screen flex items-center justify-center">
        <div className="loader border-t-2 border-[#B80200] h-10 w-10 animate-spin rounded-full"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-24 px-4 sm:px-6 md:px-16 lg:px-28 pb-safe bg-gradient-to-b min-h-screen flex items-center justify-center">
        <p className="text-xl text-[#B80200]">{error}</p>
      </div>
    )
  }

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-16 lg:px-28 pb-safe bg-gradient-to-b min-h-screen">
      <motion.h2
        className="mb-6 sm:mb-8 mt-5 sm:mt-7 text-xl sm:text-2xl font-bold text-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {currentLanguage === "ar" ? "سيارات المستخدم" : "User's Cars"}
      </motion.h2>
        {/* Profile Circle with Username and Phone */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-gray-400 shadow-xl flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {user?.profileImage ? (
              <img
              // src={`http://localhost:5001${user.profileImage}`}

                src={`http://api.syriasouq.com${user.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold">
                {user?.username?.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          {/* Display Username and Phone Number */}
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {user?.username || "N/A"}
            </span>
            <span className="text-sm text-gray-600">
              {user?.phone || "N/A"}
            </span>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
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

export default UserCars