"use client"

import { useNavigate, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { FaCheck } from "react-icons/fa"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/zoom"
import { Navigation, Zoom } from "swiper/modules"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { MdErrorOutline, MdOutlinePhone } from "react-icons/md"

import Breadcrumb from "./Breadcumb"
import MoreFromUser from "./MoreFromUser"
import Translate from "../utils/Translate"
import { useTranslation } from "react-i18next"
import { TiMessages } from "react-icons/ti"
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { AiOutlineDashboard } from "react-icons/ai"
import {
  getArabicModel,
  getLocalizedFeature,
  getLocalizedLocation,
  getLocalizedMake,
  localizeEngineSize,
} from "../utils/utils"
import { motion, AnimatePresence } from "framer-motion"

const CarDetails = () => {
  const { id } = useParams()
  const [carDetails, setCarDetails] = useState({})
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const [showMoreFeatures, setShowMoreFeatures] = useState(false)
  const [relatedCars, setRelatedCars] = useState([])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const swiperRef = useRef(null)
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.language
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportForm, setReportForm] = useState({
    reason: "",
    description: "",
    contact: "",
    phone: "",
  })
  const [reportError, setReportError] = useState("")
  const [isReportSubmitting, setIsReportSubmitting] = useState(false)

  // Modern zoom functionality
  const [imageTransform, setImageTransform] = useState({
    scale: 1,
    positionX: 0,
    positionY: 0,
    initialScale: 1,
    initialPositionX: 0,
    initialPositionY: 0,
  })
  const imageContainerRef = useRef(null)
  const startPointRef = useRef({ x: 0, y: 0 })
  const lastPointRef = useRef({ x: 0, y: 0 })
  const pinchStartDistanceRef = useRef(null)
  const isZoomingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const doubleTapTimerRef = useRef(null)
  const lastTapTimeRef = useRef(0)
  // Swipe functionality
  const swipeStartXRef = useRef(null)
  const swipeThreshold = 50 // Minimum distance for a swipe to be detected

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then((res) => {
        console.log(res)
        setCarDetails(res.data.data)
      })
      .catch((error) => {
        console.log("error fetching data:", error)
      })
  }, [id])

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
  
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.on("slideChange", () => {
        swiperInstance.zoom.out();
      });
  
      const swiperContainer = swiperRef.current;
      const navButtons = swiperContainer.querySelectorAll(
        ".swiper-button-next, .swiper-button-prev"
      );
      navButtons.forEach((button) => {
        button.classList.add("!text-[#B80200]", "!w-10", "!h-10");
      });
    }
  }, [currentLanguage]);
  const handleProfileClick = () => {
    if (carDetails?.user?._id) {
      navigate(`/user-cars/${carDetails.user._id}`);
    }
  };
  const startNewChat = async (receiver) => {
    if (isChatLoading) return
    setIsChatLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/conversations`,
        {
          recipientId: receiver._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        },
      )

      if (response.data) {
        navigate("/messages", { replace: true })
      }
    } catch (error) {
      console.error("Error starting new chat", error)
    } finally {
      setIsChatLoading(false)
    }
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => {
        console.log(res)
        setRelatedCars(res.data.data)
      })
      .catch((error) => {
        console.log("error fetching data:", error)
      })
  }, [carDetails])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const openImageModal = (index) => {
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
    resetZoom()
    document.body.style.overflow = "hidden"
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    document.body.style.overflow = "auto"
  }

  // Reset zoom state
  const resetZoom = () => {
    setImageTransform({
      scale: 1,
      positionX: 0,
      positionY: 0,
      initialScale: 1,
      initialPositionX: 0,
      initialPositionY: 0,
    })
    isZoomingRef.current = false
    isDraggingRef.current = false
  }

  // Handle double tap/click to zoom
  const handleDoubleTap = (e) => {
    e.preventDefault()

    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300 // ms

    if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
      clearTimeout(doubleTapTimerRef.current)

      if (imageTransform.scale > 1) {
        resetZoom()
      } else {
        const rect = imageContainerRef.current.getBoundingClientRect()
        const x = e.clientX || (e.touches && e.touches[0].clientX) || rect.width / 2
        const y = e.clientY || (e.touches && e.touches[0].clientY) || rect.height / 2

        const offsetX = x - rect.left - rect.width / 2
        const offsetY = y - rect.top - rect.height / 2

        setImageTransform({
          scale: 2.5,
          positionX: -offsetX,
          positionY: -offsetY,
          initialScale: 2.5,
          initialPositionX: -offsetX,
          initialPositionY: -offsetY,
        })
      }
    } else {
      doubleTapTimerRef.current = setTimeout(() => {}, DOUBLE_TAP_DELAY)
    }

    lastTapTimeRef.current = now
  }

  // Handle touch start for dragging, pinch zoom, and swipe
  const handleTouchStart = (e) => {
    e.preventDefault()

    if (e.touches.length === 1) {
      swipeStartXRef.current = e.touches[0].clientX // Store swipe start position
      startPointRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
      lastPointRef.current = { ...startPointRef.current }
      isDraggingRef.current = imageTransform.scale > 1 // Enable dragging only if zoomed
    } else if (e.touches.length === 2) {
      isZoomingRef.current = true
      isDraggingRef.current = false

      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDistanceRef.current = Math.sqrt(dx * dx + dy * dy)

      setImageTransform((prev) => ({
        ...prev,
        initialScale: prev.scale,
        initialPositionX: prev.positionX,
        initialPositionY: prev.positionY,
      }))

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2

      startPointRef.current = { x: midX, y: midY }
      lastPointRef.current = { ...startPointRef.current }
    }
  }

  // Handle touch move for dragging, pinch zoom, and swipe
  const handleTouchMove = (e) => {
    if (!isDraggingRef.current && !isZoomingRef.current && e.touches.length !== 1) return
    e.preventDefault()

    if (isZoomingRef.current && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)

      let newScale = (distance / pinchStartDistanceRef.current) * imageTransform.initialScale
      newScale = Math.max(1, Math.min(5, newScale))

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2

      const dragDeltaX = midX - lastPointRef.current.x
      const dragDeltaY = midY - lastPointRef.current.y

      lastPointRef.current = { x: midX, y: midY }

      const scaleFactor = newScale / imageTransform.scale
      const newPositionX = imageTransform.positionX * scaleFactor + dragDeltaX
      const newPositionY = imageTransform.positionY * scaleFactor + dragDeltaY

      setImageTransform((prev) => ({
        ...prev,
        scale: newScale,
        positionX: newPositionX,
        positionY: newPositionY,
      }))
    } else if (isDraggingRef.current && e.touches.length === 1) {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      const deltaX = x - lastPointRef.current.x
      const deltaY = y - lastPointRef.current.y

      lastPointRef.current = { x, y }

      setImageTransform((prev) => ({
        ...prev,
        positionX: prev.positionX + deltaX,
        positionY: prev.positionY + deltaY,
      }))
    } else if (e.touches.length === 1) {
      // Update last point for swipe detection
      lastPointRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }
  }

  // Handle touch end for dragging, pinch zoom, and swipe
  const handleTouchEnd = (e) => {
    if (e.touches.length === 0 && swipeStartXRef.current !== null && !isZoomingRef.current) {
      const swipeEndX = lastPointRef.current.x
      const swipeDistance = swipeEndX - swipeStartXRef.current
      const swipeYDistance = lastPointRef.current.y - startPointRef.current.y

      // Only process swipe if vertical movement is minimal to avoid conflicts with drag
      if (Math.abs(swipeDistance) > swipeThreshold && Math.abs(swipeYDistance) < 50) {
        if (swipeDistance > 0) {
          // Swipe right: go to previous image
          setCurrentImageIndex((prev) => (prev === 0 ? carDetails?.images?.length - 1 : prev - 1))
        } else {
          // Swipe left: go to next image
          setCurrentImageIndex((prev) => (prev === carDetails?.images?.length - 1 ? 0 : prev + 1))
        }
        resetZoom()
      }
    }

    isDraggingRef.current = false
    isZoomingRef.current = false
    swipeStartXRef.current = null

    if (imageTransform.scale < 1.05) {
      resetZoom()
    }
  }

  // Handle mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault()

    const rect = imageContainerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const offsetX = mouseX - rect.width / 2
    const offsetY = mouseY - rect.height / 2

    const delta = -Math.sign(e.deltaY)
    const zoomFactor = delta > 0 ? 1.1 : 0.9

    let newScale = imageTransform.scale * zoomFactor
    newScale = Math.max(1, Math.min(5, newScale))

    if (newScale === 1) {
      resetZoom()
    } else {
      const newPositionX = offsetX - (offsetX - imageTransform.positionX) * (newScale / imageTransform.scale)
      const newPositionY = offsetY - (offsetY - imageTransform.positionY) * (newScale / imageTransform.scale)

      setImageTransform({
        scale: newScale,
        positionX: newPositionX,
        positionY: newPositionY,
        initialScale: newScale,
        initialPositionX: newPositionX,
        initialPositionY: newPositionY,
      })
    }
  }

  // Handle mouse drag
  const handleMouseDown = (e) => {
    if (imageTransform.scale <= 1) return
    e.preventDefault()

    isDraggingRef.current = true
    startPointRef.current = {
      x: e.clientX,
      y: e.clientY,
    }
    lastPointRef.current = { ...startPointRef.current }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    e.preventDefault()

    const x = e.clientX
    const y = e.clientY

    const deltaX = x - lastPointRef.current.x
    const deltaY = y - lastPointRef.current.y

    lastPointRef.current = { x, y }

    setImageTransform((prev) => ({
      ...prev,
      positionX: prev.positionX + deltaX,
      positionY: prev.positionY + deltaY,
    }))
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  // Report modal handlers
  const openReportModal = () => {
    setIsReportModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeReportModal = () => {
    setIsReportModalOpen(false)
    setReportForm({ reason: "", description: "", contact: "", phone: "" })
    setReportError("")
    document.body.style.overflow = "auto"
  }

  const handleReportChange = (e) => {
    const { name, value } = e.target
    setReportForm((prev) => ({ ...prev, [name]: value }))
    setReportError("")
  }

  const handleReportSubmit = async (e) => {
    e.preventDefault()
    if (!reportForm.reason || !reportForm.description || !reportForm.contact || !reportForm.phone) {
      setReportError(t("report.fillRequiredFields"))
      return
    }

    setIsReportSubmitting(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/report`, {
        carId: id,
        reason: reportForm.reason,
        description: reportForm.description,
        contact: reportForm.contact,
        phone: reportForm.phone,
        language: currentLanguage,
      })
      closeReportModal()
    } catch (error) {
      console.error("Error submitting report:", error)
      setReportError(t("report.submitError"))
    } finally {
      setIsReportSubmitting(false)
    }
  }

  // Reset zoom when changing images
  useEffect(() => {
    resetZoom()
  }, [currentImageIndex])

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      clearTimeout(doubleTapTimerRef.current)
    }
  }, [])

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-16 lg:px-28 pb-safe bg-gradient-to-b min-h-screen">
      {/* Top Path and Slider */}
      <motion.h2
        className="mb-6 sm:mb-8 mt-5 sm:mt-7 text-xl sm:text-2xl font-bold text-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Breadcrumb carname={id} />
      </motion.h2>
      <motion.div
        className="flex flex-col md:flex-row gap-4 p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="w-full flex flex-col gap-2 relative">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <Swiper
  direction="horizontal"
  slidesPerView={1}
  spaceBetween={0}
  navigation={true}
  modules={[Navigation, Zoom]}
  zoom={{
    maxRatio: 3,
    minRatio: 1,
  }}
  ref={swiperRef}
  key={currentLanguage}
  className="product-swiper"
  dir={currentLanguage === "ar" ? "ltr" : "rtl"}
  style={{ height: "auto" }} // Prevent Swiper from taking 100% height
