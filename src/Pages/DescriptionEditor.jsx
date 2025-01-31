import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const DescriptionEditor = ({
  description,
  setDescription,
  handleDescriptionChange,
}) => {
  return (
    <div className="p-6 w-full">
      <div className="flex items-center w-full mb-5 pl-5">
        <h2 className="text-2xl font-bold text-[#314252] whitespace-nowrap">
          Description *
        </h2>
        <div className="flex-1 border-t border-gray-300 border-dashed mx-2"></div>
        <button className="text-gray-400 hover:text-gray-600">▼</button>
      </div>
      <ReactQuill
        id="description"
        theme="snow"
        value={description}
        onChange={handleDescriptionChange}
        className="bg-white"
        placeholder="Write your description here..."
        style={{ height: "300px" }}
      />
    </div>
  );
};

export default DescriptionEditor;
