//https://codesandbox.io/s/react-lazy-load-www4y?file=/package.json
import shopTypes from "./shop.types";
import axios from "axios";

// get while data from shop
export const getProductsInfo = (data) => {
  return {
    type: shopTypes.GET_SHOP_DATA,
    payload: data,
  };
};
// category wise data
export const getCategoryWiseData = (category) => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/category/${category}`)
    .then(({ data }) => {
      console.log(data.length);
      dispatch({
        type: shopTypes.GET_CATEGORY_DATA,
        payload: data,
      });
    })
    .catch((err) => console.log(err));
};
// on category change
export const onCategoryChange = () => {
  return {
    type: "CATEGORY_CHANGE",
  };
};
// get shop on scroll
// export const categoryByShopWithScroll = (data) => {
//   return{
//       type : shopTypes.GET_SHOP_DATA_SCROLL,
//       payload :data
//   }
// };
// get shop on scroll
export const categoryByShopWithScroll = (obj) => (dispatch) => {
  // currentCollection set handle change category
  const { category, skip, currentCollection, previousType } = obj;
  console.log(category);
  // if(obj)
  // return function (dispatch, obj) {
  axios
    .get(`http://localhost:5000/api/shop/${category}/scroll/${skip}`)
    .then(({ data }) => {
      console.log(data.data);
      dispatch({
        type: shopTypes.GET_SHOP_DATA_SCROLL,
        payload: {
          category: category,
          data: data.data,
          total: data.total,
          totalPages:data.totalPages,
          componentData: currentCollection,
          previousType,
        },
      });
    })
    .catch((err) => console.log(err));
  // };
};

//update existing product
export const updateExistingProduct = (value) =>dispatch =>{
 dispatch({
  type: shopTypes.GET_EXIST_DATA,
  payload: value
 })
}
// get shop on fix scroll
export const categoryByShopWithAutoScroll = (obj) => (dispatch) => {
  // currentCollection set handle change category it is not used & previous type not used
  const { category, start, currentCollection, previousType } = obj;
  console.log(category);
  debugger;
  // if(obj)
  // return function (dispatch, obj) {
  axios
    .get(`http://localhost:5000/api/shop/${category}/scroll/${start}`)
    .then(({ data }) => {
      console.log(data.data);
      dispatch({
        type: shopTypes.GET_SHOP_DATA_SCROLL,
        payload: {
          category: category,
          data: data.data,
          total: data.total,
          totalPages:data.totalPages,
          componentData: currentCollection,
          previousType,
        },
      });
    })
    .catch((err) => console.log(err));
  // };
};
