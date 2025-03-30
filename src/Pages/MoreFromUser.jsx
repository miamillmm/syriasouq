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

const cars = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnIXnEn2igucsK9Q_gFJaJK5KAosOuYey94wWA6G-0oYoTjet1UBXHjJeaCuhM939L00Y&usqp=CAU",
    carName: "Tesla Model S",
    price: 79999,
    views: 1200,
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8G0BYbt9A82jA2mO7rHdrIL96WTS8ZAn6w&s",
    carName: "BMW X5",
    price: 60999,
    views: 985,
  },
  {
    id: 3,
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Q7/12198/1732789850926/side-view-(left)-90.jpg",
    carName: "Audi Q7",
    price: 68999,
    views: 1100,
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkd5e_Bq8kcICm4-iK0FKiynTvPLe3Vyxqg&s",
    carName: "Mercedes-Benz GLE",
    price: 72999,
    views: 1300,
  },
  {
    id: 5,
    image:
      "https://images.prismic.io/carwow/c2d2e740-99e2-4faf-8cfa-b5a75c5037c0_ford-mustang-2024-lhd-front34static.jpg?auto=format&cs=tinysrgb&fit=crop&q=60&w=750",
    carName: "Ford Mustang",
    price: 55999,
    views: 1450,
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKd67PTSEk4QXu6aVdKzy0-MOroC2XXryAw&s",
    carName: "Chevrolet Camaro",
    price: 52999,
    views: 1250,
  },
  {
    id: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4OK6fAthgk4GQuSrTAK-WBp53lPUKHevJQ&s",
    carName: "Porsche Cayenne",
    price: 89999,
    views: 970,
  },
  {
    id: 8,
    image:
      "https://www.autoblog.com/.image/t_share/MjA5MDg5MTU1NjM1NDg4NjEy/2024-range-rover-evoque.jpg",
    carName: "Range Rover Evoque",
    price: 67999,
    views: 1020,
  },
  {
    id: 9,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZrPg8oxK1WV11VAvG0a3Rf4zft_U2i_pVLA&s",
    carName: "Toyota Land Cruiser",
    price: 84999,
    views: 890,
  },
];

