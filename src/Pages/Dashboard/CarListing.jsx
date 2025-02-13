import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const getUidFromUrl = () => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("uid");
};

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = getUidFromUrl();
  const user = JSON.parse(localStorage.getItem("SyriaSouq-auth")); // Assume user is stored in localStorage

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Replace with your real API URL
        // const response = await axios.get("https://api.example.com/cars");
        // setCars(response.data);

        // Replace with your real API later
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars/uid/${uid ? uid : user._id}`
        );
        // const response = await axios.get(`https://api.example.com/api/cars`);
        if (response.data.success) {
          console.log(response?.data?.data);
          setCars(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        // Demo data (for now)
        setCars([
          {
            id: 1,
            name: "Tesla Model S",
            brand: "Tesla",
            model: "Model S",
            year: 2023,
            price: "$85,000",
            mileage: "15,000 miles",
            fuel: "Electric",
            location: "Los Angeles, CA",
            image:
              "https://cdn.pixabay.com/photo/2019/12/17/04/54/tesla-4705739_1280.jpg",
          },
          {
            id: 2,
            name: "BMW M3",
            brand: "BMW",
            model: "M3",
            year: 2022,
            price: "$72,000",
            mileage: "10,500 miles",
            fuel: "Gasoline",
            location: "New York, NY",
            image:
              "https://cdn.pixabay.com/photo/2016/09/02/22/34/bmw-1646326_1280.jpg",
          },
          {
            id: 3,
            name: "Audi R8",
            brand: "Audi",
            model: "R8",
            year: 2021,
            price: "$160,000",
            mileage: "8,000 miles",
            fuel: "Gasoline",
            location: "Miami, FL",
            image:
              "https://cdn.pixabay.com/photo/2016/11/29/08/49/audi-1866623_1280.jpg",
          },
        ]);
      }
      setLoading(false);
    };

    fetchCars();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
        🚗 Explore Our Premium Car Collection
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 text-xl animate-pulse">
          Loading cars... ⏳
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No cars available right now. 😔
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
                  src={`http://localhost:5001/uploads/cars/${car.images[0]}`}
                  alt={car.make}
                  className="w-full h-60 object-cover rounded-t-xl"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image")
                  }
                />
                <span className="absolute top-2 right-2 bg-[#B80200] text-white text-sm px-3 py-1 rounded-full">
                  {car.priceUSD}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {car.make}
                </h3>
                <p className="text-gray-500 text-sm">
                  {car.brand} • {car.model} • {car.year}
                </p>
                <p className="text-gray-700 font-medium">
                  Mileage: {car.kilometer}
                </p>
                {/* <p className="text-gray-500">⛽ {car.fuelType}</p>
                <p className="text-gray-600 mt-1">📍 {car.location}</p> */}
                <Link to={`/listing/${car?._id}`}>
                  <button className="mt-5 w-full bg-[#B80200] text-white font-bold px-4 py-3 rounded-lg hover:bg-[#B80200] transition text-lg cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListing;
