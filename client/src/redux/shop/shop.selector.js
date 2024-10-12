import { createSelector } from "reselect";

//input selector
const shopSelector = (state) => state.shop;

//output selector
const fullShop = createSelector(
  [shopSelector],
  (shop) => shop
);
const shopSelectorCollection = createSelector(
  [shopSelector],
  (shop) => shop.collection
);
// [{hats}, {sneaker}]
// [hats:{}, sneaker:{}]
// for single collection not auto scroll 
const selectCollectionForPreview = createSelector(
  [shopSelectorCollection],
  (collection) => Object.keys(collection).map((key) => collection[key])
);
// selector for category wise shop
const selectCollection = (selectCollectionId) =>
  createSelector(
    [shopSelectorCollection],
    (collection) => collection[selectCollectionId]
  );

// selector for individual item with specific category
const selectItemByCategory = (category, id) =>
  createSelector([shopSelectorCollection], (collection) =>
    collection[category].items.find((item) => item.id == id)
  );
  //fix
  const selectProductByCategory = (category, id) =>
  createSelector([fullShop], (shop) =>
    // console.log(shop.collection, category),
    // console.log(Object.fromEntries(Object.entries(shop.collection).filter(([key]) => key.includes(category)))),
    Object.fromEntries(Object.entries(shop.collection).filter(([key]) => key.includes(category)))
    // console.log(shop.collection.keys(category)),
    // shop?.collection[category].find((item) => item.id == id)
  );
export {
  shopSelectorCollection,
  selectCollection,
  selectProductByCategory,
  selectCollectionForPreview,
  selectItemByCategory,
  fullShop
};
