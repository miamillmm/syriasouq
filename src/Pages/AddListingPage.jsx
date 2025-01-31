import React, { useState } from "react";
import Select from "react-select";
import FeaturesSection from "./FeaturesSection";
import DescriptionEditor from "./DescriptionEditor";
import ImageUpload from "./ImageUpload";
import { Link } from "react-router";

const carMakes = [
  { value: "Abarth", label: "Abarth" },
  { value: "Alfa Romeo", label: "Alfa Romeo" },
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "Audi", label: "Audi" },
  { value: "Avatr", label: "Avatr" },
  { value: "BAIC", label: "BAIC" },
  { value: "Bentley", label: "Bentley" },
  { value: "Bestune", label: "Bestune" },
  { value: "BMW", label: "BMW" },
  { value: "Bugatti", label: "Bugatti" },
  { value: "BYD", label: "BYD" },
];

const AddListingPage = () => {
  // State variables for each input/select field
  const [listingName, setListingName] = useState("");
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [priceUSD, setPriceUSD] = useState("");
  const [priceSYP, setPriceSYP] = useState("");
  const [year, setYear] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [engineSize, setEngineSize] = useState(null);
  const [location, setLocation] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [exteriorColor, setExteriorColor] = useState(null);
  const [interiorColor, setInteriorColor] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      listingName,
      make,
      model,
      priceUSD,
      priceSYP,
      year,
      kilometer,
      engineSize,
      location,
      transmission,
      fuelType,
      exteriorColor,
      interiorColor,
      description,
      selectedFeatures,
      uploadedImages,
    };

    console.log("Form Data Submitted:", formData);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="pt-25">
      {/* login or register first */}
      <div className="px-28">
        <h1 className="text-[#314352] text-3xl font-bold py-10">Add Listing</h1>
        <div className="border-2 border-dashed border-gray-300 rounded bg-gray-50 py-8 flex items-center justify-center mb-8">
          <h1>
            You can also{" "}
            <Link to="/login-and-register" className="text-[#ff9540]">
              Log In
            </Link>{" "}
            or{" "}
            <Link to="/login-and-register" className="text-[#ff9540]">
              Register
            </Link>{" "}
            first.
          </h1>
        </div>
      </div>

      {/* form start here  */}
      <div className="px-28 bg-gray-100 shadow p-6 ">
        <div className="flex items-center w-full mb-5 pl-5">
          <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
            General info
          </h2>
          <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
          <button className="text-gray-400 hover:text-gray-600">▼</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="w-full">
            <div className="mb-2 px-3">
              <h3 className="font-semibold">Listing Name*</h3>
            </div>
            <input
              type="text"
              name="listing"
              placeholder="Type here Listing Name"
              className="w-full py-4 border-gray-300 rounded px-6"
              value={listingName}
              onChange={(e) => setListingName(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-between items-center gap-10 mt-8">
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Make</h3>
              </div>
              <Select
                options={carMakes}
                value={make}
                onChange={setMake}
                required
                placeholder="Make"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>

            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Model</h3>
              </div>
              <Select
                options={carMakes}
                value={model}
                onChange={setModel}
                required
                placeholder="Select Make First"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Price (USD)</h3>
              </div>
              <input
                type="number"
                placeholder="$"
                className="w-full py-4 border-gray-300 rounded px-6 text-end"
                value={priceUSD}
                onChange={(e) => setPriceUSD(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="flex justify-between items-center gap-10 mt-8">
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Price (SYP)</h3>
              </div>
              <input
                type="number"
                placeholder="SYP"
                className="w-full py-4 border-gray-300 rounded px-6 text-end"
                value={priceSYP}
                onChange={(e) => setPriceSYP(e.target.value)}
                required
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Year</h3>
              </div>
              <input
                type="number"
                placeholder=""
                className="w-full py-4 border-gray-300 rounded px-6"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Kilometer</h3>
              </div>
              <input
                type="number"
                placeholder="km"
                className="w-full py-4 border-gray-300 rounded px-6 text-end"
                value={kilometer}
                onChange={(e) => setKilometer(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="flex justify-between items-center gap-10 mt-8">
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Engine Size (CC)</h3>
              </div>
              <Select
                options={carMakes}
                value={engineSize}
                onChange={setEngineSize}
                required
                placeholder="Engine Size (CC)"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Location</h3>
              </div>
              <Select
                options={carMakes}
                value={location}
                onChange={setLocation}
                required
                placeholder="Location"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Transmission</h3>
              </div>
              <Select
                options={carMakes}
                value={transmission}
                onChange={setTransmission}
                required
                placeholder="Transmission"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
          </div>
          <div className="flex justify-between items-center gap-10 mt-8">
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Fuel Type</h3>
              </div>
              <Select
                options={carMakes}
                value={fuelType}
                onChange={setFuelType}
                required
                placeholder="Fuel Type"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Exterior Color</h3>
              </div>
              <Select
                options={carMakes}
                value={exteriorColor}
                onChange={setExteriorColor}
                required
                placeholder="Exterior Color"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Interior Color</h3>
              </div>
              <Select
                options={carMakes}
                value={interiorColor}
                onChange={setInteriorColor}
                required
                placeholder="Interior Color"
                isSearchable
                className="cursor-pointer"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "0.65rem 1rem",
                  }),
                }}
                classNamePrefix="select"
              />
            </label>
          </div>

          {/* Other components */}
          <div className="mt-10">
            <FeaturesSection
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
            />
          </div>
          <div className="mt-10">
            <DescriptionEditor
              description={description}
              setDescription={setDescription}
              handleDescriptionChange={handleDescriptionChange}
            />
          </div>
          <div className="mt-10">
            <ImageUpload
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          </div>

          <div className="flex justify-end py-20">
            <button
              type="submit"
              className="bg-[#FF9540] text-[#314352] px-4 py-2 rounded-md  cursor-pointer"
            >
              Add Listing +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;
