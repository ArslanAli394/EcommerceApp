import { createSelector } from "reselect";

//input selector
const productSelector = (state) => state.products;

//output selector
const getProducts = createSelector(
  [productSelector],
  (products) => products
);

export {
    getProducts
};
