import SHOP_DATA from "./shop.data.js";
import shopTypes from "./shop.types.js";

const INITIAL_STATE = {
  collection: [],
  categoryData: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopTypes.GET_SHOP_DATA:
      return {
        ...state,
        collection: action.payload,
      };
    case shopTypes.GET_CATEGORY_DATA:
      state = {
        ...state,
        categoryData: [...state.categoryData, ...action.payload],
      };
      console.log(state);
      return state;
    default:
      return state;
  }
};
export default shopReducer;
