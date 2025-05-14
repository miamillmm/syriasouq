import React, { useState, useRef } from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";

const ImageUploadPreview = ({ uploadedImages, setUploadedImages }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const uploadAreaRef = useRef(null);

  // Handle file upload
  const handleFileChange = async (event) => {
    if (uploadedImages?.length > 9) {
      setError("Maximum 10 images allowed. Remove some to add more.");
      uploadAreaRef.current?.focus();
      return;
    }
    setError("");
    setIsUploading(true);
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
    setTimeout(() => setIsUploading(false), 500);
  };

  // Handle drag-and-drop for file upload
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (uploadedImages?.length > 9) {
      setError("Maximum 10 images allowed. Remove some to add more.");
      uploadAreaRef.current?.focus();
      return;
    }
    setError("");
    setIsUploading(true);
    const files = event.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
    setTimeout(() => setIsUploading(false), 500);
  };

  // Remove an image with confirmation
  const handleRemoveImage = (id) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      setUploadedImages((prev) => prev.filter((image) => image.id !== id));
      setError("");
    }
  };

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle drop for reordering
  const handleDropReorder = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedImages = [...uploadedImages];
    const [draggedItem] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedItem);
    setUploadedImages(updatedImages);
    setDraggedIndex(null);
  };

  // Handle keyboard reordering
  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowLeft" && index > 0) {
      const updatedImages = [...uploadedImages];
      [updatedImages[index], updatedImages[index - 1]] = [updatedImages[index - 1], updatedImages[index]];
      setUploadedImages(updatedImages);
    } else if (event.key === "ArrowRight" && index < uploadedImages.length - 1) {
      const updatedImages = [...uploadedImages];
      [updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]];
      setUploadedImages(updatedImages);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center w-full mb-6 pl-6">
        <h2 className="text-3xl font-semibold text-gray-800 whitespace-nowrap tracking-tight">
          {currentLanguage === "ar" ? "الصور" : "Gallery"}*
        </h2>
        <div className="flex-1 border-t-2 border-gray-200 mx-4"></div>
        <button
          className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full"
          aria-label="Toggle gallery"
        >
          ▼
        </button>
      </div>

      {/* Upload Area */}
      <div
        ref={uploadAreaRef}
        className={`border-2 border-gray-200 rounded-xl p-6 w-full bg-white shadow-sm transition-all duration-300 ${
          isDragging ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400" : ""
        } ${error ? "animate-shake border-red-300" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="region"
        aria-label="Image upload area"
        tabIndex={0}
      >
        {/* Error Message */}
        {error && (
          <div
            className="text-red-600 text-sm font-medium mb-4 text-center bg-red-50 py-2 rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        {uploadedImages.length === 0 ? (
          // Initial Interface
          <div
            className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => !isUploading && document.getElementById("file-input").click()}
            role="button"
            aria-label="Upload images"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && document.getElementById("file-input").click()}
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
            ) : (
              <>
                <AiOutlineCloudUpload className="text-5xl text-gray-400" />
                <p className="text-gray-600 mt-3 text-lg font-medium text-center">
                  <span className="text-red-600 font-semibold">
                    <Translate text={"Choose images"} />
                  </span>{" "}
                  {currentLanguage === "ar" ? `أو اسحبها هنا` : `or drag them here`}
                </p>
              </>
            )}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              required
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
              aria-hidden="true"
            />
          </div>
        ) : (
          // Image Preview Interface
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* Image Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full lg:w-3/4">
              {uploadedImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden shadow-md transition-all duration-200 animate-slideIn ${
                    draggedIndex === index
                      ? "scale-105 shadow-xl"
                      : "hover:scale-102 hover:shadow-lg hover:border-2 hover:border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropReorder(index)}
                  role="img"
                  aria-label={`Uploaded image ${index + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <img
                    src={image.id}
                    alt={`Uploaded image ${index + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Remove image ${index + 1}`}
                    title="Remove image"
                  >
                    <AiOutlineClose className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                      <Translate text={"Preview"} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Counter and Add More */}
            <div className="flex flex-col items-end space-y-3 w-full lg:w-1/4">
              <p className="text-sm font-medium text-gray-500">
                {uploadedImages.length} / 10
              </p>
              <button
                className={`flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors text-lg font-medium ${
                  isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => !isUploading && document.getElementById("file-input").click()}
                disabled={isUploading}
                aria-label="Add more images"
              >
                <AiOutlineCloudUpload className="mr-2 w-6 h-6" />
                <Translate text={"Add More Images"} />
              </button>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPreview;