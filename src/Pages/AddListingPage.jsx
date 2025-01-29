import React, { useState } from "react";
import Select from "react-select";
import FeaturesSection from "./FeaturesSection";
import DescriptionEditor from "./DescriptionEditor";
import ImageUpload from "./ImageUpload";
import { NavLink } from "react-router";

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
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="pt-25">
      {/* login or register first */}
      <div className="px-28">
        <h1 className="text-[#314352] text-3xl font-bold py-10">Add Listing</h1>
        <div className="border-2 border-dashed border-gray-300 rounded bg-gray-50 py-8 flex items-center justify-center mb-8">
          <h1>
            You can also <span className="text-[#ff9540]">Log In</span> or{" "}
            <span className="text-[#ff9540]">Register</span> first.
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
        <form action="">
          <label className="w-full">
            <div className="mb-2 px-3">
              <h3 className="font-semibold">Listing Name*</h3>
            </div>
            <input
              type="text"
              placeholder="Type here Listing Name"
              className="w-full py-4 border-gray-300 rounded px-6"
            />
          </label>
          <div className="flex justify-between items-center gap-10 mt-8">
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Make</h3>
              </div>
              <Select
                options={carMakes}
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
                value={selectedOption}
                onChange={setSelectedOption}
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
          <div className="mt-10">
            <FeaturesSection />
          </div>
          <div className="mt-10">
            <DescriptionEditor />
          </div>
          <div className="mt-10">
            <ImageUpload />
          </div>

          <div className="flex justify-end py-20">
            <NavLink>
              <button
                type
                className="bg-[#FF9540] text-[#314352] px-4 py-2 rounded-md  cursor-pointer"
              >
                <input type="submit" value="Add Listing +" />
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;
