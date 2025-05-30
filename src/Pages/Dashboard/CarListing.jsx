import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Translate from "../../utils/Translate";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiCalendar, CiLocationOn, CiSettings } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import { getArabicModel, getLocalizedLocation, getLocalizedMake } from "../../utils/utils";

const getUidFromUrl = () => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("uid");
};

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [loading, setLoading] = useState(true);
  const uid = getUidFromUrl();
  const user = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Access logout from AuthContext

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars/uid/${uid ? uid : user._id}`
        );
        // console.log(response)
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

  const handleDelete = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    const token = user?.jwt;

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars(cars.filter((car) => car._id !== carId));
      alert("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert(error?.response?.data?.message || "Failed to delete the car.");
    }
  };

  const handleEdit = (carId) => {
    // Navigate to AddListingPage with the car ID to open the edit modal
    navigate(`/edit-listing/${carId}`);
  };

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/", { replace: true }); // Redirect to homepage
  };

  return (
    <div className="container mx-auto px-6 py-10 pb-20 relative">
      {loading ? (
        <div className="text-center text-gray-600 text-xl animate-pulse">
          <Translate text={"Loading cars... ⏳"} />
        </div>
      ) : cars?.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <Translate text={"No cars available right now. 😔"} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars?.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative">
                <img
                  src={`http://api.syriasouq.com/uploads/cars/${car?.images[0]}`}
                  alt={`${getLocalizedMake(car, currentLanguage) || "Unknown Make"} ${getArabicModel(car, currentLanguage) || "Unknown Model"} for sale in ${getLocalizedLocation(car?.location, currentLanguage) || "Unknown Location"} - Image 1`}                  className="w-full h-60 object-cover rounded-t-xl"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image")
                  }
                />
                <span
                  className={`absolute top-2 right-2 text-white text-sm px-3 py-1 rounded ${
                    car.status === "pending"
                      ? "bg-orange-500"
                      : car.status === "available"
                      ? "bg-green-500"
                      : "bg-[#B80200]"
                  }`}
                >
                  {currentLanguage === "ar"
                    ? car.status === "pending"
                      ? "قيد المراجعة"
                      : car.status === "available"
                      ? "نشط"
                      : "مرفوض"
                    : car.status === "pending"
                    ? "Pending"
                    : car.status === "available"
                    ? "Available"
                    : "Rejected"}
                </span>
              </div>

              <div className="p-6">
                {/* Price */}
                <h3 className="text-2xl font-semibold text-gray-900">
                  ${car.priceUSD}
                </h3>

                {/* Make & Model */}
                <h3 className="text-lg text-gray-900">
                  {/* <Translate text={car.make} /> .{" "}
                  
                  <Translate text={car?.model} /> */}

                    
                      {car?.make ? getLocalizedMake(car, currentLanguage) : "آخر"}. {" "}
                  
                {car?.model ? getArabicModel(car, currentLanguage) : "آخر"}
                
                </h3>

                {/* Year */}
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <CiCalendar /> <Translate text={car?.year} />
                </p>

                {/* Transmission */}
                <p className="text-gray-500 flex items-center gap-1">
                  <CiSettings /> <Translate text={car.transmission} />
                </p>

                {/* Engine Size */}
                <p className="text-gray-500 flex items-center gap-1">
                  <AiOutlineDashboard /> <Translate text={car.kilometer
} />
                </p>

                {/* Location */}
                <p className="text-gray-600 mt-1 flex items-center gap-1">
                  <CiLocationOn />{" "}
                  <span>
                  {car?.location ? getLocalizedLocation(car?.location, currentLanguage) : "آخر"}

                  </span>
                </p>

                {/* View Details Button */}
                <Link to={`/listing/${car?._id}`}>
                  <button className="mt-5 w-full bg-[#B80200] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#B80200] transition text-lg cursor-pointer">
                    <Translate text={"View Details"} />
                  </button>
                </Link>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(car._id)}
                  className="mt-3 w-full bg-[#323232fa] text-white font-bold px-4 py-2 rounded-lg hover:bg-bg-[#323232fa] transition text-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaEdit /> {currentLanguage === "ar" ? "تعديل" : "Edit"}
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(car._id)}
                  className="mt-3 w-full bg-[#B80200] text-white font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition text-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  🗑️ {currentLanguage === "ar" ? "مسح الإعلان" : "Delete"}
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
  );
};

export default CarListing;