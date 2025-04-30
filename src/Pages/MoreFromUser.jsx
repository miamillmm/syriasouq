import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CiCalendar, CiHeart, CiLocationOn, CiShare2 } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  getArabicModel,
  getLocalizedLocation,
  getLocalizedMake,
} from "../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";

export default function MoreFromUser({ title, button, uid }) {
  const swiperRef = useRef(null);
  const [listings, setListings] = useState([]);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { wishlist, handleWishlist, isWishlistLoading } = useWishlist();

  useEffect(() => {
    console.log(uid);
    const getCars = async () => {
      const url = uid
        ? `${import.meta.env.VITE_API_URL}/cars/uid/${uid}`
        : `${import.meta.env.VITE_API_URL}/cars?status=available`;
      const response = await axios.get(url);
      if (response.data) {
        setListings(response.data.data);
      }
    };
    getCars();
  }, [uid]);

  const handleShare = (car) => {
    const url = `${window.location.origin}/listing/${car._id}`;
    const title = `${getLocalizedMake(car, currentLanguage)} ${getArabicModel(car, currentLanguage)}`;
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch((err) => {
          console.error("Share failed: ", err);
          toast.error(
            currentLanguage === "ar"
              ? "فشل في مشاركة الرابط!"
              : "Failed to share URL!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        });
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
            }
          );
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
          toast.error(
            currentLanguage === "ar"
              ? "فشل في نسخ الرابط!"
              : "Failed to copy URL!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        });
    }
  };

  return (
    <div className="w-full py-6 sm:py-10 relative px-4 sm:px-6 lg:px-8">
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#314252] font-bold">
          {title}
        </h2>
        <div
          className={`flex items-center gap-2 mt-4 sm:mt-0 ${
            currentLanguage === "ar" && "flex-row-reverse"
          }`}
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-[#B80200] text-white p-2 rounded cursor-pointer hover:bg-[#a50200] transition-colors"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-[#B80200] text-white p-2 rounded cursor-pointer hover:bg-[#a50200] transition-colors"
            aria-label="Next slide"
          >
            <FaChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="overflow-hidden"
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      >
        {listings.length > 0 ? (
          listings.map((car) => (
            <SwiperSlide key={car._id}>
              <div className="flex md:flex-row flex-col-reverse gap-4 bg-slate-100 p-3 sm:p-4 rounded relative">
                <div className="w-full max-w-[450px] sm:max-w-[350px]">
                  <Link to={`/listing/${car?._id}`} key={car?._id}>
                    <div className="overflow-hidden rounded-md relative">
                      <img
                        alt={`${getLocalizedMake(car, currentLanguage)} ${getArabicModel(car, currentLanguage)}`}
                        src={`http://api.syriasouq.com/uploads/cars/${car?.images[0]}`}
                        className="w-full h-48 sm:h-52 lg:h-56 object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                        loading="lazy"
                      />
                      {/* Wishlist Button */}
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!isWishlistLoading) {
                            handleWishlist(car);
                          }
                        }}
                        className={`absolute top-3 ${currentLanguage === "ar" ? "right-3" : "left-3"} hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600 ${
                          wishlist.some((item) => item.car?._id === car._id)
                            ? "bg-[#B80200] border-[#B80200] text-white"
                            : "bg-white"
                        } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <CiHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-red-500">
                      <span className="text-lg sm:text-xl ">$ </span>
                      {car?.priceUSD ? car?.priceUSD : "آخر"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 md:mt-3">
                    <h2 className="text-xs sm:text-sm">
                      {getLocalizedMake(car, currentLanguage)}
                    </h2>
                    <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                    <h2 className="text-xs sm:text-sm">
                      {getArabicModel(car, currentLanguage)}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <CiCalendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{car?.year ? car?.year : "آخر"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <AiOutlineDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>
                        {car?.kilometer ? car?.kilometer : "آخر"}{" "}
                        <Translate text={"km"} />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <CiLocationOn className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>
                        {getLocalizedLocation(car?.location, currentLanguage)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 md:mt-4">
                    <Link
                      to={`/listing/${car?._id}`}
                      className="block bg-[#B80200] text-white text-sm sm:text-lg py-1 px-3 sm:px-4 rounded hover:bg-[#a50200] transition-colors"
                    >
                      <Translate text={"View Details"} />
                    </Link>
                  </div>
                </div>
                {/* Share Button */}
                <div
                  className={`absolute top-3 ${
                    currentLanguage === "ar" ? "left-3" : "right-3"
                  } flex items-center gap-2`}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(car);
                    }}
                    className="hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600"
                  >
                    <CiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <h2 className="text-red-500 font-bold text-sm sm:text-md text-center py-4">
              <Translate text={"No Listing"} />
            </h2>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}