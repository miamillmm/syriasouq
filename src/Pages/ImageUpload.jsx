import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ImageUpload = ({ uploadedImages, setUploadedImages }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected Files:", files.map(f => ({ name: f.name, size: f.size })));
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const maxFiles = 20; // Support 20 images

    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize) {
        toast.error(
          currentLanguage === "ar"
            ? `الملف ${file.name} كبير جدًا (الحد الأقصى 5 ميجابايت)`
            : `File ${file.name} is too large (max 5MB)`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length + uploadedImages.length > maxFiles) {
      toast.error(
        currentLanguage === "ar"
          ? `الحد الأقصى ${maxFiles} صور`
          : `Maximum ${maxFiles} images allowed`
      );
      return;
    }

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="mt-4">
      <label className="block mb-2 font-semibold text-sm sm:text-base">
        {currentLanguage === "ar" ? "رفع الصور" : "Upload Images"}
      </label>
      <label className="w-full p-4 sm:p-5 border rounded h-14 sm:h-16 text-lg sm:text-xl flex items-center cursor-pointer bg-white">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          name="images"
        />
        <span className="text-gray-500">
          {currentLanguage === "ar"
            ? "يرجى الضغط لإرفاق الصور"
            : "No file chosen, choose files"}
        </span>
      </label>
      <p className="text-xs text-gray-500 mt-1">
        {currentLanguage === "ar"
          ? "الحد الأقصى 20 صور، 5 ميجابايت لكل صورة"
          : "Max 20 images, 5MB each"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {uploadedImages.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.preview}
              alt={`Preview ${index}`}
              className="w-full h-24 object-cover rounded"
            />
            <button
              onClick={() =>
                setUploadedImages((prev) => prev.filter((_, i) => i !== index))
              }
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;