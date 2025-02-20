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

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      {/* top path and slider */}
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={id} />
      </h2>
      <div className="flex flex-col md:flex-row gap-4 p-4 max-w-5xl mx-auto">
        {/* Left Side - Main Image */}
        <div className="w-full md:w-2/3">
          {carDetails?.images?.[0] && (
            <img
              src={`http://localhost:5001/uploads/cars/${carDetails?.images[0]}`}
              alt="Main Preview"
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Right Side - Swiper Slider */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 relative h-[320px] md:h-[500px]">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute -top-6 left-1/2 transform -translate-x-1/2 text-white p-2 z-10 cursor-pointer">
            <IoIosArrowUp className="text-gray-500 w-8 h-8 md:w-16 md:h-16" />
          </button>
          <button className="swiper-button-next-custom absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white p-2 cursor-pointer z-10">
            <IoIosArrowDown className="text-gray-500 w-8 h-8 md:w-16 md:h-16" />
          </button>

          <Swiper
            direction="vertical"
            slidesPerView={2}
            spaceBetween={10}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Navigation]}
            className="h-full"
          >
            {carDetails?.images?.map((img, index) => (
              <SwiperSlide key={index} className="h-[140px] md:h-[240px]">
                <img
                  src={`http://localhost:5001/uploads/cars/${img}`}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover cursor-pointer rounded-lg hover:opacity-80"
                  onClick={() => setMainImage(img)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* car details and user details  */}
      <div className="container mx-auto py-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side (3/4) - Car Details */}
          <div className="lg:col-span-8 min-h-screen">
            <div className="space-y-5 bg-white shadow rounded-lg p-6">
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span>🕒</span> <Translate text={carDetails?.year} />
              </p>
              <h1 className="text-2xl text-[#314352] font-bold mt-2">
                {carDetails?.make}
              </h1>
              <p className="text-3xl font-semibold text-[#314352] mt-2">
                ${carDetails?.priceUSD}
              </p>
            </div>

            {/* Car Information */}
            <div className="p-6">
              <h2 className="text-2xl pb-4 text-[#314352] font-semibold">
                <Translate text={"Information:"} />
              </h2>
              <div className="grid grid-cols-2 gap-y-2 text-[#314352]">
                <p className="font-semibold">
                  <Translate text={"Make:"} />
                </p>
                <p>{carDetails?.make}</p>

                <p className="font-semibold">
                  <Translate text={"Model:"} />
                </p>
                <p>{carDetails?.model}</p>

                <p className="font-semibold">
                  <Translate text={"Price:"} />
                </p>
                <p>${carDetails?.priceUSD}</p>

                <p className="font-semibold">
                  <Translate text={"Kilometer:"} />
                </p>
                <p>
                  {carDetails?.kilometer} <Translate text={"km"} />
                </p>
              </div>
            </div>

            {/* car details  */}
            <div className="space-y-5 bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl text-[#314352] font-bold mt-2">
                <Translate text={"Description:"} />
              </h1>
              <p className="text-[#314352] mt-2 mb-5">
                {carDetails?.description}
              </p>
              <span className="border-t pt-5 border-gray-400 font-bold text-gray-400 mb-2 inline-block">
                <Translate text={"Related"} />
              </span>
              <div className="flex justify-between items-center w-full">
                <div className="w-1/3">
                  <h3 className="text-[#B80200] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                    <Translate text={"Maserati GranCabrio"} />
                  </h3>
                  <h4 className="text-gray-400">
                    <Translate text={"19/06/2022"} />
                  </h4>
                  <h4 className="text-gray-400">
                    <Translate text={"Similar post"} />
                  </h4>
                </div>
                <div className="w-1/3 text-left">
                  <h3 className="text-[#B80200] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                    <Translate text={"Ferrari F8 Tributo"} />
                  </h3>
                  <h4 className="text-gray-400">
                    <Translate text={"17/06/2022"} />
                  </h4>
                  <h4 className="text-gray-400">
                    <Translate text={"Similar post"} />
                  </h4>
                </div>
                <div className="w-1/3 ">
                  <h3 className="text-[#B80200] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                    <Translate text={"Lamborghini Aventador S"} />
                  </h3>
                  <h4 className="text-gray-400">
                    <Translate text={"18/06/2022"} />
                  </h4>
                  <h4 className="text-gray-400">
                    <Translate text={"Similar post"} />
                  </h4>
                </div>
              </div>
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
                <Link to={`/dashboard?uid=${user?._id}`}>
                  <p className="mt-2 font-semibold text-[#B80200] underline italic">
                    {carDetails?.user?.username}
                  </p>
                </Link>
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
              {/* <button
                onClick={() => startNewChat(carDetails?.user)}
                className="w-full bg-red-500 text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <TiMessages /> Chat
              </button> */}
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
            <div className="flex justify-center items-center my-8 gap-2 text-xl text-[#B80200] cursor-pointer">
              <MdErrorOutline />
              <h2>
                <Translate text={"Report abuse"} />
              </h2>
            </div>

            <FeaturedCard />
          </div>
        </div>
        <MoreFromUser
          title={"More from this user"}
          button={"Display All From SyriaSouq"}
          uid={user?._id}
        />
        <MoreFromUser
          title={"You may also like..."}
          button={"Start a new search"}
        />
      </div>
    </div>
  );
};

export default CarDetails;
