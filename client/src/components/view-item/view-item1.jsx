import React, { useState, useEffect, useDebugValue } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { createStructuredSelector } from "reselect";
import {
  selectItemByCategory,
  selectProductByCategory,
} from "../../redux/shop/shop.selector";

import { selectCartItems } from "../../redux/cart/cart.selector";
import { addItem } from "../../redux/cart/cart.action";

const imageLink = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  "https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  "https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg",
  "https://i.pinimg.com/474x/15/5a/e7/155ae7b761d570285f3630cd6c622ca2.jpg",
];
const ViewItem1 = ({ match, itemBycategory, cartItems, addItem }) => {
  const history = useHistory();
  console.log(history);
  console.log(match);
  console.log(itemBycategory["hats"]);
  // Object.keys(itemBycategory).filter((key) => itemBycategory[key]);
  let { id, name, imageUrl, price } = itemBycategory[
    match.params.category
  ].items.find((i) => i._id === match.params._id);
  debugger;
  imageLink[0] = imageUrl;
  const [number, setNumber] = useState(0);
  const [image, setImage] = useState(imageLink[number]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setImage(imageLink[number]);
    cartItems.map((item) => {
      if (item.name === name) {
        setQty(item.quantity);
      }
    });
  }, [number]);

  const handleChangeQty = (e) => {
    setQty(e.target.value);
    itemBycategory.quantity = e.target.value;
  };
  const handleImage = (value) => {
    setNumber(value);
  };
  const handleRightArrow = () => {
    if (number === 3) {
      setNumber(0);
    } else {
      setNumber(number + 1);
    }
  };
  const handleLeftArrow = () => {
    if (number === 0) {
      setNumber(3);
    } else {
      setNumber(number - 1);
    }
  };
  return (
    <section className="pt-12 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
      <div className="container px-4 mx-auto">
        <Link
          to="#"
          onClick={() => history.goBack()}
          className="flex text-md text-purple-500"
        >
          Back
        </Link>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <div className="flex -mx-4 flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center">
              <div className="w-full sm:w-auto min-w-max py-10 px-4 text-center flex sm:flex-col items-center justify-center">
                <a
                  className="h-30 block mb-4 mr-2 sm:mr-0"
                  onClick={() => handleImage(0)}
                  href="#"
                >
                  <img className="h-10 w-10" src={imageLink[0]} alt="" />
                </a>
                <a
                  className="hidden sm:block h-30 mb-4 mr-2 sm:mr-0"
                  onClick={() => handleImage(1)}
                  href="#"
                >
                  <img className="h-10 w-10" src={imageLink[1]} alt="" />
                </a>
                <a
                  className="hidden sm:block h-30 mb-4 mr-2 sm:mr-0 rounded-xl border-2 border-blueGray-500"
                  onClick={() => handleImage(2)}
                  href="#"
                >
                  <img className="h-10 w-10" src={imageLink[2]} alt="" />
                </a>
                <a
                  className="h-30 block mb-4 sm:mb-12 mr-4 sm:mr-0"
                  onClick={() => handleImage(3)}
                  href="#"
                >
                  <img className="h-10 w-10" src={imageLink[3]} alt="" />
                </a>
              </div>
              <div className="relative w-full sm:w-9/12 px-10">
                <div className="absolute right-0 top-1/2">
                  <button
                    onClick={() => handleRightArrow()}
                    className="bold text-xl text-purple-600"
                  >
                    <HiChevronRight />
                  </button>
                </div>
                <div className="absolute left-0 top-1/2">
                  <button
                    onClick={() => handleLeftArrow()}
                    className="bold text-xl text-purple-600"
                  >
                    <HiChevronLeft />
                  </button>
                </div>
                <img className="mb-5" src={image} alt="" />
                <p className="text-sm text-gray-300">
                  Roll over image to zoom in
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="max-w-md mb-6">
              <span className="flex text-xs text-gray-400 tracking-wider">
                #00000{id}
              </span>
              <h2 className="flex justify-start mt-6 mb-4 text-5xl md:text-3xl sm:md lg:text-5xl font-heading font-medium">
                {name}
              </h2>
              <p className="flex items-center mb-6">
                <span className="mr-2 text-sm text-blue-500 font-medium">
                  Rs
                </span>
                <span className="text-3xl text-blue-500 font-medium">
                  {price}
                </span>
              </p>
              <p className="text-lg text-gray-400">
                The nulla commodo, commodo eros a lor, tristique lectus. Lorem
                sad 128 GB silver.
              </p>
            </div>
            <div className="flex mb-6 items-center">
              <div className="inline-flex mr-4">
                <button className="mr-1">
                  <svg
                    width="20"
                    height="20"
                    viewbox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    ></path>
                  </svg>
                </button>
                <button className="mr-1">
                  <svg
                    width="20"
                    height="20"
                    viewbox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    ></path>
                  </svg>
                </button>
                <button className="mr-1">
                  <svg
                    width="20"
                    height="20"
                    viewbox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    ></path>
                  </svg>
                </button>
                <button className="mr-1">
                  <svg
                    width="20"
                    height="20"
                    viewbox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg
                    width="20"
                    height="20"
                    viewbox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    ></path>
                  </svg>
                </button>
              </div>
              <span className="text-md text-gray-400">4.59</span>
            </div>
            <div className="mb-6">
              <h4 className="flex mb-3 font-heading font-medium">
                <span>Color&nbsp;:&nbsp;&nbsp;</span>
                <span className="text-gray-400">Silver</span>
              </h4>
              <div className="flex">
                <button className="inline-flex items-center justify-center p-1 rounded-full border border-gray-300">
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </button>
                <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
                  <div className="w-6 h-6 rounded-full bg-purple-800"></div>
                </button>
                <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
                  <div className="w-6 h-6 rounded-full bg-blue-900"></div>
                </button>
                <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
                  <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                </button>
              </div>
            </div>
            <div className="mb-10">
              <h4 className="flex mb-3 font-heading font-medium">Qty:</h4>
              <input
                onChange={(e) => handleChangeQty(e)}
                className="flex w-20 px-2 py-1 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                type="text"
                placeholder={qty}
              />
            </div>
            <div className="flex flex-wrap -mx-2 mb-12">
              <div className="w-1/2 md:w-1/3 px-2 mb-2 md:mb-0">
                <button
                  onClick={() => addItem(itemBycategory)}
                  className="block py-2 px-3 font-sans leading-8 font-heading font-medium text-md text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-full"
                  href="#"
                >
                  Add To Bag
                </button>
              </div>
              <div className="w-full md:w-1/4 py-2">
                <button className="flex w-full items-center font-sans justify-center leading-8 text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl">
                  <span className="mr-2">Wishlist</span>
                  <svg
                    width="23"
                    height="22"
                    viewbox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h4 className="mb-6 font-heading font-medium">
                More information
              </h4>
              <button className="flex w-1/2 pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                <h3 className="text-lg font-heading font-medium">
                  Shipping &amp; returns
                </h3>
                <span>
                  <svg
                    width="12"
                    height="8"
                    viewbox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                      fill="black"
                    ></path>
                  </svg>
                </span>
              </button>
              <button className="flex w-1/2 pl-6 lg:pl-12 pr-6 py-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                <h3 className="text-lg font-heading font-medium">
                  Product details
                </h3>
                <span>
                  <svg
                    width="12"
                    height="8"
                    viewbox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                      fill="black"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    itemBycategory: selectProductByCategory(
      ownProps.match.params.category,
      ownProps.match.params._id
    ),
    cartItems: selectCartItems,
  });
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewItem1);
