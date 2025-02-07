import { useEffect, useState } from "react";
import Select from "react-select";
import FeaturesSection from "./FeaturesSection";
// import DescriptionEditor from "./DescriptionEditor";
import ImageUpload from "./ImageUpload";
import { Link, useNavigate } from "react-router";
import { makes } from "../utils/utils";

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
const alllocation = [
  { value: "Al-Hasakah", label: "Al-Hasakah" },
  { value: "Aleppo", label: "Aleppo" },
  { value: "Damascus", label: "Damascus" },
  { value: "Daraa", label: "Daraa" },
  { value: "Deir ez-Zor", label: "Deir ez-Zor" },
  { value: "Hama", label: "Hama" },
  { value: "Homs", label: "Homs" },
  { value: "Idlib", label: "Idlib" },
  { value: "Latakia", label: "Latakia" },
  { value: "Qamishli", label: "Qamishli" },
  { value: "Raqqa", label: "Raqqa" },
  { value: "Rif Dimashq", label: "Rif Dimashq" },
  { value: "Suweida", label: "Suweida" },
  { value: "Tartus", label: "Tartus" },
];

const allenginesize = [
  { value: "0-499 cc", label: "0-499 cc" },
  { value: "1000-1499 cc", label: "1000-1499 cc" },
  { value: "1500-1999 cc", label: "1500-1999 cc" },
  { value: "2000-2499 cc", label: "2000-2499 cc" },
  { value: "2500-2999 cc", label: "2500-2999 cc" },
  { value: "3000-3499 cc", label: "3000-3499 cc" },
  { value: "3500-3999 cc", label: "3500-3999 cc" },
  { value: "4000+ cc", label: "4000+ cc" },
  { value: "500-999 cc", label: "500-999 cc" },
  { value: "Other", label: "Other" },
  { value: "Unknown", label: "Unknown" },
];

const allTransmission = [
  { value: "Automatic", label: "Automatic" },
  { value: "Manual", label: "Manual" },
];

const allFuelType = [
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Petrol", label: "Petrol" },
];

const allExteriorColor = [
  { value: "BLACK", label: "BLACK" },
  { value: "Blue", label: "Blue" },
  { value: "Brown", label: "Brown" },
  { value: "Gold", label: "Gold" },
  { value: "Green", label: "Green" },
  { value: "Orange", label: "Orange" },
  { value: "Pink", label: "Pink" },
  { value: "Purple", label: "Purple" },
  { value: "Red", label: "Red" },
  { value: "Silver", label: "Silver" },
  { value: "White", label: "White" },
  { value: "Yellow", label: "Yellow" },
  { value: "other", label: "other" },
];

const allInteriorColor = [
  { value: "Beige", label: "Beige" },
  { value: "Black", label: "Black" },
  { value: "Blue", label: "Blue" },
  { value: "Brown", label: "Brown" },
  { value: "Red", label: "Red" },
  { value: "White", label: "White" },
];

const AddListingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // State variables for each input/select field
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

  const modelOptions = make
    ? makes
        .find((m) => m.value === make.value)
        ?.models.map((model) => ({
          value: model,
          label: model,
        })) || []
    : [];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
    console.log(storedUser);
    if (storedUser) {
      return setUser(storedUser);
    }
    alert("Please loggin beofre add listing");
    return navigate("/login-and-register");
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle image uploads
    const formData = new FormData();

    formData.append("make", make?.value || "");
    formData.append("model", model?.value || "");
    formData.append("priceUSD", priceUSD);
    formData.append("priceSYP", priceSYP);
    formData.append("year", year);
    formData.append("kilometer", kilometer);
    formData.append("engineSize", engineSize?.value || "");
    formData.append("location", location?.value || "");
    formData.append("transmission", transmission?.value || "");
    formData.append("fuelType", fuelType?.value || "");
    formData.append("exteriorColor", exteriorColor?.value || "");
    formData.append("interiorColor", interiorColor?.value || "");
    formData.append("description", description);

    // Append selected features as JSON string
    formData.append("selectedFeatures", JSON.stringify(selectedFeatures));

    // Append uploaded images
    uploadedImages.forEach((image, index) => {
      formData.append(`images`, image.file);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.jwt}`, // Ensure `user.jwt` exists
        },
        body: formData, // Let the browser set Content-Type automatically
      });

      const result = await response.json();

      if (response.ok) {
        alert("Listing added successfully! This will expire after 35 days");
        navigate("/dashboard");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("Failed to submit listing.");
    }
  };

  // const handleDescriptionChange = (value) => {
  //   setDescription(value);
  // };

  return (
    <div className="pt-25">
      {/* login or register first */}
      <div className="px-28">
        <h1 className="text-[#314352] text-3xl font-bold py-10">Add Listing</h1>
        <div
          className={`border-2 border-dashed border-gray-300 rounded bg-gray-50 py-8 flex items-center justify-center mb-8 ${
            user ? "hidden" : ""
          }`}
        >
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
          <div className="flex justify-between items-center gap-10 mt-8">
            <label className="w-full">
              <div className="mb-2 px-3">
                <h3 className="font-semibold">Make</h3>
              </div>
              <Select
                options={makes} // Directly use the makes array
                value={make}
                onChange={setMake}
                placeholder="Select Make"
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
                options={modelOptions}
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
                <h3 className="font-semibold text-orange-400">
                  Engine Size (CC) <span className="text-xs">(Optional)</span>
                </h3>
              </div>
              <Select
                options={allenginesize}
                value={engineSize}
                onChange={setEngineSize}
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
                <h3 className="font-semibold text-orange-400">
                  Location <span className="text-xs">(Optional)</span>
                </h3>
              </div>
              <Select
                options={alllocation}
                value={location}
                onChange={setLocation}
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
                <h3 className="font-semibold text-orange-400">
                  Transmission <span className="text-xs">(Optional)</span>{" "}
                </h3>
              </div>
              <Select
                options={allTransmission}
                value={transmission}
                onChange={setTransmission}
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
                <h3 className="font-semibold text-orange-400">
                  Fuel Type <span className="text-xs">(Optional)</span>
                </h3>
              </div>
              <Select
                options={allFuelType}
                value={fuelType}
                onChange={setFuelType}
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
                <h3 className="font-semibold text-orange-400">
                  Exterior Color <span className="text-xs">(Optional)</span>
                </h3>
              </div>
              <Select
                options={allExteriorColor}
                value={exteriorColor}
                onChange={setExteriorColor}
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
                <h3 className="font-semibold text-orange-400">
                  Interior Color <span className="text-xs">(Optional)</span>
                </h3>
              </div>
              <Select
                options={allInteriorColor}
                value={interiorColor}
                onChange={setInteriorColor}
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
            <h2 className="text-xl mb-2 font-bold">Description</h2>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white outline-none rounded-lg p-2"
              rows={8}
            ></textarea>
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
