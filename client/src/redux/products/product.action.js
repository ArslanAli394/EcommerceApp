import productTypes from "./product.types";
import axios from "axios";

// get while data from shop
export const createProductAction = (data) =>(dispatch)=> {
  dispatch({
    type: productTypes.CREATE_PRODUCT,
    payload: data,
  });
};
// get while data from shop
export const getProductAction = (data) =>(dispatch)=> {
    dispatch({
      type: productTypes.GET_PRODUCT
    });
  };
// create product and store in mongoose
  export const createProductIntoDB = (obj) => (dispatch) => {
    // currentCollection set handle change category
    // const { category, skip, currentCollection, previousType } = obj;
    // console.log(category);
    // if(obj)
    // return function (dispatch, obj) {
    axios
      .post(`http://localhost:5000/api/product/${obj}`)
      .then(({ data }) => {
        console.log(data.data);
        // dispatch({
        //   type: shopTypes.GET_SHOP_DATA_SCROLL,
        //   payload: {
        //     category: category,
        //     data: data.data,
        //     total: data.total,
        //     totalPages:data.totalPages,
        //     componentData: currentCollection,
        //     previousType,
        //   },
        // });
      })
      .catch((err) => console.log(err));
    // };
  };
  