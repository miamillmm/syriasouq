import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiCalendar, CiHeart, CiLocationOn, CiShare2 } from "react-icons/ci";
import { TiArrowRight } from "react-icons/ti";
import { Link } from "react-router";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";

const Featured = () => {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("SyriaSouq-auth")); // Assume user is stored in localStorage

  // Fetch all cars and the user's wishlist when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all cars
        const carRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars?status=available`
        );
        setCars(carRes.data.data);

        // Fetch the user's wishlist
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
  }, []);

  // Function to handle adding cars to the wishlist
  const handleWishlist = async (car) => {
    if (!user) return alert("Please log in before managing your wishlist");

    // Find the wishlist item for this car
    const wishlistItem = wishlist.find((item) => item.car === car._id);

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

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 w-screen py-10 md:py-20">
      {/* header */}
      <div className="header flex flex-col md:flex-row justify-between flex-wrap items-center mb-12">
        <div className="space-y-4 text-center md:text-left">
          <button className="text-[12px] sm:text-[14px] font-[400] text-gray-500 bg-gray-100 py-2 px-4 rounded cursor-pointer">
            {currentLanguage === "ar" ? "مختارات الجلك" : "Handy picked"}
          </button>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#314352]">
            <Translate text={"Featured listings"} />
          </h2>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          {/* <button className="text-[14px] sm:text-[16px] font-[400] text-white bg-[#4b4b4bfa] py-3 sm:py-4 px-6 sm:px-8 rounded cursor-pointer">
            <Translate text={"All"} />
          </button> */}
          <Link to={"/search"}>
            <button className="bg-[#B80200] text-white text-[16px] sm:text-[18px] font-[400] justify-between py-3 sm:py-4 px-8 sm:px-12 rounded-md flex items-center gap-2 cursor-pointer">
              <Translate text={"View All"} />
              <span>
                <TiArrowRight />
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* All Car cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {cars.length > 0 ? (
          <>
            {cars?.map((data) => (
              <>
                <div className="flex md:flex-row flex-col-reverse gap-4 bg-slate-100 p-3 rounded">
                  <div className="relative w-full max-w-[350px]">
                    <Link to={`/listing/${data._id}`} key={data._id}>
                      <div className="overflow-hidden rounded-md">
                        <img
                          alt=""
                          src={`http://localhost:5001/uploads/cars/${data.images[0]}`}
                          className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                        />
                      </div>
                    </Link>
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      <div
                        onClick={() => handleWishlist(data)}
                        className={`hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-white cursor-pointer text-white ${
                          wishlist.some((item) => item.car === data._id)
                            ? "bg-[#B80200] border-[#B80200]"
                            : ""
                        }`}
                      >
                        <CiHeart className="w-1/2 h-1/2" />
                      </div>
                      <div
                        onClick={() => handleShare(data)}
                        className={`hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-white cursor-pointer text-white`}
                      >
                        <CiShare2 className="w-1/2 h-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-between py-0 md:py-2">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-3xl font-bold">
                        ${data?.priceUSD ? data?.priceUSD : "آخر"}
                      </h2>
                      <span className="block px-2 py-1 rounded bg-[#B80200] text-white text-xs">
                        <Translate text={"PREMIUM"} />
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg">
                        {data?.make ? data?.make : "آخر"}
                      </h2>
                      <span className="w-[4px] h-[4px] bg-black rounded-full block"></span>
                      <h2 className="text-lg">
                        {data?.model ? data?.model : "آخر"}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xl">
                        <CiCalendar />
                        <span>{data?.year ? data?.year : "آخر"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xl">
                        <AiOutlineDashboard />
                        <span>
                          {data?.kilometer ? data?.kilometer : "آخر"} km
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xl">
                        <CiLocationOn />
                        <span>{data?.location ? data?.location : "آخر"}</span>
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
              </>
            ))}
          </>
        ) : (
          <>
            <div className="">
              <h2 className="text-3xl text-[#B80200] text-center">
                No Result Found
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
