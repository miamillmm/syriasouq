import React from "react";
import { useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import img1 from "../assets/car/IMG_1.jpeg";
import img2 from "../assets/car/IMG_2.jpeg";
import img3 from "../assets/car/IMG_3.jpeg";
import img4 from "../assets/car/IMG_4.jpeg";
import img5 from "../assets/car/IMG_5.jpeg";
import img6 from "../assets/car/IMG_6.jpeg";
import img7 from "../assets/car/IMG_7.jpeg";
import img8 from "../assets/car/IMG_8.jpeg";
import img9 from "../assets/car/IMG_9.jpeg";
import Breadcrumb from "./Breadcumb";
import { TiMessages } from "react-icons/ti";
import { MdOutlineMailOutline, MdErrorOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import FeaturedCard from "./FeaturedCard";
import MoreFromUser from "./MoreFromUser";

const CarDetails = () => {
  const { carname } = useParams();

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      {/* top path and slider */}
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={carname} />
      </h2>
      <div className="w-full max-w-4xl mx-auto h-auto md:h-screen">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
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
          <SwiperSlide>
            <img src={img1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img4} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img5} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img6} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img7} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img8} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img9} />
          </SwiperSlide>
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
                {carname}
              </h1>
              <p className="text-3xl font-semibold text-[#314352] mt-2">
                $44,900
              </p>
            </div>

            {/* Car Information */}
            <div className="p-6">
              <h2 className="text-2xl pb-4 text-[#314352] font-semibold">
                Information:
              </h2>
              <div className="grid grid-cols-2 gap-y-2 text-[#314352]">
                <p className="font-semibold">Make:</p>
                <p>Maserati</p>

                <p className="font-semibold">Model:</p>
                <p>GranCabrio</p>

                <p className="font-semibold">Price:</p>
                <p>$44,900</p>

                <p className="font-semibold">Kilometer:</p>
                <p>20,197 km</p>
              </div>
            </div>

            {/* car details  */}
            <div className="space-y-5 bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl text-[#314352] font-bold mt-2">
                Description:
              </h1>
              <p className="text-[#314352] mt-2 mb-5">
                We are TangibleDesign – a group of developers with experience in
                managing successful websites and e-commerce shops. We know how
                hard it is for you or your clients to gain a competitive
                advantage and we are ready to create the optimum products for
                the growth of your business in the new age of competition.
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
              <div className="avatar">
                <div className="w-14 rounded-full ">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="mt-2 font-semibold text-gray-900">
                  syriasouqshop
                </p>
                <p className="text-sm text-gray-500">● User is offline</p>
                {/* See All Ads Link */}
                <div>
                  <a href="#" className="text-[#ff9540] border-b-2">
                    See all ads
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col md:flex-row gap-5 justify-between">
              <button className="w-full bg-[#ff9540] text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer">
                <TiMessages /> Chat
              </button>
              <button className="w-full bg-[#ff9540] text-[#314352] py-4 px-8 font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer">
                <MdOutlineMailOutline /> E-mail
              </button>
            </div>

            {/* Icons Section */}
            <div className="mt-6 flex justify-center shadow p-5 space-x-4">
              <div className="flex gap-2 items-center">
                <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <IoEyeOutline className="w-1/2 h-1/2" />
                </div>
                <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <IoIosGitCompare className="w-1/2 h-1/2" />
                </div>
                <div className="hover:text-[#ff9540] hover:border-[#ff9540] duration-500 w-12 h-12 rounded-full flex justify-center items-center border border-gray-400 cursor-pointer">
                  <CiHeart className="w-1/2 h-1/2" />
                </div>
              </div>
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
