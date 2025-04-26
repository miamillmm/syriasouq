import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdErrorOutline, MdOutlinePhone } from "react-icons/md";
import Breadcrumb from "./Breadcumb";
import FeaturedCard from "./FeaturedCard";
import MoreFromUser from "./MoreFromUser";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";
import { TiMessages } from "react-icons/ti";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  arabicMakes,
  getArabicModel,
  getLocalizedFeature,
  getLocalizedLocation,
  getLocalizedMake,
  localizeEngineSize,
} from "../utils/utils";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false); // New state for features toggle
  const [relatedCars, setRelatedCars] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then((res) => {
        console.log(res);
        setCarDetails(res.data.data);
      })
      .catch((error) => {
        console.log("error fetching data:", error);
      });
  }, [id]);

  const startNewChat = async (receiver) => {
    if (isChatLoading) return;
    setIsChatLoading(true);
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
        }
      );
  
      if (response.data) {
        navigate("/messages", { replace: true });
      }
    } catch (error) {
      console.error("Error starting new chat", error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => {
        console.log(res);
        setRelatedCars(res.data.data);
      })
      .catch((error) => {
        console.log("error fetching data:", error);
      });
  }, [carDetails]);

  // Animation variants for fade-in and hover
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-16 lg:px-28 pb-safe bg-gradient-to-b  min-h-screen">
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
       <div className="w-full flex flex-col gap-2 relative h-auto">
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="h-auto"
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      >
        {carDetails?.images?.map((img, index) => (
          <SwiperSlide key={index} className="h-auto">
            <img
              src={`http://api.syriasouq.com/uploads/cars/${img}`}
              alt={`Thumbnail ${index}`}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      </motion.div>

      {/* Car Details and User Details */}
      <div className="container mx-auto md:py-6 py-2">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Side (3/4) - Car Details */}
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="space-y-5 bg-white shadow-lg rounded-lg p-3 sm:p-4">
              <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    <span className="text-lg sm:text-xl text-red-500">$</span>{" "}
                    {carDetails?.priceUSD ? carDetails?.priceUSD : "آخر"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-700">
                    {carDetails?.make
                      ? getLocalizedMake(carDetails, currentLanguage)
                      : "آخر"}
                  </h2>
                  <span className="w-1 h-1 bg-gray-500 rounded-full hidden md:block"></span>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-700">
                    {getArabicModel(carDetails, currentLanguage)}
                  </h2>
                </div>
                <div className="flex md:items-center md:flex-row flex-col gap-1 sm:gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <CiCalendar className="text-red-500" />
                    </motion.div>
                    <span>
                      {carDetails?.year ? (
                        <Translate text={carDetails?.year} />
                      ) : (
                        "آخر"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <AiOutlineDashboard className="text-red-500" />
                    </motion.div>
                    <span>
                      {carDetails?.kilometer ? (
                        <Translate text={carDetails?.kilometer} />
                      ) : (
                        "آخر"
                      )}{" "}
                      <Translate text={"km"} />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <CiLocationOn className="text-red-500" />
                  </motion.div>
                  <span>
                    {carDetails?.location
                      ? getLocalizedLocation(carDetails?.location, currentLanguage)
                      : "آخر"}
                  </span>
                </div>
              </div>
            </div>

            {/* Car Information */}
            <motion.div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-4 sm:mt-6" variants={fadeIn}>
              <h2 className="text-xl sm:text-2xl pb-4 text-[#314352] font-bold">
                {currentLanguage === "ar" ? "نظرة عامة عن السيارة" : "Information:"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-2 sm:gap-y-4 text-[#314352]">
                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "النوع" : "Make:"}
                </p>
                <p className="text-sm sm:text-base">{getLocalizedMake(carDetails, currentLanguage)}</p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "الموديل" : "Model:"}
                </p>
                <p className="text-sm sm:text-base">{getArabicModel(carDetails, currentLanguage)}</p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "الكيلومتر" : "Kilometer:"}
                </p>
                <p className="text-sm sm:text-base">
                  {carDetails?.kilometer} <Translate text={"km"} />
                </p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "السعر" : "Price:"}
                </p>
                <p className="text-sm sm:text-base">$ {carDetails?.priceUSD}</p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "اللون الداخلي" : "Interior Color:"}
                </p>
                <p className="text-sm sm:text-base">
                  {carDetails?.interiorColor ? (
                    <Translate text={carDetails?.interiorColor} />
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "اللون الخارجي" : "Exterior Color:"}
                </p>
                <p className="text-sm sm:text-base">
                  {carDetails?.exteriorColor ? (
                    <Translate text={carDetails?.exteriorColor} />
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "حجم المحرك" : "Engine Size:"}
                </p>
                <p className="text-sm sm:text-base">
                  {localizeEngineSize(carDetails?.engineSize, currentLanguage)}
                </p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "نوع الوقود" : "Fuel Type:"}
                </p>
                <p className="text-sm sm:text-base">
                  {carDetails?.fuelType ? (
                    <Translate text={carDetails?.fuelType} />
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="font-semibold text-sm sm:text-base">
                  {currentLanguage === "ar" ? "ناقل الحركة" : "Transmission:"}
                </p>
                <p className="text-sm sm:text-base">
                  {carDetails?.transmission ? (
                    <Translate text={carDetails?.transmission} />
                  ) : (
                    "N/A"
                  )}
                </p>

                {/* Features Section with Separate Show More/Show Less */}
                <p className="font-semibold text-sm sm:text-base mt-4">
                  {currentLanguage === "ar" ? "المواصفات" : "Features:"}
                </p>
                <div className="flex items-center gap-2">
                  {carDetails?.features?.length > 0 ? (
                    <>
                      {showMoreFeatures ? (
                        <motion.button
                          onClick={() => setShowMoreFeatures(false)}
                          className="text-[#B80200] text-sm sm:text-base hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentLanguage === "ar" ? "عرض أقل" : "Show Less"}
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={() => setShowMoreFeatures(true)}
                          className="text-[#B80200] text-sm sm:text-base hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentLanguage === "ar" ? "أظهر المزيد" : "Show More"}
                        </motion.button>
                      )}
                    </>
                  ) : (
                    <p className="text-sm sm:text-base">N/A</p>
                  )}
                </div>

                {showMoreFeatures && carDetails?.features?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-4">
                    {carDetails?.features.map((fe) => (
                      <p key={fe} className="text-sm sm:text-base">
                        {getLocalizedFeature(fe, currentLanguage)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Car Description */}
            <motion.div
              className="space-y-5 bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-4 sm:mt-6"
              variants={fadeIn}
            >
              <h1 className="text-xl sm:text-2xl text-[#314352] font-bold mt-2">
                {currentLanguage === "ar" ? "الوصف" : "Description:"}
              </h1>
              <p className="text-[#314352] mt-2 mb-5 text-sm sm:text-base">
                {carDetails?.description}
              </p>
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
              <div className="w-12 h-12 rounded-full bg-red-300 text-center flex items-center justify-center font-bold text-xl">
                <Translate
                  text={(() => {
                    const firstLetter =
                      carDetails?.user?.username?.charAt(0).toUpperCase() || "?";
                    return firstLetter;
                  })()}
                />
              </div>
              <div className="space-y-2">
                <p className="mt-2 font-semibold text-[#B80200] underline italic text-sm sm:text-base">
                  {carDetails?.user?.username}
                </p>
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

            {/* Error Report */}
            <motion.div
              className="flex justify-center items-center my-6 sm:my-8 gap-2 text-lg sm:text-xl text-[#B80200] cursor-pointer"
              whileHover={hoverEffect}
            >
              <MdErrorOutline />
              <h2 className="text-sm sm:text-base">
                {currentLanguage === "ar" ? "اإلبالغ عن انتهاك" : "Report abuse"}
              </h2>
            </motion.div>
          </motion.div>
        </div>

        {/* More from User Section */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <MoreFromUser
            title={
              currentLanguage === "ar"
                ? `قد يهمك ايضاً …`
                : "You may also like..."
            }
            button={"Start a new search"}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetails;