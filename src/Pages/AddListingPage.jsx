import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import FeaturesSection from "./FeaturesSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { alllocation, makes, arabicMakes } from "../utils/utils";

// Import Google Fonts for Arabic and loader styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
  .loader {
   border: 4px solid #f3f3f3;
    border-top: 4px solid #B80200;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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

const allenginesize = [
  { value: "0-499 cc", label: "0-499 cc", arLabel: "0-499 سي سي" },
  { value: "500-999 cc", label: "500-999 cc", arLabel: "500-999 سي سي" },
  { value: "1000-1499 cc", label: "1000-1499 cc", arLabel: "1000-1499 سي سي" },
  { value: "1500-1999 cc", label: "1500-1999 cc", arLabel: "1500-1999 سي سي" },
  { value: "2000-2499 cc", label: "2000-2499 cc", arLabel: "2000-2499 سي سي" },
  { value: "2500-2999 cc", label: "2500-2999 cc", arLabel: "2500-2999 سي سي" },
  { value: "3000-3499 cc", label: "3000-3499 cc", arLabel: "3000-3499 سي سي" },
  { value: "3500-3999 cc", label: "3500-3999 cc", arLabel: "3500-3999 سي سي" },
  { value: "4000+ cc", label: "4000+ cc", arLabel: "4000+ سي سي" },
  { value: "Other", label: "Other", arLabel: "آخر" },
  { value: "Unknown", label: "Unknown", arLabel: "غير معروف" },
];

const allTransmission = [
  { value: "Automatic", label: "Automatic", arLabel: "اتوماتيك" },
  { value: "Manual", label: "Manual", arLabel: "يدوي" },
];

const allFuelType = [
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Petrol", label: "Petrol" },
];

const allExteriorColor = [
  { value: "Black", label: "Black", arLabel: "أسود" },
  { value: "Blue", label: "Blue", arLabel: "أزرق" },
  { value: "Brown", label: "Brown", arLabel: "بني" },
  { value: "Gold", label: "Gold", arLabel: "ذهبي" },
  { value: "Green", label: "Green", arLabel: "أخضر" },
  { value: "Red", label: "Red", arLabel: "أحمر" },
  { value: "Pink", label: "Pink", arLabel: "وردي" },
  { value: "Purple", label: "Purple", arLabel: "أرجواني" },
  { value: "Silver", label: "Silver", arLabel: "فضي" },
  { value: "White", label: "White", arLabel: "أبيض" },
  { value: "Other", label: "Other", arLabel: "آخر" },
];

const allInteriorColor = [
  { value: "Beige", label: "Beige" },
  { value: "Black", label: "Black" },
  { value: "Blue", label: "Blue" },
  { value: "Brown", label: "Brown" },
  { value: "Red", label: "Red" },
  { value: "White", label: "White" },
  { value: "Other", label: "Other" },
];

// Reusable ListingForm component
const ListingForm = ({
  currentLanguage,
  user,
  make,
  setMake,
  model,
  setModel,
  priceUSD,
  setPriceUSD,
  priceSYP,
  setPriceSYP,
  year,
  setYear,
  kilometer,
  setKilometer,
  engineSize,
  setEngineSize,
  location,
  setLocation,
  transmission,
  setTransmission,
  fuelType,
  setFuelType,
  exteriorColor,
  setExteriorColor,
  interiorColor,
  setInteriorColor,
  description,
  setDescription,
  selectedFeatures,
  setSelectedFeatures,
  uploadedImages,
  setUploadedImages,
  handleSubmit,
  isEditMode,
  isLoading,
}) => {
  const modelOptions =
    currentLanguage === "ar"
      ? make
        ? arabicMakes
            .find((m) => m.value === make.value)
            ?.models.map((model) => ({
              value: model,
              label: model,
            })) || []
        : []
      : make
      ? makes
          .find((m) => m.value === make.value)
          ?.models.map((model) => ({
            value: model,
            label: model,
          })) || []
      : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      <div className="flex items-center w-full mb-5 pl-5">
        <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
          <Translate text={"General info"} />
        </h2>
        <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
        <button
          className="text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          ▼
        </button>
      </div>

      <div className="flex justify-between items-center lg:flex-row flex-col gap-10">
        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "النوع" : "Make"}
            </h3>
          </div>
          <Select
            options={currentLanguage === "ar" ? arabicMakes : makes}
            value={make}
            onChange={setMake}
            required
            placeholder={
              currentLanguage === "ar" ? "حدد نوع السيارة" : "Select Make"
            }
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
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
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "الموديل" : "Model"}
            </h3>
          </div>
          <Select
            options={modelOptions}
            value={model}
            onChange={setModel}
            required
            placeholder={
              currentLanguage === "ar" ? "حدد النوع أولاً" : "Select Make First"
            }
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
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
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "السعر (دولار)" : "Price (USD)"}
            </h3>
          </div>
          <input
            type="number"
            placeholder={
              currentLanguage === "ar"
                ? "يرجى كتابة الأرقام باللغة الإنجليزية"
                : "$"
            }
            className="w-full py-4 border-gray-300 rounded px-6 text-right"
            value={priceUSD}
            onChange={(e) => setPriceUSD(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="flex justify-between items-center lg:flex-row flex-col gap-10">
        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              <Translate text={"Year"} />
            </h3>
          </div>
          <input
            type="number"
            placeholder={
              currentLanguage === "ar"
                ? "يرجى كتابة الأرقام باللغة الإنجليزية"
                : "yr"
            }
            className="w-full py-4 border-gray-300 rounded px-6 text-right"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>

        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              <Translate text={"Kilometer"} />
            </h3>
          </div>
          <input
            type="number"
            placeholder={
              currentLanguage === "ar"
                ? "يرجى كتابة الأرقام باللغة الإنجليزية"
                : "km"
            }
            className="w-full py-4 border-gray-300 rounded px-6 text-right"
            value={kilometer}
            onChange={(e) => setKilometer(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>

        <label className="w-full hidden">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              <Translate text={"Price (SYP)"} />
            </h3>
          </div>
          <input
            type="number"
            placeholder="SYP"
            className="w-full py-4 border-gray-300 rounded px-6 text-end"
            value={priceSYP}
            onChange={(e) => setPriceSYP(e.target.value)}
            required
            disabled={isLoading}
          />
        </label>
        <label className="w-full"></label>
      </div>

      <div className="flex justify-between items-center lg:flex-row flex-col gap-10">
        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "سعة المحرك" : "Engine Size (CC)"}
            </h3>
          </div>
          <Select
            options={allenginesize}
            value={engineSize}
            onChange={setEngineSize}
            required
            placeholder={
              currentLanguage === "ar" ? "سعة المحرك" : "Engine Size (CC)"
            }
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "0.65rem 1rem",
              }),
            }}
            classNamePrefix="select"
            getOptionLabel={(e) =>
              currentLanguage === "ar" ? e.arLabel : e.label
            }
          />
        </label>

        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "\u200Eالموقع" : "Location"}
            </h3>
          </div>
          <Select
            options={alllocation}
            value={location}
            onChange={setLocation}
            required
            placeholder={currentLanguage === "ar" ? "\u200Eالموقع" : "Location"}
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "0.65rem 1rem",
              }),
            }}
            classNamePrefix="select"
            getOptionLabel={(e) =>
              currentLanguage === "ar" ? e.arLabel : e.label
            }
          />
        </label>

        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "ناقل الحركة" : "Transmission"}
            </h3>
          </div>
          <Select
            options={allTransmission}
            value={transmission}
            onChange={setTransmission}
            required
            placeholder={
              currentLanguage === "ar" ? "ناقل الحركة" : "Transmission"
            }
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "0.65rem 1rem",
              }),
            }}
            classNamePrefix="select"
            getOptionLabel={(e) =>
              currentLanguage === "ar" ? e.arLabel : e.label
            }
          />
        </label>
      </div>

      <div className="flex justify-between items-center lg:flex-row flex-col gap-10">
        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              <Translate text={"Fuel Type"} />
            </h3>
          </div>
          <Select
            options={allFuelType}
            value={fuelType}
            onChange={setFuelType}
            required
            placeholder={<Translate text={"Fuel Type"} />}
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "0.65rem 1rem",
              }),
            }}
            classNamePrefix="select"
            getOptionLabel={(e) => <Translate text={e.label} />}
          />
        </label>

        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "اللون الخارجي" : "Exterior Color"}
            </h3>
          </div>
          <Select
            options={allExteriorColor}
            value={exteriorColor}
            onChange={setExteriorColor}
            required
            placeholder={
              currentLanguage === "ar" ? "اللون الخارجي" : "Exterior Color"
            }
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "0.65rem 1rem",
              }),
            }}
            classNamePrefix="select"
            getOptionLabel={(e) =>
              currentLanguage === "ar" ? e.arLabel : e.label
            }
          />
        </label>

        <label className="w-full">
          <div className="mb-2 px-3">
            <h3 className="font-semibold">
              {currentLanguage === "ar" ? "اللون الداخلي" : "Interior Color"}
            </h3>
          </div>
          <Select
            options={allInteriorColor}
            value={interiorColor}
            onChange={setInteriorColor}
            required
            placeholder={
              currentLanguage === "ar" ? "اللون الداخلي" : "Interior Color"
            }
            isSearchable
            className="cursor-pointer"
            isDisabled={isLoading}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "0.65rem 1rem",
              }),
            }}
            classNamePrefix="select"
            getOptionLabel={(e) => <Translate text={e.label} />}
          />
        </label>
      </div>

      <div className="mt-10">
        <FeaturesSection
          currentLanguage={currentLanguage}
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
          isDisabled={isLoading}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl mb-2 font-bold">
          {currentLanguage === "ar" ? "الوصف" : "Description"}
        </h2>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full bg-white outline-none rounded-lg p-2"
          rows={8}
          required
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="mt-10">
        <ImageUpload
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
          isDisabled={isLoading}
        />
      </div>

      <div className="flex justify-end py-10">
        <motion.button
          type="submit"
          className="bg-[#B80200] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <div >{currentLanguage === "ar"
              ? "تحديث الإعلان"
              : "loading"}</div>
          ) : (
            <>
              {isEditMode
                ? currentLanguage === "ar"
                  ? "تحديث الإعلان"
                  : "Update Listing"
                : currentLanguage === "ar"
                ? "نشر الإعلان"
                : "Add Listing"}{" "}
              +
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};

const AddListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get car ID from URL for edit mode
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(!!id); // Open modal if ID is present
  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

  // State variables for form fields
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [priceUSD, setPriceUSD] = useState("");
  const [priceSYP, setPriceSYP] = useState(1);
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

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fetch user data and car data (if in edit mode)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("SyriaSouq-auth"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      toast.warn(
        currentLanguage === "ar"
          ? "يرجى تسجيل الدخول قبل إضافة قائمة"
          : "Please log in before adding listing"
      );
      navigate("/login-and-register", { replace: true });
    }

    if (id) {
      // Fetch car data for editing
      const fetchCarData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/cars/${id}`,
            {
              headers: {
                Authorization: `Bearer ${storedUser?.jwt}`,
              },
            }
          );
          const car = response.data.data;
          console.log(car.features)
          setCarData(car);

          // Pre-fill form fields
          setMake(car.make ? { value: car.make, label: car.make } : null);
          setModel(car.model ? { value: car.model, label: car.model } : null);
          setPriceUSD(car.priceUSD || "");
          setPriceSYP(car.priceSYP || 1);
          setYear(car.year || "");
          setKilometer(car.kilometer || "");
          setEngineSize(
            car.engineSize
              ? allenginesize.find((e) => e.value === car.engineSize) || null
              : null
          );
          setLocation(
            car.location
              ? alllocation.find((l) => l.value === car.location) || null
              : null
          );
          setTransmission(
            car.transmission
              ? allTransmission.find((t) => t.value === car.transmission) || null
              : null
          );
          setFuelType(
            car.fuelType
              ? allFuelType.find((f) => f.value === car.fuelType) || null
              : null
          );
          setExteriorColor(
            car.exteriorColor
              ? allExteriorColor.find((c) => c.value === car.exteriorColor) ||
                null
              : null
          );
          setInteriorColor(
            car.interiorColor
              ? allInteriorColor.find((c) => c.value === car.interiorColor) ||
                null
              : null
          );
          setDescription(car.description || "");
          setSelectedFeatures(car.features || []);
          setUploadedImages(
            car.images
              ? car.images.map((img, index) => ({
                  file: null,
                  preview: `http://api.syriasouq.com/uploads/cars/${img}`,
                  id: index,
                }))
              : []
          );
        } catch (error) {
          console.error("Error fetching car data:", error);
          toast.error(
            currentLanguage === "ar"
              ? "فشل في جلب بيانات السيارة"
              : "Failed to fetch car data"
          );
          setIsEditModalOpen(false);
          navigate("/dashboard");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCarData();
    }
  }, [id, navigate, currentLanguage]);

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    formData.append("selectedFeatures", JSON.stringify(selectedFeatures));
    uploadedImages.forEach((image, index) => {
      if (image.file) {
        formData.append(`images`, image.file);
      }
    });

    // Validate required fields
    if (!make || !model || !priceUSD || !year || !kilometer || !description) {
      toast.error(
        currentLanguage === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill all required fields"
      );
      setIsLoading(false);
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error(
        currentLanguage === "ar"
          ? "يرجى رفع صورة واحدة على الأقل"
          : "Please upload at least one image"
      );
      setIsLoading(false);
      return;
    }

    try {
      const url = id
        ? `${import.meta.env.VITE_API_URL}/cars/${id}`
        : `${import.meta.env.VITE_API_URL}/cars`;
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          id
            ? currentLanguage === "ar"
              ? "تم تحديث الإعلان بنجاح!"
              : "Listing updated successfully!"
            : currentLanguage === "ar"
            ? "تمت إضافة الإعلان بنجاح! سينتهي هذا بعد 35 يومًا"
            : "Listing added successfully! This will expire after 35 days"
        );
        setIsEditModalOpen(false);
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Server Response:", result);
        toast.error(
          currentLanguage === "ar"
            ? `خطأ: ${result.message || "فشل في إرسال الإعلان"}`
            : `Error: ${result.message || "Failed to submit listing"}`
        );
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(
        currentLanguage === "ar"
          ? "فشل في إرسال الإعلان"
          : "Failed to submit listing"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-25" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
      <style>{styles}</style>
      {/* Login or Register Prompt */}
      <div className="px-28">
        <h1 className="text-[#314352] text-3xl font-bold py-10">
          <Translate text={id ? "Edit Listing" : "Add Listing"} />
        </h1>
        <div
          className={`border-2 border-dashed border-gray-300 rounded bg-gray-50 py-8 flex items-center justify-center mb-8 ${
            user ? "hidden" : ""
          }`}
        >
          <h1>
            <Translate text={"You can also"} />{" "}
            <Link to="/login-and-register" className="text-[#B80200]">
              <Translate text={"Log In"} />
            </Link>{" "}
            <Translate text={"or"} />{" "}
            <Link to="/login-and-register" className="text-[#B80200]">
              <Translate text={"Register"} />
            </Link>{" "}
            <Translate text={"first."} />
          </h1>
        </div>
      </div>

      {/* Main Add Listing Form (only shown if not in edit mode) */}
      {!isEditModalOpen && (
        <div className="lg:px-28 px-7 bg-gray-100 shadow p-6">
          <ListingForm
            currentLanguage={currentLanguage}
            user={user}
            make={make}
            setMake={setMake}
            model={model}
            setModel={setModel}
            priceUSD={priceUSD}
            setPriceUSD={setPriceUSD}
            priceSYP={priceSYP}
            setPriceSYP={setPriceSYP}
            year={year}
            setYear={setYear}
            kilometer={kilometer}
            setKilometer={setKilometer}
            engineSize={engineSize}
            setEngineSize={setEngineSize}
            location={location}
            setLocation={setLocation}
            transmission={transmission}
            setTransmission={setTransmission}
            fuelType={fuelType}
            setFuelType={setFuelType}
            exteriorColor={exteriorColor}
            setExteriorColor={setExteriorColor}
            interiorColor={interiorColor}
            setInteriorColor={setInteriorColor}
            description={description}
            setDescription={setDescription}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            handleSubmit={handleSubmit}
            isEditMode={false}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-100 p-6 rounded-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-50"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#314252]">
                <Translate text={"Edit Listing"} />
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  navigate("/dashboard");
                }}
                className="text-gray-600 hover:text-gray-800 text-2xl"
                disabled={isLoading}
              >
                ✕
              </button>
            </div>
            <ListingForm
              currentLanguage={currentLanguage}
              user={user}
              make={make}
              setMake={setMake}
              model={model}
              setModel={setModel}
              priceUSD={priceUSD}
              setPriceUSD={setPriceUSD}
              priceSYP={priceSYP}
              setPriceSYP={setPriceSYP}
              year={year}
              setYear={setYear}
              kilometer={kilometer}
              setKilometer={setKilometer}
              engineSize={engineSize}
              setEngineSize={setEngineSize}
              location={location}
              setLocation={setLocation}
              transmission={transmission}
              setTransmission={setTransmission}
              fuelType={fuelType}
              setFuelType={setFuelType}
              exteriorColor={exteriorColor}
              setExteriorColor={setExteriorColor}
              interiorColor={interiorColor}
              setInteriorColor={setInteriorColor}
              description={description}
              setDescription={setDescription}
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
              handleSubmit={handleSubmit}
              isEditMode={true}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AddListingPage;