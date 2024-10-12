import React, { useEffect, useState, useReducer } from "react";
import { Route } from "react-router-dom";
import CollectionOverview from "../../components/collection-overview/collection-overview";
// import CollectionPage from "../../components/collection-page/collection-page";
import { getProductsInfo } from "../../redux/shop/shop.action";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
//shop util
import { arrayToObject1 } from "../../redux/shop/shop.util";
// import CollectionPageScroll from "../../components/collection-page/collection-page-all-category";
import CollectionPageInfiniteScroll from "../../components/collection-page/collection-page-infinite-scroll";
import CollectionPageInfiniteScrollWithUseReducer from "../../components/collection-page/collection-page-infinite-scroll-useReducer";
// import { createStructuredSelector } from "reselect";
// import { shopSelectorCollection } from "../../redux/shop/shop.selector";
import CollectionPageWithSingleCategory from "../../components/collection-page/collection-page-with-single-category";
import ProductInfiniteScroll from "../../components/collection-page/product-infinite-scroll/product-infinite-scroll";
import useReducerShopTemp from "../../redux/shop/shop.useReducerHook";

const Shop = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then(({ data }) => {
        if (data.length > 0) {
          console.log(data);
          let transfromData = arrayToObject1(data, "title");
          if (transfromData !== undefined) {
            dispatch(getProductsInfo(transfromData));
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <span>
        {/* all shop route */}
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        {/* collection overview by category */}
        {/* <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        /> */}
        {/* collection overview by all category in reducer*/}
        {/* <Route
          path={`${match.path}/all/:collectionId`}
          component={CollectionPageScroll}
        /> */}
        {/* collection overview by one category in reducer*/}
        <Route
          exact
          path={`${match.path}/all/:collectionId`}
          component={CollectionPageWithSingleCategory}
        />

        {/* shop with virtual scroll */}
        {/* <Route exact path={`${match.path}/appobs`} component={AppObs} /> */}
        {/* category wise shop on scroll */}
        {/* <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPageInfiniteScroll}
        /> */}
        {/* category wise shop on scroll with use reducer */}
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageInfiniteScrollWithUseReducer {...props} />
          )}
        />
        {/* infinite scroll ok*/}
        {/* <Route
          exact
          path={`${match.path}/:collectionId`}
          component={ProductInfiniteScroll}
        /> */}
      </span>
    </>
  );
};

export default Shop;
