import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsChatSquareFill } from "react-icons/bs";
import { BsHandbagFill } from "react-icons/bs";
import { addFavouriteItem } from "../../redux/favourite/favourite.action";
import { selectFavouriteItem } from "../../redux/favourite/favourite.selector";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import LazyLoad from "react-lazy-load";
const CollectionItem = ({
  item,
  addItem,
  category,
  addFavourite,
  wishlist,
}) => {
  let { name, price, imageUrl, id, _id } = item;
  const [isFavourite, setIsFavourite] = useState(false);
  const [isVisible, setVisible] = useState(false);
  console.log(category);
  useEffect(() => {
    let wishlistItems = wishlist.favouriteItems;
    if (wishlistItems.length > 0) {
      wishlist.favouriteItems.find((item) =>
        item === id ? setIsFavourite(true) : null
      );
    }
  }, [wishlist.favouriteItems.length]);

  return (
    <div>
      {isVisible && <CartDropdown />}
      <div class="group relative" id="container">
        <div class="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <Link to={`/view-item1/${category}/${_id}`}>
            <LazyLoad>
              <div
                class="w-full h-72"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </LazyLoad>
          </Link>
          {/* <div class='invisible group-hover:visible absolute w-full h-1/18 top-60  py-2 bg-gray-400 text-white text-center'
             >
                <CustomButton onClick={()=>addItem(item)}>Add To Cart</CustomButton>
            </div> */}
          <div
            className="absolute bottom-10 left-2 h-8 w-8 flex items-center  justify-center text-xl hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={() => addFavourite(id)}
          >
            {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
          <div className="absolute bottom-9 left-8 h-10 w-16 ml-2 hover:bg-blue-600 flex items-center justify-center font-medium text-blue-600 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <BsChatSquareFill />
            <span className="text-white bold ml-1 group-hover:text-white">
              {/* {likes} */}
              48
            </span>
          </div>
          <div
            className="absolute bottom-9 right-2 h-10 text-xl text-red-500 w-16 ml-2 hover:bg-green-600 flex items-center justify-center font-medium text-green-600 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={() => {
              setVisible(true);
              addItem(item);
            }}
          >
            <BsHandbagFill />
          </div>

          <div class="w-full h-8 flex justify-between">
            <span class="text-lg text-purple-600 bold">{name}</span>
            <span class="text-lg text-purple-600 bold">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  wishlist: selectFavouriteItem,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  addFavourite: (itemId) => dispatch(addFavouriteItem(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
