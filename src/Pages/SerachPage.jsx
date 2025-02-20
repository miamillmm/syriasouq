import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaList, FaTh, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import Breadcrumb from "./Breadcumb";

const SearchPage = () => {
  const [datas, setDatas] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("Most Relevant");
  const [filters, setFilters] = useState({
    make: [],
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    kilometer: "",
    location: "",
    engineSize: [],
    transmission: "",
    fuelType: [],
    exteriorColor: "",
    interiorColor: "",
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => {
        // const sanitizedData = res.data.map((item) => ({
        //   ...item,
        //   make: String(item.make || ""),
        //   location: String(item.location || ""),
        // }));
        setDatas(res.data.data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const sortData = (option) => {
    const sortedData = [...datas];

    switch (option) {
      case "Newest":
        sortedData.sort((a, b) => b.year - a.year);
        break;
      case "Oldest":
        sortedData.sort((a, b) => a.year - b.year);
        break;
      case "Highest Price":
        sortedData.sort((a, b) => b.price_usd - a.price_usd);
        break;
      case "Lowest Price":
        sortedData.sort((a, b) => a.price_usd - b.price_usd);
        break;
      default:
        break;
    }

    setDatas(sortedData);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "make") {
      setFilters((prev) => ({
        ...prev,
        make: checked
          ? [...prev.make, value]
          : prev.make.filter((item) => item !== value),
      }));
    } else if (name === "make") {
      setFilters((prev) => ({ ...prev, make: [value] }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredData = datas.filter((data) => {
    const {
      make,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      kilometer,
      location,
      engineSize,
      transmission,
      fuelType,
      exteriorColor,
      interiorColor,
    } = filters;

    const matchesKilometer =
      !kilometer ||
      (kilometer === "0-10000" &&
        data.kilometer >= 0 &&
        data.kilometer <= 10000) ||
      (kilometer === "10001-50000" &&
        data.kilometer >= 10001 &&
        data.kilometer <= 50000) ||
      (kilometer === "50001-100000" &&
        data.kilometer >= 50001 &&
        data.kilometer <= 100000);

    const matchesEngineSize =
      engineSize.length === 0 ||
      engineSize.some((size) => {
        const [min, max] = size.split("-").map((n) => parseInt(n, 10));
        return data.engine_size_cc >= min && data.engine_size_cc <= max;
      });

    return (
      (make.length > 0
        ? make.some((m) =>
            String(data.make || "")
              .toLowerCase()
              .includes(m.toLowerCase())
          )
        : true) &&
      (minYear ? data.year >= parseInt(minYear, 10) : true) &&
      (maxYear ? data.year <= parseInt(maxYear, 10) : true) &&
      (minPrice ? data.price_usd >= parseFloat(minPrice) : true) &&
      (maxPrice ? data.price_usd <= parseFloat(maxPrice) : true) &&
      matchesKilometer &&
      (location
        ? String(data.location || "")
            .toLowerCase()
            .includes(location.toLowerCase())
        : true) &&
      matchesEngineSize &&
      (transmission ? data.transmission === transmission : true) &&
      (fuelType.length > 0 ? fuelType.includes(data.fuel_type) : true) &&
      (exteriorColor
        ? data.exterior_color.toLowerCase() === exteriorColor.toLowerCase()
        : true) &&
      (interiorColor
        ? data.interior_color.toLowerCase() === interiorColor.toLowerCase()
        : true)
    );
  });

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={""} />
      </h2>

      <div className="grid grid-cols-8 gap-10">
        <div className="xl:col-span-2 col-span-8 shadow rounded">
          <button
            className="xl:hidden block py-2 px-8 rounded shadow bg-red-500 text-white cursor-pointer"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            Filter
          </button>
          {/* filter side bar  */}
          <div className="xl:col-span-2 col-span-8 shadow rounded p-4 xl:block hidden">
            <h3 className="font-bold text-xl mb-4">Filters</h3>
            {/* Make */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Make</label>
              <input
                type="text"
                name="make"
                value={filters.make[0] || ""}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                placeholder="Search make"
              />
              {["BMW", "Chevrolet", "Ferrari", "Ford", "Jaguar"].map((make) => (
                <div key={make}>
                  <input
                    type="checkbox"
                    name="make"
                    value={make}
                    checked={filters.make.includes(make)}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{make}</label>
                </div>
              ))}
            </div>

            {/* Year */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Year</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minYear"
                  value={filters.minYear}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Min Year"
                />
                <input
                  type="number"
                  name="maxYear"
                  value={filters.maxYear}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Max Year"
                />
              </div>
            </div>
            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Max Price"
                />
              </div>
            </div>
            {/* Kilometer */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Kilometer</label>
              <select
                name="kilometer"
                value={filters.kilometer}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">Select Kilometer</option>
                <option value="0-10000">0-10,000</option>
                <option value="10001-50000">10,001-50,000</option>
                <option value="50001-100000">50,001-100,000</option>
              </select>
            </div>
            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                placeholder="Search location"
              />
              {[
                "Damascus",
                "Aleppo",
                "Daraa",
                "Deir ez-Zor",
                "Hama",
                "Homs",
              ].map((loc) => (
                <div key={loc}>
                  <input
                    type="checkbox"
                    name="location"
                    value={loc}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{loc}</label>
                </div>
              ))}
            </div>
            {/* Engine Size */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Engine Size (CC)
              </label>
              {["0-499 cc", "1000-1499 cc", "3000-3499 cc"].map((size) => (
                <div key={size}>
                  <input
                    type="checkbox"
                    name="engineSize"
                    value={size}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{size}</label>
                </div>
              ))}
            </div>
            {/* Transmission */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Transmission</label>
              {["Automatic", "Manual"].map((trans) => (
                <div key={trans}>
                  <input
                    type="radio"
                    name="transmission"
                    value={trans}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{trans}</label>
                </div>
              ))}
            </div>
            {/* Fuel Type */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Fuel Type</label>
              {["Petrol", "Diesel", "Electric", "Gasoline"].map((fuel) => (
                <div key={fuel}>
                  <input
                    type="checkbox"
                    name="fuelType"
                    value={fuel}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{fuel}</label>
                </div>
              ))}
            </div>
            {/* Exterior Color */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Exterior Color</label>
              <select
                name="exteriorColor"
                value={filters.exteriorColor}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
              </select>
            </div>
            {/* Interior Color */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Interior Color</label>
              <select
                name="interiorColor"
                value={filters.interiorColor}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
                <option value="Beige">Beige</option>
              </select>
            </div>
          </div>

          {isMobileFilterOpen && (
            <>
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-700/50 z-[999999] p-5">
                <button>
                  <FaTimes
                    className="text-4xl text-white"
                    onClick={() => setIsMobileFilterOpen(false)}
                  />
                </button>
                <div className="xl:col-span-2 col-span-8 shadow rounded p-4 bg-slate-50 h-full overflow-scroll mb-4">
                  <h3 className="font-bold text-xl mb-4">Filters</h3>
                  {/* Make */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Make</label>
                    <input
                      type="text"
                      name="make"
                      value={filters.make[0] || ""}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      placeholder="Search make"
                    />
                    {["BMW", "Chevrolet", "Ferrari", "Ford", "Jaguar"].map(
                      (make) => (
                        <div key={make}>
                          <input
                            type="checkbox"
                            name="make"
                            value={make}
                            checked={filters.make.includes(make)}
                            onChange={handleFilterChange}
                          />
                          <label className="ml-2">{make}</label>
                        </div>
                      )
                    )}
                  </div>

                  {/* Year */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Year</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="minYear"
                        value={filters.minYear}
                        onChange={handleFilterChange}
                        className="w-1/2 border p-2 rounded"
                        placeholder="Min Year"
                      />
                      <input
                        type="number"
                        name="maxYear"
                        value={filters.maxYear}
                        onChange={handleFilterChange}
                        className="w-1/2 border p-2 rounded"
                        placeholder="Max Year"
                      />
                    </div>
                  </div>
                  {/* Price */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="w-1/2 border p-2 rounded"
                        placeholder="Min Price"
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="w-1/2 border p-2 rounded"
                        placeholder="Max Price"
                      />
                    </div>
                  </div>
                  {/* Kilometer */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Kilometer
                    </label>
                    <select
                      name="kilometer"
                      value={filters.kilometer}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <option value="">Select Kilometer</option>
                      <option value="0-10000">0-10,000</option>
                      <option value="10001-50000">10,001-50,000</option>
                      <option value="50001-100000">50,001-100,000</option>
                    </select>
                  </div>
                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      placeholder="Search location"
                    />
                    {[
                      "Damascus",
                      "Aleppo",
                      "Daraa",
                      "Deir ez-Zor",
                      "Hama",
                      "Homs",
                    ].map((loc) => (
                      <div key={loc}>
                        <input
                          type="checkbox"
                          name="location"
                          value={loc}
                          onChange={handleFilterChange}
                        />
                        <label className="ml-2">{loc}</label>
                      </div>
                    ))}
                  </div>
                  {/* Engine Size */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Engine Size (CC)
                    </label>
                    {["0-499 cc", "1000-1499 cc", "3000-3499 cc"].map(
                      (size) => (
                        <div key={size}>
                          <input
                            type="checkbox"
                            name="engineSize"
                            value={size}
                            onChange={handleFilterChange}
                          />
                          <label className="ml-2">{size}</label>
                        </div>
                      )
                    )}
                  </div>
                  {/* Transmission */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Transmission
                    </label>
                    {["Automatic", "Manual"].map((trans) => (
                      <div key={trans}>
                        <input
                          type="radio"
                          name="transmission"
                          value={trans}
                          onChange={handleFilterChange}
                        />
                        <label className="ml-2">{trans}</label>
                      </div>
                    ))}
                  </div>
                  {/* Fuel Type */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Fuel Type
                    </label>
                    {["Petrol", "Diesel", "Electric", "Gasoline"].map(
                      (fuel) => (
                        <div key={fuel}>
                          <input
                            type="checkbox"
                            name="fuelType"
                            value={fuel}
                            onChange={handleFilterChange}
                          />
                          <label className="ml-2">{fuel}</label>
                        </div>
                      )
                    )}
                  </div>
                  {/* Exterior Color */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Exterior Color
                    </label>
                    <select
                      name="exteriorColor"
                      value={filters.exteriorColor}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <option value="">Select Color</option>
                      <option value="Black">Black</option>
                      <option value="White">White</option>
                      <option value="Blue">Blue</option>
                    </select>
                  </div>
                  {/* Interior Color */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Interior Color
                    </label>
                    <select
                      name="interiorColor"
                      value={filters.interiorColor}
                      onChange={handleFilterChange}
                      className="w-full border p-2 rounded"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <option value="">Select Color</option>
                      <option value="Black">Black</option>
                      <option value="Gray">Gray</option>
                      <option value="Beige">Beige</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-span-6">
          <div className="flex justify-between xl:items-center mb-4 p-2 rounded bg-transparent xl:flex-row flex-col">
            <h2 className="xl:text-[24px] text-[18px] font-semibold mr-4">
              {filteredData?.length} Results{" "}
              <span className="text-red-500 xl:text-[15px] text-[12px]">
                Classified Ads
              </span>
            </h2>
            <div className="flex xl:items-center gap-8 xl:flex-row flex-col">
              {/* <select
                 className="border border-gray-200 p-3 pr-10 rounded-lg bg-white appearance-none h-16 w-full shadow-md text-gray-700 font-medium cursor-pointer"
                style={{ backgroundColor: "#ffff" }}
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  sortData(e.target.value);
                }}
              >
                <option>Most Relevant</option>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Highest Price</option>
                <option>Lowest Price</option>
                
              </select> */}

              <div className="flex items-center space-x-2">
                {/* Left side label */}
                <label className="text-gray-700 font-semibold">Sort by:</label>

                {/* Dropdown with arrow */}
                <div className="relative xl:w-64 w-40">
                  <select
                    className="border border-gray-200 xl:p-3 p-1 pr-10 rounded-lg bg-white appearance-none xl:h-16 h-10 w-full shadow-md text-gray-700 font-medium cursor-pointer"
                    style={{ backgroundColor: "#ffff" }}
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value);
                      sortData(e.target.value);
                    }}
                  >
                    <option>Most Relevant</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Highest Price</option>
                    <option>Lowest Price</option>
                  </select>

                  {/* Dropdown Arrow (Right Side) */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 xl:w-20 w-12 xl:h-16 h-10 flex items-center justify-center rounded cursor-pointer border hover:text-red-500 hover:border-red-500 duration-300 ${
                    view === "grid"
                      ? "border-red-500 bg-red-500 duration-100"
                      : "border-gray-200"
                  }`}
                >
                  <FaTh className="w-1/2 h-1/2" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 xl:w-20 w-12 xl:h-16 h-10 flex items-center justify-center rounded cursor-pointer border hover:text-red-500 hover:border-red-500 duration-300 ${
                    view === "list"
                      ? "border-red-500 bg-red-500 duration-100"
                      : "border-gray-200"
                  }`}
                >
                  <FaList className="w-1/2 h-1/2" />
                </button>
              </div>
            </div>
          </div>
          <div
            className={`grid mb-10 ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : ""
            }`}
          >
            {filteredData?.length > 0 ? (
              filteredData?.map((data, index) => (
                <Link to={`/listing/${data._id}`} key={data.id}>
                  <div
                    className={`relative shadow-sm rounded ${
                      index < 2 ? "border-red-500 border-2 bg-[#FFEEE2]" : ""
                    }`} // Apply border to first two cards
                  >
                    {/* Add "Featured" badge */}

                    {index < 2 && (
                      <div className="absolute top-5 left-5 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg z-10 pointer-events-none">
                        Featured
                      </div>
                    )}

                    {view === "grid" ? (
                      <div>
                        {/* Image in grid view */}
                        <div className="overflow-hidden rounded-t-md">
                          <img
                            alt=""
                            src={`http://localhost:5001/uploads/cars/${data.images[0]}`}
                            className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                          />
                        </div>

                        {/* Name, price, and buttons */}
                        <div className="px-4 py-3">
                          <h2 className="text-[#314352] font-semibold text-lg">
                            {data.make}
                          </h2>
                          <p className="text-[#314352] text-lg">
                            ${data.priceUSD}
                          </p>
                        </div>

                        {/* Buttons and view counter */}
                        <div className="mt-6 text-xs border-t-2 border-gray-100 py-3">
                          <div className="flex justify-between px-4 py-2">
                            <div className="flex gap-2 items-center">
                              {/* <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                                <IoEyeOutline className="w-1/2 h-1/2" />
                              </div>
                              <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                                <IoIosGitCompare className="w-1/2 h-1/2" />
                              </div> */}
                              <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                                <CiHeart className="w-1/2 h-1/2" />
                              </div>
                            </div>
                            <div className="flex justify-center items-center cursor-pointer">
                              <p className="text-gray-400 text-[12px] sm:text-[14px]">
                                {data.views} Views
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4 items-center relative">
                        {/* Image on the left */}
                        <div className="w-56 h-56 sm:w-72 sm:h-72 overflow-hidden rounded-md">
                          <img
                            alt=""
                            src={`http://localhost:5001/uploads/cars/${data.images[0]}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Text information on the right */}
                        <div className="flex flex-col justify-between w-full">
                          <h2 className="text-[#314352] font-semibold text-lg">
                            {data.make}
                          </h2>
                          <p className="text-[#314352] text-lg">
                            ${data.priceUSD}
                          </p>
                          <p className="text-sm text-gray-500">
                            {data.year} | {data.kilometer} km
                          </p>
                          <p className="text-sm text-gray-500">
                            {data.location}
                          </p>
                        </div>

                        {/* Icons in the bottom-right corner in list view */}
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          {/* <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <IoEyeOutline className="w-1/2 h-1/2" />
                          </div>
                          <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <IoIosGitCompare className="w-1/2 h-1/2" />
                          </div> */}
                          <div className="hover:text-red-500 hover:border-red-500 duration-500 w-8 h-8 rounded-full flex justify-center items-center border border-gray-400">
                            <CiHeart className="w-1/2 h-1/2" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <h2 className="text-3xl text-red-600 text-center">
                No Results Found
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