>
  {carDetails?.images?.map((img, index) => (
    <SwiperSlide
      key={index}
      className="flex items-center justify-center w-full"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "auto", // Prevent slide from taking 100% height
      }}
    >
      <div
        className="swiper-zoom-container flex items-center justify-center w-full h-[300px] sm:h-[400px] lg:h-[500px]"
        style={{ overflow: "hidden" }}
      >
        <img
          src={`http://api.syriasouq.com/uploads/cars/${img}`}
          alt={`Car image ${index + 1}`}
          className="w-full max-h-full object-contain object-center cursor-zoom-in transition-all duration-300 hover:opacity-95"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "center center",
          }}
          onClick={() => openImageModal(index)}
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</div>
        </div>
      </motion.div>

      {/* Car Details and User Details */}
      <div className="container mx-auto md:py-6 py-2">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Side (3/4) - Car Details */}
          <motion.div className="lg:col-span-8" initial="hidden" animate="visible" variants={fadeIn}>
            <div className="space-y-5 bg-white shadow-lg rounded-lg p-3 sm:p-4">
              <div className="flex-1 h-full flex flex-col gap-1 justify-between py-0 md:py-2">
                <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-[#B80200]">
  <span className="text-2xl">$ </span>
  {carDetails?.priceUSD ? Number(carDetails?.priceUSD).toLocaleString('en-US') : "آخر"}
</h2>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-xl font-semibold text-gray-700">
                    {carDetails?.make ? getLocalizedMake(carDetails, currentLanguage) : "آخر"}
                  </h2>
                  <span className="w-1 h-1 bg-gray-500 rounded-full hidden md:block"></span>
                  <h2 className="text-xl sm:text-xl font-semibold text-gray-700">
                    {getArabicModel(carDetails, currentLanguage)}
                  </h2>
                </div>
                <div className="flex items-center flex-row  gap-4 sm:gap-2">
                  <div className="flex items-center gap-1 text-lg	 text-gray-600">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <CiCalendar className="" />
                    </motion.div>
                    <span>{carDetails?.year ? <Translate text={carDetails?.year} /> : "آخر"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-lg text-gray-600">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <AiOutlineDashboard className="" />
                    </motion.div>
                    <span>
                      {carDetails?.kilometer ? <Translate text={carDetails?.kilometer} /> : "آخر"}{" "}
                      <Translate text={"km"} />
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-lg text-gray-600">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <CiLocationOn className="" />
                    </motion.div>
                    <span>
                      {carDetails?.location ? getLocalizedLocation(carDetails?.location, currentLanguage) : "آخر"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Information */}
            <motion.div className="p-5 sm:p-8 bg-white shadow-lg rounded-lg mt-4 sm:mt-6" variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl pb-6 text-[#314352] font-bold">
                {currentLanguage === "ar" ? "نظرة عامة عن السيارة" : "Information:"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-3 sm:gap-y-6 text-[#314352]">
                
                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">{currentLanguage === "ar" ? "النوع" : "Make:"}</p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">{getLocalizedMake(carDetails, currentLanguage)}</p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">{currentLanguage === "ar" ? "الموديل" : "Model:"}</p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">{getArabicModel(carDetails, currentLanguage)}</p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">
                  {currentLanguage === "ar" ? "الكيلومتر" : "Kilometer:"}
                </p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">
                  {carDetails?.kilometer} <Translate text={"km"} />
                </p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">{currentLanguage === "ar" ? "السعر" : "Price:"}</p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">$ {carDetails?.priceUSD ? Number(carDetails?.priceUSD).toLocaleString('en-US') : "آخر"}</p>
         
                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">
                  {currentLanguage === "ar" ? "اللون الداخلي" : "Interior Color:"}
                </p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">
                  {carDetails?.interiorColor ? <Translate text={carDetails?.interiorColor} /> : "N/A"}
                </p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">
                  {currentLanguage === "ar" ? "اللون الخارجي" : "Exterior Color:"}
                </p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">
                  {carDetails?.exteriorColor ? <Translate text={carDetails?.exteriorColor} /> : "N/A"}
                </p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">
                  {currentLanguage === "ar" ? "حجم المحرك" : "Engine Size:"}
                </p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">{localizeEngineSize(carDetails?.engineSize, currentLanguage)}</p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">
                  {currentLanguage === "ar" ? "نوع الوقود" : "Fuel Type:"}
                </p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">
                  {carDetails?.fuelType ? <Translate text={carDetails?.fuelType} /> : "N/A"}
                </p>

                <p className="font-semibold text-xl sm:text-lg  border-b border-gray-200 pb-2">
                  {currentLanguage === "ar" ? "ناقل الحركة" : "Transmission:"}
                </p>
                <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">
                  {carDetails?.transmission ? <Translate text={carDetails?.transmission} /> : "N/A"}
                </p>

                {/* Features Section with Separate Show More/Show Less */}
                <p className="font-semibold text-xl sm:text-lg mt-6">
                  {currentLanguage === "ar" ? "المواصفات" : "Features:"}
                </p>
                <div className="flex items-center gap-2">
                  {carDetails?.features?.length > 0 ? (
                    <>
                      {showMoreFeatures ? (
                        <motion.button
                          onClick={() => setShowMoreFeatures(false)}
                          className="text-[#B80200] text-xl sm:text-lg hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentLanguage === "ar" ? "عرض أقل" : "Show Less"}
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={() => setShowMoreFeatures(true)}
                          className="text-[#B80200] text-base sm:text-lg hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentLanguage === "ar" ? "أظهر المزيد" : "Show More"}
                        </motion.button>
                      )}
                    </>
                  ) : (
                    <p className="text-xl sm:text-lg border-b border-gray-200 pb-2">N/A</p>
                  )}
                </div>

                {showMoreFeatures && carDetails?.features?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-6">
                    {carDetails?.features.map((fe) => (
                      <div key={fe} className={`flex items-center gap-2 text-xl sm:text-lg `}>
                        <FaCheck className="text-red-500 w-4 h-4" />
                        <p className=" border-b border-gray-200 pb-2">{getLocalizedFeature(fe, currentLanguage)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Error Report */}
              <motion.div
                className="flex justify-center items-center my-6 sm:my-8 gap-2 text-lg sm:text-xl text-[#B80200] cursor-pointer"
                whileHover={hoverEffect}
                onClick={openReportModal}
              >
                <MdErrorOutline />
                <h2 className="text-sm sm:text-base">
                  {currentLanguage === "ar" ? "الإبلاغ عن الإعلان" : "Report abuse"}
                </h2>
              </motion.div>
            </motion.div>
            {/* Car Description */}
            <motion.div className="space-y-5 flip-card bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-4 sm:mt-6" variants={fadeIn}>
              <h1 className="text-xl sm:text-2xl text-[#314352] font-bold mt-2">
                {currentLanguage === "ar" ? "الوصف" : "Description:"}
              </h1>
              <p className="text-[#314352] mt-2 mb-5 text-md sm:text-md">{carDetails?.description}</p>
            </motion.div>
          </motion.div>

          {/* Right Side (1/4) - Seller Info & Buttons */}
          <motion.div
            className="lg:col-span-4 bg-white p-4 sm:p-6 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {/* Seller Info */}
            <div className="flex items-center gap-4 sm:gap-6 text-left">
            <motion.div
  className="w-12 h-12 rounded-full bg-red-300 text-center flex items-center justify-center font-bold text-xl cursor-pointer"
  onClick={handleProfileClick}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  <Translate
    text={(() => {
      const firstLetter = carDetails?.user?.username?.charAt(0).toUpperCase() || "?"
      return firstLetter
    })()}
  />              </motion.div>

              <div className="space-y-2">
                <button className="mt-2 font-semibold text-[#B80200] underline italic text-sm sm:text-base"   onClick={handleProfileClick}
                >
                  {carDetails?.user?.username}
                </button>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-12 flex flex-col gap-3 sm:gap-5 justify-between">
              <motion.button
                onClick={() => startNewChat(carDetails?.user)}
                className="w-full bg-gradient-to-r from-[#B80200] to-[#A00000] text-white py-3 sm:py-4 px-6 sm:px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gradient-to-r hover:from-[#A00000] hover:to-[#900000] transition-all shadow-md disabled:opacity-50"
                whileHover={hoverEffect}
                whileTap={{ scale: 0.95 }}
                disabled={isChatLoading}
              >
                {isChatLoading ? (
                  <div className="loader border-t-2 border-white h-5 w-5 animate-spin rounded-full"></div>
                ) : (
                  <>
                    <TiMessages /> {currentLanguage === "ar" ? `دردشة` : "Chat"}
                  </>
                )}
              </motion.button>
              <motion.a
                href={`tel:${carDetails?.user?.phone}`}
                className="w-full bg-gradient-to-r from-[#B80200] to-[#A00000] text-white py-3 sm:py-4 px-6 sm:px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gradient-to-r hover:from-[#A00000] hover:to-[#900000] transition-all shadow-md"
                whileHover={hoverEffect}
                whileTap={{ scale: 0.95 }}
              >
                <MdOutlinePhone /> {carDetails?.user?.phone}
              </motion.a>
              <motion.a
                href={`https://wa.me/${carDetails?.user?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 sm:py-4 px-6 sm:px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-[#20C35D] transition-all shadow-md"
                whileHover={hoverEffect}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp /> <Translate text={"Chat on WhatsApp"} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* More from User Section */}
        <motion.div className="mt-6 sm:mt-8" initial="hidden" animate="visible" variants={fadeIn}>
          <MoreFromUser
            title={currentLanguage === "ar" ? `قد يهمك ايضاً …` : "You may also like..."}
            button={"Start a new search"}
          />
        </motion.div>
      </div>

      {/* Modern Image Modal with Gesture Zoom and Swipe */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <button
              className="absolute left-4 text-white/70 hover:text-white z-40 p-2"
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImageIndex((prev) => (prev === 0 ? carDetails?.images?.length - 1 : prev - 1))
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              className="absolute right-4 text-white/70 hover:text-white z-40 p-2"
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImageIndex((prev) => (prev === carDetails?.images?.length - 1 ? 0 : prev + 1))
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <motion.div
              ref={imageContainerRef}
              className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
              variants={imageVariants}
              onDoubleClick={handleDoubleTap}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              style={{ cursor: imageTransform.scale > 1 ? (isDraggingRef.current ? "grabbing" : "grab") : "default" }}
            >
              <motion.img
                src={`http://api.syriasouq.com/uploads/cars/${carDetails?.images?.[currentImageIndex]}`}
                alt={`Car image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none"
                style={{
                  transform: `scale(${imageTransform.scale}) translate(${imageTransform.positionX / imageTransform.scale}px, ${imageTransform.positionY / imageTransform.scale}px)`,
                  transition: isDraggingRef.current || isZoomingRef.current ? "none" : "transform 0.2s ease-out",
                }}
                draggable="false"
              />
            </motion.div>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
              <span>
                {currentImageIndex + 1} / {carDetails?.images?.length}
              </span>
              <div className="mt-2 text-xs text-white/50">
                {imageTransform.scale > 1 ? "Drag to pan • Double-tap to reset • Swipe to navigate" : "Double-tap to zoom • Pinch to zoom • Swipe to navigate"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {isReportModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={closeReportModal}
          >
            <motion.div
              className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-lg"
              variants={imageVariants}
              onClick={(e) => e.stopPropagation()}
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#314352]">
                  {t("report.title")}
                </h2>
                <button
                  onClick={closeReportModal}
                  className="text-[#B80200] hover:text-[#A00000] p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#314352] mb-2">
                    {t("report.reasonLabel")} <span className="text-[#B80200]">*</span>
                  </label>
                  <select
                    name="reason"
                    value={reportForm.reason}
                    onChange={handleReportChange}
                    className="w-full border border-[#B80200] rounded-md p-2 text-sm text-[#314352] !bg-white focus:outline-none focus:ring-2   transition-all duration-300 hover:border-[#A00000]"
                    required
                  >
                    <option value="">{t("report.reasonPlaceholder")}</option>
                    <option value="inappropriate">{t("report.reasons.inappropriate")}</option>
                    {/* <option value="spam">{t("report.reasons.spam")}</option> */}
                    <option value="fraud">{t("report.reasons.fraud")}</option>
                    <option value="other">{t("report.reasons.other")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#314352] mb-2">
                    {t("report.descriptionLabel")} <span className="text-[#B80200]">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={reportForm.description}
                    onChange={handleReportChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#B80200]"
                    placeholder={t("report.descriptionPlaceholder")}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#314352] mb-2">
                    {t("report.contactLabel")} <span className="text-[#B80200]">*</span>
                  </label>
                  <input
                    type="email"
                    name="contact"
                    value={reportForm.contact}
                    onChange={handleReportChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B80200]"
                    placeholder={t("report.contactPlaceholder")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#314352] mb-2">
                    {t("report.phoneLabel")} <span className="text-[#B80200]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={reportForm.phone}
                    onChange={handleReportChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B80200]"
                    placeholder={t("report.phonePlaceholder")}
                    required
                  />
                </div>
                {reportError && (
                  <p className="text-sm text-[#B80200]">{reportError}</p>
                )}
                <div className="flex justify-end gap-3">
                  <motion.button
                    type="button"
                    onClick={closeReportModal}
                    className="px-4 py-2 text-sm font-semibold text-[#314352] rounded-md hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("report.cancel")}
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#B80200] to-[#A00000] rounded-md hover:from-[#A00000] hover:to-[#900000] disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isReportSubmitting}
                  >
                    {isReportSubmitting ? (
                      <div className="loader border-t-2 border-white h-5 w-5 animate-spin rounded-full"></div>
                    ) : (
                      t("report.submit")
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CarDetails