import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";
//redux persist
import { persistReducer } from "redux-persist";
//browser local storage integrate by redux persist
import storage from "redux-persist/lib/storage";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import favourtieReducer from "./favourite/favourite.reducer";
import useReducerShop from "./shop/shop.useReducer";
import productReducer from "./products/product.reducer";
//persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  // as user is config with firebase therfore only cart config with redux persist
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  products: productReducer,
  shopScroll: useReducerShop,
  favourite: favourtieReducer,
});

export default persistReducer(persistConfig, rootReducer);
