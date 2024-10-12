import React, { useState, useEffect } from "react";
import ImageUpload from "./multi-image-url-input";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import MultipleSelect from "./multi-select";
import ColorImageUpload from "./color-image-url";
import {
  createProductAction,
  createProductIntoDB,
} from "../../redux/products/product.action";

function ProductForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [brandTitle, setBrandTitle] = useState("");
  const [image, setImage] = useState("");
  const [imagesUrl, setImagesUrl] = useState([]);
  const [colorImagesUrl, setColorImagesUrl] = useState([]);
  const [isImages, setIsImages] = useState(false);
  const [isImagesAndColors, setIsImagesAndColors] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorData, setColorData] = useState([
    // {
    //   color: "",
    //   colorImages: [],
    // },
  ]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  useEffect(() => {
    setIsImages(true);
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  console.log(isImages, isImagesAndColors);
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, brandTitle, `Brand Image ${image}`, imagesUrl);

    console.log(colorData);
    let formObj = {
      name,
      brandTitle,
      image: image,
      brandImagesUrl: imagesUrl,
      colorsWithImages: colorData,
    };
    // Process form data and color images here
    // dispatch(createProductAction(formObj));
    dispatch(createProductIntoDB(formObj));
  };

  // Options for colors
  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    // Add more color options as needed
  ];

  const handleColorChange = (selectedOptions) => {
    setIsImagesAndColors(true);
    setIsImages(false);
    selectedOptions?.map((s) => {
      if (!selectedColors?.includes(s)) {
        setSelectedColors([...selectedColors, s]);
      }
    });
  };
  const handleColorandImages = (values, color) => {
    if (colorData) {
      let findColorData = colorData.find((c) => c.color === color);
      if (findColorData) {
        values.forEach((v) => {
          findColorData.colorImages.push(v);
        });

        // No need to update the entire colorData array, just update the state
        setColorData([...colorData]);
      } else {
        // If color is not found, create a new object and add it to colorData
        let newObj = {
          color: color,
          colorImages: values, // Store values as an array
        };
        setColorData([...colorData, newObj]);
      }
    } else {
      // If colorData is empty, create a new object with the provided values
      let newObj = {
        color: color,
        colorImages: values, // Store values as an array
      };
      setColorData([newObj]);
    }
  };

  const handleRemove = (index) => {
    const updatedImages = [...imagesUrl];
    updatedImages.splice(index, 1);
    setImagesUrl(updatedImages);
    setIsImages(true);
    setIsImagesAndColors(false);
  };

  const handleBrandImage = (e) => {
    debugger;
    let imgSource;
    var files = Array.from(e.target.files);
    files.forEach((file) => {
      // Simulate uploading by generating a URL for each selected file
      imgSource = URL.createObjectURL(file);
    });
    // let imageSource = URL.createObjectURL(file);
    setImage(imgSource);
  };

  return (
    <div className="px-5 my-5 w-full">
      <div className="text-lg text-center text-purple-700 font-bold">
        Create New Product
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            className="w-1/2 border rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Brand Title
          </label>
          <input
            type="text"
            className="w-1/2 border rounded-md p-2"
            value={brandTitle}
            onChange={(e) => setBrandTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          {/* <input
            type="file"
            className="w-1/2 border rounded-md p-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          /> */}
          <input
            type="file"
            onChange={handleBrandImage}
            class="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
          />
          {image && (
            <span class="shrink-0">
              <img
                class="h-16 w-16 object-cover"
                src={image}
                alt="Current profile photo"
              />
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Images</label>
          {/* Input for multiple images */}
          {/* Other form fields... */}
          {isImages && (
            <ImageUpload
              customKey={1}
              handleMultipleImages={(values) => {
                setImagesUrl([...imagesUrl, ...values]);
              }}
            />
          )}

          <div className="flex flex-wrap -m-2">
            {imagesUrl.map((imageUrl, index) => (
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
          {/* Other form elements... */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Colors</label>
          <MultipleSelect
            colors={colorOptions}
            handleSelectedColors={handleColorChange}
          />
        </div>
        {/* Input fields for images against selected colors */}
        {selectedColors.map((color) => (
          <div key={color.value} className="mb-4 flex">
            <label className="block text-gray-700 font-bold mb-2 mx-3">
              {color.toUpperCase()}
            </label>
            {/* <input
              type="text"
              className="w-1/2 border rounded-md p-2"
              value={colorImages[color.value] || ""}
              onChange={(e) => {
                setColorImages((prevImages) => ({
                  ...prevImages,
                  [color.value]: e.target.value,
                }));
              }}
            /> */}
            {setIsImagesAndColors && (
              <ColorImageUpload
                // className="w-1/2 p-2"
                // customKey={2}
                color={color}
                handleMultipleColorImages={(values, color) =>
                  handleColorandImages(values, color)
                }
              />
            )}
            {/* <div className="flex flex-wrap -m-2">
              {colorImagesUrl.map((imageUrl, index) => (
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
        ))}

        {/* User a component or add logic to manage image URLs for each color */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
