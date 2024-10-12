import React from "react";

const Article = () => {
  return (
    <div>
      <p>It is m article.</p>
      {/* <image src="https://i.ibb.co/0s3pdnc/adidas-nmd.png" alt="shoe" /> */}
      <div
        class="w-1/2 h-72"
        style={{
          backgroundImage: `url(https://i.ibb.co/0s3pdnc/adidas-nmd.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div class="w-full h-8 flex justify-between">
        <span class="text-lg text-purple-600 bold">test</span>
        <span class="text-lg text-purple-600 bold">1233</span>
      </div>
      <div
        className="absolute bottom-10 left-2 h-8 w-8 flex items-center  justify-center text-xl hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
        // onClick={() => addFavourite(id)}
      >
        {/* {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />} */}
      </div>
      <div className="absolute bottom-9 left-8 h-10 w-16 ml-2 hover:bg-blue-600 flex items-center justify-center font-medium text-blue-600 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
        {/* <BsChatSquareFill /> */}
        <span className="text-white bold ml-1 group-hover:text-white">
          {/* {likes} */}
          48
        </span>
      </div>
      <div
        className="absolute bottom-9 right-2 h-10 text-xl text-red-500 w-16 ml-2 hover:bg-green-600 flex items-center justify-center font-medium text-green-600 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
        // onClick={() => {
        //   setVisible(true);
        //   addItem(item);
        // }}
      >
        {/* <BsHandbagFill /> */}
      </div>
    </div>
  );
};
export default Article;
