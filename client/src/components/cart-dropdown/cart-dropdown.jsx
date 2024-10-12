import React from "react";
import CartItem from "../cart-item/cart-item";
import CustomButton from "../custom-button/cutom-button";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { UserRemoveIcon } from "@heroicons/react/solid";
import {
  selectCartHidden,
  selectCartItems,
} from "../../redux/cart/cart.selector";
import { withRouter } from "react-router-dom";
import { cartHidden } from "../../redux/cart/cart.action";
import { useState } from "react";

//we have disptach method in props therefore i pass dispatch here
const CartDropdown = ({ cartItems, history, isCartHidden }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleShowStatus = () => {
    dispatch(cartHidden());
    setTimeout(() => {
      setShow(true);
    }, 1000);
  };
  return (
    <div
      // className={`right-0 fixed h-full bg-gray-300 rounded-b border-t-0 z-40 ease-in-out duration-400 ${
      className={`top-0 right-0 w-[35vw] bg-white px-5 py-10 text-white fixed h-full z-40 ease-in-out duration-400 ${
        isCartHidden ? `hidden translate-x-0` : `block translate-x-full`
      }`}
      onMouseLeave={handleShowStatus}
    >
      <div className="text-lg text-purple-600 bold">Your Cart</div>
      <div className="h-80 mt-2 overflow-y-auto text-center">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <h3 className="text-lg text-purple-600 bold">Your Cart is Empty.</h3>
        )}
      </div>
      <div className="p-4 justify-center flex">
        <CustomButton
          className="text-black hover:scale-110 focus:outline-none flex justify-center align-items-end
          px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-teal-700 hover:text-teal-100
        bg-teal-100
        text-teal-700
        border border-black duration-200 ease-in-out
        border-teal-600 transition"
          onClick={() => {
            history.push("/checkout");
            dispatch(cartHidden());
          }}
        >
          Go To Checkout
        </CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  isCartHidden: selectCartHidden,
});
export default withRouter(connect(mapStateToProps, null)(CartDropdown));
