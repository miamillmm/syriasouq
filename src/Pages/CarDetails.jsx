import { Link, useNavigate, useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Breadcrumb from "./Breadcumb";
import { TiMessages } from "react-icons/ti";
import {
  MdOutlineMailOutline,
  MdErrorOutline,
  MdOutlinePhone,
} from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import FeaturedCard from "./FeaturedCard";
import MoreFromUser from "./MoreFromUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";

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
        return navigate("/messages");
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
      <div className="w-full mx-auto h-auto md:h-screen max-h-[60vh] object-fit">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {carDetails?.images?.map((img) => (
            <>
              <SwiperSlide>
                <img
                  src={`http://localhost:5001/uploads/cars/${img}`}
                  className="!max-h-[60vh] !h-full w-full object-cover"
                />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>

      {/* car details and user details  */}
      <div className="container mx-auto py-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side (3/4) - Car Details */}
          <div className="lg:col-span-8 min-h-screen">
            <div className="space-y-5 bg-white shadow rounded-lg p-6">
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span>🕒</span> 3 years ago
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
                Information:
              </h2>
              <div className="grid grid-cols-2 gap-y-2 text-[#314352]">
                <p className="font-semibold">Make:</p>
                <p>{carDetails?.make}</p>

                <p className="font-semibold">Model:</p>
                <p>{carDetails?.model}</p>

                <p className="font-semibold">Price:</p>
                <p>${carDetails?.priceUSD}</p>

                <p className="font-semibold">Kilometer:</p>
                <p>{carDetails?.kilometer} km</p>
              </div>
            </div>

            {/* car details  */}
            <div className="space-y-5 bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl text-[#314352] font-bold mt-2">
                Description:
              </h1>
              <p className="text-[#314352] mt-2 mb-5">
                {carDetails?.description}
              </p>
              <span className="border-t pt-5 border-gray-400 font-bold text-gray-400 mb-2 inline-block">
                Related
              </span>
              <div className="flex justify-between items-center w-full">
                <div className="w-1/3">
                  <h3 className="text-[#ff9540] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ff9540] after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                    Maserati GranCabrio
                  </h3>
                  <h4 className="text-gray-400">19/06/2022</h4>
                  <h4 className="text-gray-400">Similar post</h4>
                </div>
                <div className="w-1/3 text-left">
                  <h3 className="text-[#ff9540] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ff9540] after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                    Ferrari F8 Tributo
                  </h3>
                  <h4 className="text-gray-400">17/06/2022</h4>
                  <h4 className="text-gray-400">Similar post</h4>
                </div>
                <div className="w-1/3 ">
                  <h3 className="text-[#ff9540] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ff9540] after:transition-all after:duration-500 after:ease-in-out hover:after:w-full">
                    Lamborghini Aventador S
                  </h3>
                  <h4 className="text-gray-400">18/06/2022</h4>
                  <h4 className="text-gray-400">Similar post</h4>
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
              <div className="w-12 h-12 rounded-full bg-orange-300 text-center flex items-center justify-center font-bold text-xl">
                {(() => {
                  const firstLetter =
                    carDetails?.user?.username?.charAt(0).toUpperCase() || "?";
                  return firstLetter;
                })()}
              </div>
              <div className="space-y-2">
                <Link to={`/dashboard?uid=${user?._id}`}>
                  <p className="mt-2 font-semibold text-orange-400 underline italic">
                    {carDetails?.user?.username}
                  </p>
                </Link>
                {/* <p className="text-sm text-gray-500">● User is offline</p> */}
                {/* See All Ads Link */}
                <div>
                  {/* <a href="#" className="text-[#ff9540] border-b-2">
                    See all ads
                  </a> */}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col  gap-5 justify-between">
              {/* <button
                onClick={() => startNewChat(carDetails?.user)}
                className="w-full bg-[#ff9540] text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <TiMessages /> Chat
              </button> */}
              {/* <a
                href={`mailto:${carDetails?.user?.email}`}
                className="w-full bg-[#ff9540] text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlineMailOutline /> E-mail
              </a> */}
              <a
                href={`tel:${carDetails?.user?.phone}`}
                className="w-full bg-[#ff9540] text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlinePhone /> {carDetails?.user?.phone}
              </a>
              <a
                href={`https://wa.me/${carDetails?.user?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>

            {/* Icons Section */}
            <div className="mt-6 flex justify-center shadow p-5 space-x-4">
              {/* <div className="flex gap-2 items-center">
                <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <IoEyeOutline className="w-1/2 h-1/2" />
                </div>
                <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <IoIosGitCompare className="w-1/2 h-1/2" />
                </div>
                <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <CiHeart className="w-1/2 h-1/2" />
                </div>
              </div> */}
            </div>
            {/* error  */}
            <div className="flex justify-center items-center my-8 gap-2 text-xl text-[#ED5E54] cursor-pointer">
              <MdErrorOutline />
              <h2>Report abuse</h2>
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
