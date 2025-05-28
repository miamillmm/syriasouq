import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";

const ImageUpload = ({ uploadedImages, setUploadedImages, isDisabled }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewFiles, setPreviewFiles] = useState([]); // State for temporary file previews
  const uploadAreaRef = useRef(null);
  const imageRefs = useRef([]); // Store refs for image elements

  // Cleanup temporary URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previewFiles.forEach((file) => URL.revokeObjectURL(file.id));
      // Only revoke URLs for new images, not server URLs
      uploadedImages.forEach((file) => {
        if (file.file) {
          URL.revokeObjectURL(file.id);
        }
      });
    };
  }, [previewFiles, uploadedImages]);

  // Handle file selection for preview
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files) {
      if (uploadedImages.length + files.length > 20) {
        setError("Maximum 10 images allowed. Remove some to add more.");
        uploadAreaRef.current?.focus();
        setPreviewFiles([]);
        return;
      }
      setError("");
      setIsUploading(true);
      // Create temporary previews
      const tempPreviews = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setPreviewFiles(tempPreviews);
      // Append new images to existing uploadedImages
      setUploadedImages((prev) => [...prev, ...tempPreviews]);
      setTimeout(() => {
        setIsUploading(false);
        setPreviewFiles([]); // Clear temporary previews after adding
      }, 500);
    }
  };

  // Handle drag-and-drop for file upload
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files) {
      if (uploadedImages.length + files.length > 10) {
        setError("Maximum 10 images allowed. Remove some to add more.");
        uploadAreaRef.current?.focus();
        setPreviewFiles([]);
        return;
      }
      setError("");
      setIsUploading(true);
      // Create temporary previews
      const tempPreviews = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setPreviewFiles(tempPreviews);
      // Append new images to existing uploadedImages
      setUploadedImages((prev) => [...prev, ...tempPreviews]);
      setTimeout(() => {
        setIsUploading(false);
        setPreviewFiles([]); // Clear temporary previews after adding
      }, 500);
    }
  };

  // Remove an image with confirmation
  const handleRemoveImage = (id) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      setUploadedImages((prev) => {
        const updated = prev.filter((image) => image.id !== id);
        // Revoke URL for removed image if it’s a new upload
        prev.forEach((image) => {
          if (image.id === id && image.file) {
            URL.revokeObjectURL(image.id);
          }
        });
        return updated;
      });
      setError("");
    }
  };

  // Handle drag start (mouse and touch)
  const handleDragStart = (index) => {
    setTimeout(() => setDraggedIndex(index), 0);
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
    setIsDragging(false);
  };

  // Touch state
  const [touchStart, setTouchStart] = useState(null);

  // Handle touch start
  const handleTouchStart = (e, index) => {
    setTouchStart({ index, x: e.touches[0].clientX, y: e.touches[0].clientY });
    handleDragStart(index);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling during drag
    if (touchStart) {
      setIsDragging(true);
    }
  };

  // Handle touch end
  const handleTouchEnd = (e) => {
    if (touchStart && draggedIndex !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      // Find the image under the touch end coordinates
      let targetIndex = null;
      for (let i = 0; i < imageRefs.current.length; i++) {
        const rect = imageRefs.current[i]?.getBoundingClientRect();
        if (
          rect &&
          touchEndX >= rect.left &&
          touchEndX <= rect.right &&
          touchEndY >= rect.top &&
          touchEndY <= rect.bottom
        ) {
          targetIndex = i;
          break;
        }
      }

      if (targetIndex !== null && targetIndex !== draggedIndex) {
        handleDropReorder(targetIndex);
      }
    }
    setTouchStart(null);
    setIsDragging(false);
  };

  // Handle keyboard reordering
  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowLeft" && index > 0) {
      const updatedImages = [...uploadedImages];
      [updatedImages[index], updatedImages[index - 1]] = [
        updatedImages[index - 1],
        updatedImages[index],
      ];
      setUploadedImages(updatedImages);
      imageRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < uploadedImages.length - 1) {
      const updatedImages = [...uploadedImages];
      [updatedImages[index], updatedImages[index + 1]] = [
        updatedImages[index + 1],
        updatedImages[index],
      ];
      setUploadedImages(updatedImages);
      imageRefs.current[index + 1]?.focus();
    } else if (event.key === "ArrowUp" && index >= 2) {
      // Move up (2 columns for mobile grid-cols-2)
      const updatedImages = [...uploadedImages];
      [updatedImages[index], updatedImages[index - 2]] = [
        updatedImages[index - 2],
        updatedImages[index],
      ];
      setUploadedImages(updatedImages);
      imageRefs.current[index - 2]?.focus();
    } else if (event.key === "ArrowDown" && index < uploadedImages.length - 2) {
      // Move down
      const updatedImages = [...uploadedImages];
      [updatedImages[index], updatedImages[index + 2]] = [
        updatedImages[index + 2],
        updatedImages[index],
      ];
      setUploadedImages(updatedImages);
      imageRefs.current[index + 2]?.focus();
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
          type="button"
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
        onDrop={isDisabled ? undefined : handleDrop}
        onDragOver={isDisabled ? undefined : handleDragOver}
        onDragLeave={isDisabled ? undefined : handleDragLeave}
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

        {uploadedImages.length === 0 && previewFiles.length === 0 ? (
          // Initial Interface (No images selected)
          <div
            className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => !isUploading && !isDisabled && document.getElementById("file-input").click()}
            role="button"
            aria-label="Upload images"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && !isUploading && !isDisabled && document.getElementById("file-input").click()}
            type="button"
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
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading || isDisabled}
              aria-hidden="true"
            />
          </div>
        ) : (
          // Image Preview Interface (or Temporary Preview during selection)
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* Image Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full lg:w-3/4">
              {(previewFiles.length > 0 ? [...uploadedImages, ...previewFiles] : uploadedImages).map((image, index) => (
                <div
                  key={image.id}
                  ref={(el) => (imageRefs.current[index] = el)}
                  className={`relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden shadow-md transition-all duration-200 animate-slide-auto ${
                    draggedIndex === index && previewFiles.length === 0
                      ? "scale-105 shadow-xl z-10"
                      : "hover:scale-102 hover:shadow-lg hover:border-2 hover:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 touch-none select-none`}
                  draggable={previewFiles.length === 0 && !isDisabled}
                  onDragStart={() => previewFiles.length === 0 && !isDisabled && handleDragStart(index)}
                  onDragOver={(e) => previewFiles.length === 0 && !isDisabled && e.preventDefault()}
                  onDrop={() => previewFiles.length === 0 && !isDisabled && handleDropReorder(index)}
                  onTouchStart={(e) => previewFiles.length === 0 && !isDisabled && handleTouchStart(e, index)}
                  onTouchMove={previewFiles.length === 0 && !isDisabled ? handleTouchMove : undefined}
                  onTouchEnd={(e) => previewFiles.length === 0 && !isDisabled && handleTouchEnd(e)}
                  role="img"
                  aria-label={`Image ${index + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => previewFiles.length === 0 && !isDisabled && handleKeyDown(e, index)}
                >
                  <img
                    src={image.id}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full h-full pointer-events-none"
                    loading="lazy"
                  />
                  {index !== 0 && (
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                      Image {index + 1}
                    </div>
                  )}
                  {previewFiles.length === 0 && (
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Remove image ${index + 1}`}
                      type="button"
                      title="Remove image"
                      disabled={isDisabled}
                    >
                      <AiOutlineClose className="w-4 h-4" />
                    </button>
                  )}
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                      {currentLanguage === "ar" ? "الصورة الرئيسية" : "Preview"}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Counter and Add More */}
            <div className="flex flex-col items-center sm:items-end gap-3 w-full lg:w-1/4">
              <p className="text-sm font-medium text-gray-600">
                {uploadedImages.length + previewFiles.length} / 20
              </p>
              <button
                className={`flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors text-base font-medium ${
                  isUploading || isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => !isUploading && !isDisabled && document.getElementById("file-input").click()}
                disabled={isUploading || isDisabled}
                type="button"
                aria-label="Add more images"
              >
                <AiOutlineCloudUpload className="mr-2 w-5 h-5" />
                <Translate text={"Add More Images"} />
              </button>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading || isDisabled}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;