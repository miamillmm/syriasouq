import { useState } from "react";
import img from "../assets/bg-image/banner-img.jpg";
import { useNavigate } from "react-router";

const BannerSection = () => {
  const navigate = useNavigate();

  const [searchMake, setSerachMake] = useState(null);
  const [searchModel, setSerachModel] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const handleSerach = (e) => {
    e.preventDefault();
    alert("Submited");
    navigate(
      `/search?minYear=${minYear}&maxYear=${maxYear}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div
      className="relative border-t-2 border-[#576877] py-16 pt-34 sm:py-24 flex items-center justify-center min-h-[80vh]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#304455",
          opacity: 0.85,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
        {/* Left Side */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold mb-4 tracking-[-0.04em]">
            The #1 Website <span className="text-[#ff9540]">buy</span> &{" "}
            <span className="text-[#ff9540]">sell</span> cars in Syria
          </h1>
          <p className="text-base sm:text-lg md:text-2xl font-light">
            Our goal is to meet your needs <br className="hidden sm:block" />{" "}
            and exceed your expectations.
          </p>
          <div className="mt-3 hidden md:block ml-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="165"
              height="132"
              viewBox="0 0 165 132"
              fill="none"
            >
              <path
                d="M2.34023 75.9972C8.21078 91.5275 30.6305 105.065 43.8518 106.15C102.049 110.93 125.108 73.862 136.864 20.142"
                stroke="#FF9540"
                strokeWidth="3"
                strokeDasharray="8"
              ></path>{" "}
              <path
                d="M119.737 26.7773C145.605 11.3468 136.232 6.43047 147.243 29.7675"
                stroke="#FF9540"
                strokeWidth="3"
              ></path>
            </svg>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-[#374b5c] shadow-lg rounded-2xl w-full md:w-3/4 p-6 sm:p-8 ml-auto mt-10 md:mt-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
            Search listings
          </h2>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSerach}>
            <div className="space-y-4">
              <select
                name="make"
                className="w-full rounded-lg border-gray-300 hover:border-[#ff9540] px-4 py-3 sm:py-4 text-white bg-transparent"
                onChange={(e) => setSerachMake(e.target.value)}
              >
                <option value="" disabled selected>
                  -- Make --
                </option>
                <option value="BMW">BMW</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Ferrari">Ferrari</option>
              </select>
              <select
                name="model"
                className="w-full rounded-lg border-gray-300 hover:border-[#ff9540] px-4 py-3 sm:py-4 text-white bg-transparent"
                onChange={(e) => setSerachModel(e.target.value)}
              >
                <option value="" disabled selected>
                  -- Model --
                </option>
                <option value="BMW">BMW</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Ferrari">Ferrari</option>
              </select>
            </div>

            {searchMake && searchModel && (
              <>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min Year"
                    className="w-1/2 rounded-lg border-gray-300 hover:border-[#ff9540] px-4 py-3 sm:py-4 text-white placeholder:text-white"
                    onChange={(e) => setMinYear(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max Year"
                    className="w-1/2 rounded-lg border-gray-300 hover:border-[#ff9540] px-4 py-3 sm:py-4 text-white placeholder:text-white"
                    onChange={(e) => setMaxYear(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="w-1/2 rounded-lg border-gray-300 hover:border-[#ff9540] px-4 py-3 sm:py-4 text-white placeholder:text-white"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="w-1/2 rounded-lg border-gray-300 hover:border-[#ff9540] px-4 py-3 sm:py-4 text-white placeholder:text-white"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#ff9540] hover:bg-[#ffa258] py-3 sm:py-4 rounded-lg text-[#314352] text-lg cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
