import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Importing images from the local assets folder
import img1 from "../assets/car/IMG_1.jpeg";
import img2 from "../assets/car/IMG_6.jpeg";
import img3 from "../assets/car/IMG_9.jpeg";

const listings = [
  { id: 1, title: "Raptor F150 – 2020", price: "$60,000", image: img1 },
  { id: 2, title: "Tesla Model X – 2022", price: "$80,000", image: img2 },
  { id: 3, title: "BMW M5 – 2021", price: "$75,000", image: img3 },
];

const FeaturedCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextListing = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === listings.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevListing = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? listings.length - 1 : prevIndex - 1
    );
  };

  const { title, price, image } = listings[currentIndex];

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <div className="mb-5 pb-4 border-b border-gray-400 font-semibold text-gray-700">
        Featured listings
      </div>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#314352]">{title}</h2>
        <p className="text-[#314352] text-lg">{price}</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
        <span className="text-gray-600 text-sm">
          {currentIndex + 1} / {listings.length}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={prevListing}
            className="p-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={nextListing}
            className="p-2 bg-[#ff9540] text-white rounded cursor-pointer"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
