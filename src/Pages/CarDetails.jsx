import { Link, useNavigate, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
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

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [relatedCars, setRelatedCars] = useState([]);

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
    try {
      // let conversation = conversations.find((c) =>
      //   c.participants.includes(receiver.id)
      // );

      // if (!conversation) {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/conversations`,
        {
          recipientId: receiver._id, // ✅ Changed "receiverId" to "recipientId"
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`, // ✅ Send JWT in headers
          },
        }
      );

      if (response.data) {
        return navigate("/messages", { replace: true });
      }

      // conversation = response.data;
      // setConversations([conversation, ...conversations]);
      // }

      // setSelectedChat(conversation);
      // fetchMessages(conversation.id);
    } catch (error) {
      console.error("Error starting new chat", error);
    }
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

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

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      {/* top path and slider */}
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={id} />
      </h2>
      <div className="flex flex-col md:flex-row gap-4 p-4 max-w-5xl mx-auto">
        <div className="w-full flex flex-col gap-2 relative h-auto">
          <Swiper
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={10}
            navigation={true} // ✅ Uses default Swiper navigation
            modules={[Navigation]}
            className="h-auto"
          >
            {carDetails?.images?.map((img, index) => (
              <SwiperSlide key={index} className="h-auto">
                <img
                  src={`http://api.syriasouq.com/uploads/cars/${img}`}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-auto max-h-[500px] object-contain rounded-lg cursor-pointer hover:opacity-80"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* car details and user details  */}
      <div className="container mx-auto md:py-6 py-2">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side (3/4) - Car Details */}
          <div className="lg:col-span-8 ">
            <div className="space-y-5 bg-white shadow rounded-lg p-3">
              <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl font-bold">
                    <span className="text-2xl">$ </span>
                    {carDetails?.priceUSD ? carDetails?.priceUSD : "آخر"}
                  </h2>
                  {/* <span className="block px-2 py-1 rounded bg-[#B80200] text-white text-xs">
                        {currentLanguage === "ar" ? "مميز" : "PREMIUM"}
                      </span> */}
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-md">
                    {carDetails?.make
                      ? getLocalizedMake(carDetails, currentLanguage)
                      : "آخر"}
                  </h2>
                  <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                  <h2 className="text-md">
                    <h2 className="text-md">
                      {getArabicModel(carDetails, currentLanguage)}
                    </h2>
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-md">
                    <CiCalendar />
                    <span>
                      {carDetails?.year ? (
                        <Translate text={carDetails?.year} />
                      ) : (
                        "آخر"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-md">
                    <AiOutlineDashboard />
                    <span>
                      {carDetails?.kilometer ? (
                        <Translate text={carDetails?.kilometer} />
                      ) : (
                        "آخر"
                      )}{" "}
                      km
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-md">
                    <CiLocationOn />
                    <span>
                      {carDetails?.location
                        ? getLocalizedLocation(
                            carDetails?.location,
                            currentLanguage
                          )
                        : "آخر"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Information */}
            <div className="p-6">
              <h2 className="text-2xl pb-4 text-[#314352] font-semibold">
                {currentLanguage === "ar"
                  ? "نظرة عامة عن السيارة"
                  : "Information:"}
              </h2>
              <div className="grid grid-cols-2 gap-y-2 text-[#314352]">
                <p className="font-semibold">
                  {currentLanguage === "ar" ? "النوع" : "Make:"}
                </p>
                <p>{getLocalizedMake(carDetails, currentLanguage)}</p>

                <p className="font-semibold">
                  {currentLanguage === "ar" ? "الموديل" : "Model:"}
                </p>
                <p>{getArabicModel(carDetails, currentLanguage)}</p>

                <p className="font-semibold">
                  {currentLanguage === "ar" ? "الكيلومتر" : "Kilometer:"}
                </p>
                <p>
                  {carDetails?.kilometer} <Translate text={"km"} />
                </p>

                <p className="font-semibold">
                  {currentLanguage === "ar" ? "السعر" : "Price:"}
                </p>
                <p>$ {carDetails?.priceUSD}</p>

                {showMore ? (
                  <>
                    <button
                      onClick={() => setShowMore(false)}
                      className="cursor-pointer text-[#B80200]"
                    >
                      Show Less
                    </button>
                    <p></p>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowMore(true)}
                      className="cursor-pointer text-[#B80200]"
                    >
                      Show More
                    </button>
                    <p></p>
                  </>
                )}

                {showMore && (
                  <>
                    <p className="font-semibold">
                      {currentLanguage === "ar"
                        ? "اللون الداخلي"
                        : "Interior Color:"}
                    </p>
                    <p>
                      {carDetails?.interiorColor ? (
                        <Translate text={carDetails?.interiorColor} />
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <p className="font-semibold">
                      {currentLanguage === "ar"
                        ? "اللون الخارجي"
                        : "Exterior Color:"}
                    </p>
                    <p>
                      {carDetails?.exteriorColor ? (
                        <Translate text={carDetails?.exteriorColor} />
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <p className="font-semibold">
                      {currentLanguage === "ar" ? "حجم المحرك" : "Engine Size:"}
                    </p>
                    <p>
                      {localizeEngineSize(
                        carDetails?.engineSize,
                        currentLanguage
                      )}
                    </p>

                    <p className="font-semibold">
                      {currentLanguage === "ar" ? "نوع الوقود" : "Fuel Type:"}
                    </p>
                    <p>
                      {carDetails?.fuelType ? (
                        <Translate text={carDetails?.fuelType} />
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <p className="font-semibold">
                      {currentLanguage === "ar"
                        ? "ناقل الحركة"
                        : "Transmission:"}
                    </p>
                    <p>
                      {carDetails?.transmission ? (
                        <Translate text={carDetails?.transmission} />
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <p className="text-lg font-semibold mt-5">Features:</p>
                    <p></p>

                    {carDetails?.features.map((fe) => (
                      <>
                        <p key={fe}>
                          {getLocalizedFeature(fe, currentLanguage)}
                        </p>
                        <p></p>
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* car details  */}
            <div className="space-y-5 bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl text-[#314352] font-bold mt-2">
                {currentLanguage === "ar" ? "الوصف" : "Description:"}
              </h1>
              <p className="text-[#314352] mt-2 mb-5">
                {carDetails?.description}
              </p>
              {/* <span className="border-t pt-5 border-gray-400 font-bold text-gray-400 mb-2 inline-block">
                <Translate text={"Related"} />
              </span>
              <div className="flex justify-between items-center md:flex-row flex-col gap-4 w-full">
                {relatedCars.length > 0 ? (
                  relatedCars?.slice(0, 3).map((car) => (
                    <>
                      <div className="w-1/3">
                        <div className="w-full">
                          <img
                            src={`http://api.syriasouq.com/uploads/cars/${car.images[0]}`}
                            alt=""
                            className="w-full rounded-xl h-44"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-gray-400">
                            <Translate text={car.make} />
                          </h4>
                          <h4 className="text-gray-400">-</h4>
                          <h4 className="text-gray-400">
                            <Translate text={car.model} />
                          </h4>
                        </div>
                        <h3 className="text-[#B80200] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                          <Translate text={car.location} />
                        </h3>
                        <h4 className="text-black">
                          USD <Translate text={car.priceUSD} />
                        </h4>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div> */}
            </div>
          </div>

          {/* Right Side (1/4) - Seller Info & Buttons */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow">
            {/* Seller Info */}
            <div className="flex items-center gap-6 text-left">
              {/* <div className="avatar">
                <div className="w-14 rounded-full ">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div> */}
              <div className="w-12 h-12 rounded-full bg-red-300 text-center flex items-center justify-center font-bold text-xl">
                <Translate
                  text={(() => {
                    const firstLetter =
                      carDetails?.user?.username?.charAt(0).toUpperCase() ||
                      "?";
                    return firstLetter;
                  })()}
                />
              </div>
              <div className="space-y-2">
                {/* <Link to={`/dashboard?uid=${user?._id}`}> */}
                <p className="mt-2 font-semibold text-[#B80200] underline italic">
                  {carDetails?.user?.username}
                </p>
                {/* </Link> */}
                {/* <p className="text-sm text-gray-500">● User is offline</p> */}
                {/* See All Ads Link */}
                <div>
                  {/* <a href="#" className="text-red-500 border-b-2">
                    See all ads
                  </a> */}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col  gap-5 justify-between">
              <button
                onClick={() => startNewChat(carDetails?.user)}
                className="w-full bg-red-500 text-white py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <TiMessages /> {currentLanguage === "ar" ? `دردشة` : "Chat"}
              </button>
              {/* <a
                href={`mailto:${carDetails?.user?.email}`}
                className="w-full bg-red-500 text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlineMailOutline /> E-mail
              </a> */}
              <a
                href={`tel:${carDetails?.user?.phone}`}
                className="w-full bg-[#B80200] text-white py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlinePhone /> {carDetails?.user?.phone}
              </a>
              <a
                href={`https://wa.me/${carDetails?.user?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp /> <Translate text={"Chat on WhatsApp"} />
              </a>
            </div>

            {/* Icons Section */}
            <div className="mt-6 flex justify-center shadow p-5 space-x-4">
              {/* <div className="flex gap-2 items-center">
                <div className="hover:text-red-500 hover:border-red-500 duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <IoEyeOutline className="w-1/2 h-1/2" />
                </div>
                <div className="hover:text-red-500 hover:border-red-500 duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <IoIosGitCompare className="w-1/2 h-1/2" />
                </div>
                <div className="hover:text-red-500 hover:border-red-500 duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <CiHeart className="w-1/2 h-1/2" />
                </div>
              </div> */}
            </div>
            {/* error  */}
            {/* <div className="flex justify-center items-center my-8 gap-2 text-xl text-[#B80200] cursor-pointer">
              <MdErrorOutline />
              <h2>
                {currentLanguage === "ar"
                  ? "اإلبالغ عن انتهاك"
                  : "Report abuse"}
              </h2>
            </div> */}

            {/* <FeaturedCard /> */}
          </div>
        </div>
        {/* <MoreFromUser
          title={"More from this user"}
          button={"Display All From SyriaSouq"}
          uid={user?._id}
        /> */}
        <MoreFromUser
          title={
            currentLanguage === "ar"
              ? `قد يهمك ايضاً …`
              : "You may also like..."
          }
          button={"Start a new search"}
        />
      </div>
    </div>
  );
};

export default CarDetails;
