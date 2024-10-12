import React, { useState } from "react";

function ImageUpload({ handleMultipleImages, customKey }) {
  console.log(customKey);
  // const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    const files = Array.from(e.target.files);

    setSelectedFiles(files);

    const uploadedImages = [];
    let updatePics = [];
    if (files.length > 0) {
      files.forEach((file) => {
        // Simulate uploading by generating a URL for each selected file
        const imageURL = URL.createObjectURL(file);
        uploadedImages.push(imageURL);
      });
      // setImages([...images, ...uploadedImages]);
      updatePics = [...uploadedImages];
    }
    console.log(updatePics);
    handleMultipleImages(updatePics);
  };

  const handleRemove = (index) => {
    // const updatedImages = [...images];
    // updatedImages.splice(index, 1);
    // setImages(updatedImages);
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
    // setImages([...images, ...uploadedImages]);
    setSelectedFiles([]);
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
        {selectedFiles.length > 0 && (
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
        {/* <div className="flex flex-wrap -m-2">
          {images.map((imageUrl, index) => (
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
        </div> */}
      </div>
    </div>
  );
}

export default ImageUpload;
