import React from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import Translate from "../utils/Translate";

const ImageUploadPreview = ({ uploadedImages, setUploadedImages }) => {
  // Handle file upload
  const handleFileChange = (event) => {
    if (uploadedImages?.length > 9)
      return alert("You can upload maximum 10 images");
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    if (uploadedImages?.length > 9)
      return alert("You can upload maximum 10 images");
    const files = event.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  // Remove an image
  const handleRemoveImage = (id) => {
    setUploadedImages((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <div>
      <div className="flex items-center w-full mb-5 pl-5">
        <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
          <Translate text={"Galary"} /> *
        </h2>
        <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
        <button className="text-gray-400 hover:text-gray-600">▼</button>
      </div>

      <div
        className="border border-gray-300 rounded-lg p-4 w-full"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {uploadedImages.length === 0 ? (
          // Initial Interface
          <div
            className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
            onClick={() => document.getElementById("file-input").click()}
          >
            <AiOutlineCloudUpload className="text-4xl text-gray-400" />
            <p className="text-gray-600">
              <span className="text-[#B80200]">
                <Translate text={"Choose images"} />
              </span>{" "}
              <Translate text={"or drag it here"} />
            </p>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              required
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          // Image Preview Interface
          <div className="flex items-center lg:flex-row flex-col justify-between">
            {/* Left - Image Preview */}
            <div className="flex lg:flex-row flex-col space-x-2 w-3/4 overflow-x-auto">
              {uploadedImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative w-28 h-28 bg-gray-100 rounded-md overflow-hidden shadow"
                >
                  <img
                    src={image.id}
                    alt={`Uploaded ${index}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-1 right-1 bg-[#B80200] text-white rounded-full p-1"
                  >
                    <AiOutlineClose className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right - Counter and Add More */}
            <div className="flex flex-col items-end space-y-2 w-1/4">
              <p className="text-sm text-gray-500">
                {uploadedImages.length} / 20
              </p>
              <div className="flex items-center">
                <button
                  className="flex items-center text-blue-600 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission or reload
                    document.getElementById("file-input").click();
                  }}
                >
                  <AiOutlineCloudUpload className="mr-1" />
                  <Translate text={"Add More Images"} />
                </button>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPreview;