export default function MoreFromUser({ title, button, uid }) {
  const swiperRef = useRef(null);

  const [listings, setListings] = useState([]);

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

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("SyriaSouq-auth")); // Assume user is stored in localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const wishlistRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/wishlist/uid/${user._id}`, // Assuming API endpoint for fetching wishlist
            {
              headers: { authorization: `Bearer ${user.jwt}` },
            }
          );
          setWishlist(wishlistRes.data.data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleWishlist = async (car) => {
    if (!user) return alert("Please log in before managing your wishlist");

    // Find the wishlist item for this car
    const wishlistItem = wishlist.find((item) => item.car._id === car._id);

    if (wishlistItem) {
      // If the car is in the wishlist, remove it
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/wishlist/${wishlistItem._id}`, // Assuming wishlist items have unique IDs
          {
            headers: { authorization: `Bearer ${user.jwt}` },
          }
        );

        alert("Car Removed from Wishlist");

        // Update the wishlist state by filtering out the removed item
        setWishlist(wishlist.filter((item) => item._id !== wishlistItem._id));
        window.location.reload();
      } catch (error) {
        console.log("Error removing from wishlist:", error);
      }
    } else {
      // If the car is not in the wishlist, add it
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/wishlist`,
          {
            userId: user._id,
            carId: car._id,
          },
          {
            headers: { authorization: `Bearer ${user.jwt}` },
          }
        );

        alert("Car Added to Wishlist");

        // Update wishlist state
        setWishlist([...wishlist, res.data.data]);
        window.location.reload();
      } catch (error) {
        console.log("Error adding to wishlist:", error);
      }
    }
  };

  const handleShare = (car) => {
    const shareLink = `${window.location.origin}/listing/${car._id}`; // Adjust based on your app's routing

    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  return (
    <div className="w-full py-10 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="sm:text-3xl text-2xl text-[#314252] font-bold">
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          {/* <button className="bg-[#B80200] px-4 py-2 rounded-md text-white cursor-pointer">
            <Translate text={button} />
          </button> */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-[#B80200] text-white p-2 rounded cursor-pointer"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-[#B80200] text-white p-2 rounded cursor-pointer"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="overflow-hidden"
      >
        {listings.length > 0 ? (
          listings.map((car) => (
            <SwiperSlide key={car.id}>
              {/* <Link to={`/listing/${car._id}`}>
                <div className="shadow-sm shadow-indigo-100 rounded">
                  <div className="overflow-hidden rounded-t-md">
                    <img
                      alt=""
                      src={`http://api.syriasouq.com/uploads/cars/${car.images[0]}`}
                      className="!h-40 sm:!h-56 w-full object-fit bg-center transition-transform duration-500 hover:scale-105 ease-in-out"
                    />
                  </div>
                  <div>
                    <div className=" space-y-1 sm:space-y-2 text-[16px] sm:text-[18px] font-semibold text-left p-4">
                      <h2 className=" text-[#314352]">{car.make}</h2>
                      <h2 className=" text-[#314352]">${car.priceUSD}</h2>
                    </div>
                    <div className="mt-6 text-xs border-t-2 border-gray-100 py-3">
                      <div className="flex justify-between px-4 py-2">
                        <div className="flex gap-2 items-center">
                          <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <IoEyeOutline className="w-1/2 h-1/2" />
                          </div>
                          <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <IoIosGitCompare className="w-1/2 h-1/2" />
                          </div>
                          <div className="hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <CiHeart className="w-1/2 h-1/2" />
                          </div>
                        </div>
                        <div className="flex justify-center items-center cursor-pointer">
                          <p className="text-gray-400 text-[12px] sm:text-[14px]">
                            {car?.views} Views
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link> */}
              <div className="flex md:flex-row flex-col-reverse gap-4 bg-slate-100 p-3 rounded">
                <div className="relative w-full max-w-[350px]">
                  <Link to={`/listing/${car?._id}`} key={car?._id}>
                    <div className="overflow-hidden rounded-md">
                      <img
                        alt=""
                        src={`http://api.syriasouq.com/uploads/cars/${car?.images[0]}`}
                        className="!h-48 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                      />
                    </div>
                  </Link>
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    {/* <div
                      onClick={() => handleWishlist(car)}
                      className={`hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-white cursor-pointer text-white ${
                        wishlist?.some((item) => item.car?._id === car._id)
                          ? "bg-[#B80200] border-[#B80200]"
                          : ""
                      }`}
                    >
                      <CiHeart className="w-1/2 h-1/2" />
                    </div> */}
                    {/* <div
                      onClick={() => handleShare(car)}
                      className={`hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-white cursor-pointer text-white`}
                    >
                      <CiShare2 className="w-1/2 h-1/2" />
                    </div> */}
                  </div>
                </div>
                <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-bold">
                      <span className="text-xl">$ </span>
                      {car?.priceUSD ? car?.priceUSD : "آخر"}
                    </h2>
                    {/* <span className="block px-2 py-1 rounded bg-[#B80200] text-white text-xs">
                      {currentLanguage === "ar" ? "مميز" : "PREMIUM"}
                    </span> */}
                  </div>
                  <div className="flex items-center gap-2 md:mt-3">
                    <h2 className="text-sm">
                      {getLocalizedMake(car, currentLanguage)}
                    </h2>
                    <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                    <h2 className="text-sm">
                      {getArabicModel(car, currentLanguage)}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <CiCalendar />
                      <span>{car?.year ? car?.year : "آخر"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <AiOutlineDashboard />
                      <span>
                        {car?.kilometer ? car?.kilometer : "آخر"}{" "}
                        <Translate text={"km"} />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <CiLocationOn />
                      <span>
                        {getLocalizedLocation(car?.location, currentLanguage)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 md:mt-4">
                    <Link
                      to={`/listing/${car?._id}`}
                      className="block bg-[#B80200] text-white text-lg py-1 px-4 rounded"
                    >
                      <Translate text={"View Details"} />
                    </Link>
                  </div>
                  {/* <div className="text-sm flex justify-end items-center">
                    <Translate text={"Listed By:"} /> {car.user.username}
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <>
            {/* <h2 className="text-red-500 font-bold text-md">No Listing</h2> */}
          </>
        )}
      </Swiper>
    </div>
  );
}
