import favouriteTypes from "./favourite.types";
import { addFavouriteProduct,findWishListItems, removeItemToWishlist,addItemToWishlist} from "./favourite.util";
// full shop data
import SHOP_DATA from "../shop/shop.data.js.js";


const collections = SHOP_DATA; 

const INTIAL_STATE = {
    favouriteItems:[], // for favourite id
    wishlistItems : []
}

const favourtieReducer = (state= INTIAL_STATE,action)=>{
    switch (action.type) {
        case favouriteTypes.ADD_FAVOURITE_ITEM:
            return {
                ...state,
                favouriteItems:addFavouriteProduct(state.favouriteItems, action.payload)
            }
        case favouriteTypes.FIND_FAVOURITE_ITEM:
            return {
                ...state,
                wishlistItems : findWishListItems(state.favouriteItems,collections)
            }
        case favouriteTypes.ADD_WISHLIST_ITEM:
            console.log('here')
            return {
                ...state,
                wishlistItems:addItemToWishlist(state.wishlistItems,action.payload)
            }
        case favouriteTypes.CLEAR_WISHLIST:
            return{
                ...state,
                wishlistItems:state.wishlistItems.filter(wishlist => wishlist.id!==action.payload.id)
            }
        case favouriteTypes.REMOVE_FAVOURITE_ITEM:
            return {
                ...state,
                wishlistItems: removeItemToWishlist(state.wishlistItems,action.payload)
            }           
        default:
            return state
    }
} 
export default favourtieReducer;