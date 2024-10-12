import React, { useState } from "react";

function ImageColorUpload({ handleMultipleImages }) {
  const [imagescolors, setImagescolors] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const uploadedImages = [];
    if (files.length > 0) {
      files.forEach((file) => {
        // Simulate uploading by generating a URL for each selected file
        const imageURL = URL.createObjectURL(file);
        uploadedImages.push(imageURL);
      });
      setImagescolors([...imagescolors, ...uploadedImages]);
      let updatePics = [...imagescolors, ...uploadedImages];
      handleMultipleImages(updatePics);
    }
  };

  const handleUpload = () => {
    // Process the selected files, e.g., upload them to a server
    // You can use a library like axios for file uploads
    // After uploading, you can store the image URLs in the 'images' state
    const uploadedImages = [];
    selectedFiles.forEach((file) => {
      // Simulate uploading by generating a URL for each selected file
      const imageURL = URL.createObjectURL(file);
      uploadedImages.push(imageURL);
    });
    setImagescolors([...imagescolors, ...uploadedImages]);
    setSelectedFiles([]);
  };

  const handleRemove = (index) => {
    const updatedImages = [...imagescolors];
    updatedImages.splice(index, 1);
    setImagescolors(updatedImages);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id="image-upload-input"
          onChange={handleFileChange}
        />
        <label
          htmlFor="image-upload-input"
          className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Select Images
        </label>
      </div>
      <div className="flex flex-wrap -m-2">
        {imagescolors.map((imageUrl, index) => (
          <div key={index} className="m-2 relative">
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              className="w-32 h-32 object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageColorUpload;
