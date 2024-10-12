
import productTypes from "./product.types.js";

const INITIAL_STATE = {
    products: []
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.CREATE_PRODUCT:
        debugger;
        state  = {
            ...state,
            products: [...state.products, action.payload],
          };
        return state;
    case productTypes.GET_PRODUCT:
        return state;
    default:
      return state;
  }
};
export default productReducer;
