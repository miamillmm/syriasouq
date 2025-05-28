import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Translate from "../../utils/Translate";
import Navbar from "./NavBar";
import { CiCalendar, CiHeart, CiLocationOn, CiSettings } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import { useTranslation } from "react-i18next";
import { useWishlist } from "../../context/WishlistContext";

const getUidFromUrl = () => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("uid");
};

const Favorites = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = getUidFromUrl();
  const user = JSON.parse(localStorage.getItem("SyriaSouq-auth")); // Assume user is stored in localStorage
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Access logout from AuthContext
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
 const { handleWishlist, isWishlistLoading } = useWishlist(); // Access wishlist context
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Replace with your real API later
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wishlist/uid/${uid ? uid : user._id}`
        );
        if (response.data.success) {
          console.log(response?.data?.data);
          setCars(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
      setLoading(false);
    };

    fetchCars();
  }, [uid, user._id]);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/", { replace: true }); // Redirect to homepage
  };
    // Handle removing a car from the wishlist
  const handleRemoveFromWishlist = async (car, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlistLoading) return;

    try {
      await handleWishlist(car.car); // Toggle wishlist status (removes since already in wishlist)
      // Update local state to remove the car
      setCars((prevCars) => prevCars.filter((item) => item.car._id !== car.car._id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <>
      <main className="pt-32 pb-10">
        <div className="container mx-auto w-full max-w-[1280px]">
          <Navbar />
          <div className="container mx-auto px-6 py-10 pb-20 relative">
            {loading ? (
              <div className="text-center text-gray-600 text-xl animate-pulse">
                <Translate text={"Loading cars... ⏳"} />
              </div>
            ) : cars?.length === 0 ? (
              <div className="text-center text-gray-600 text-lg">
                <Translate
                  text={"No cars available right now in your wishlist. 😔"}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {cars?.map((car) => (
                  <div
                    key={car.car._id}
                    className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300"
                  >
                    <div className="relative">
                      <img
                        src={`http://api.syriasouq.com/uploads/cars/${car?.car?.images[0]}`}
                        alt={car.make}
                        className="w-full h-60 object-cover rounded-t-xl"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/400x300?text=No+Image")
                        }
                      />
                      {/* Remove from Wishlist Button
                     <div
                       onClick={(e) => handleRemoveFromWishlist(car, e)}
                       className={`absolute top-3 ${currentLanguage === "ar" ? "left-3" : "right-3"} hover:text-[#B80200] hover:border-[#B80200] duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-300 cursor-pointer text-gray-600 bg-[#B80200] border-[#B80200] text-white ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                       aria-label={currentLanguage === "ar" ? "إزالة من المفضلة" : "Remove from wishlist"}
                     >
                       <CiHeart className="w-5 h-5" />
                     </div> */}
                    </div>

                    <div className="p-6">
                      {/* Price */}
                      <h3 className="text-2xl font-semibold text-gray-900">
                        ${car.car.priceUSD}
                      </h3>

                      {/* Make & Model */}
                      <h3 className="text-lg text-gray-900">
                        <Translate text={car.car.make} /> .{" "}
                        <Translate text={car?.car.model} />
                      </h3>

                      {/* Year */}
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <CiCalendar /> <Translate text={car?.car.year} />
                      </p>

                      {/* Transmission */}
                      <p className="text-gray-500 flex items-center gap-1">
                        <CiSettings /> <Translate text={car.car.transmission} />
                      </p>

                      {/* Engine Size */}
                      <p className="text-gray-500 flex items-center gap-1">
                        <AiOutlineDashboard />{" "}
                        <Translate text={car.car.engineSize} />
                      </p>

                      {/* Location */}
                      <p className="text-gray-600 mt-1 flex items-center gap-1">
                        <CiLocationOn /> <Translate text={car.car.location} />
                      </p>

                      {/* View Details Button */}
                      <Link to={`/listing/${car?.car._id}`}>
                        <button className="mt-5 w-full bg-[#B80200] text-white font-bold px-4 py-3 rounded-lg hover:bg-[#B80200] transition text-lg cursor-pointer">
                          <Translate text={"View Details"} />
                        </button>
                      </Link>
                      {/* Remove from Wishlist Button */}
                     <button
                       onClick={(e) => handleRemoveFromWishlist(car, e)}
                       className={`mt-3 w-full bg-gray-200 text-black font-bold px-4 py-3 rounded-lg hover:bg-gray-300 transition text-lg cursor-pointer ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                     >
                      <Translate text={currentLanguage === "ar" ? "إزالة من المفضلة" : "Remove from Wishlist"} />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Logout Button in Bottom-Right Corner (Bottom-Left for Arabic) */}
            <div className={`absolute bottom-0 ${currentLanguage === "ar" ? "left-0" : "right-0"} p-4 mt-20`}>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-3 py-2 rounded-lg md:text-lg text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-black"
              >
                {currentLanguage === "ar" ? "تسجيل الخروج" : "LogOut"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorites;