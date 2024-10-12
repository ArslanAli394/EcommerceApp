import { CurrencyEuroIcon } from "@heroicons/react/solid";
import shopTypes from "./shop.types.js";
// import {produce} from "immer";

const INITIAL_STATE = {
  collection: [],
  currentIndex:0
};
const useReducerShop = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CATEGORY_CHANGE":
      return state;
    case shopTypes.GET_EXIST_DATA:
      debugger;
      console.log(action.payload)
      console.log(state);
      return state;
    case shopTypes.GET_SHOP_DATA_SCROLL:
      let existingCategory = state.collection?.find(
        (c) => c.category === action.payload.category
      );
        debugger;
      console.log(action.payload);
      if (existingCategory && state.collection?.length > 0) {
        console.log(action.payload);
        let prevIndex = state.collection?.findIndex(
          (c) => c.category === action.payload.category
        );
        console.log(prevIndex);
        state  = {
          collection:[
            state.collection[prevIndex] = {
              ...state.collection[prevIndex],
              data: [...state.collection[prevIndex].data, ...action.payload.data],
            }
          ],
          currentIndex:prevIndex
        }
        console.log(state);
      } else {
        console.log(action.payload);
        let combineData = {
          category: action.payload.category,
          data: action.payload.data,
          total: action.payload?.total,
          totalPages: action.payload.totalPages
        };
        console.log(combineData);
        let updatedCollection = []
        updatedCollection.push(combineData);
        let currentIndex = 0;
        if(state.collection?.length > 0){
          currentIndex = state.collection?.length;
        }
        state = {
          ...state,
          collection: [...state.collection, ...updatedCollection],
          currentIndex
        };
      }
      console.log(state);
      return state;
    default:
      return state;
  }
};

export default useReducerShop;
