// source
// https://codesandbox.io/s/react-infinite-scroll-forked-87fd6l?file=/src/App.js
// https://codesandbox.io/s/m3pz5pqj39?file=/index.js
// https://codesandbox.io/s/vwtr8?file=/src/InfiniteList.tsx
import React, { useState, useEffect, useRef, cloneElement } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useHistory } from "react-router-dom";
import CollectionItem from "../../collection-item/collection-item";
import {
  selectCollectionForPreview,
  selectCollection,
  shopSelectorCollection,
} from "../../../redux/shop/shop.selector.js";
import InfinitScroll from "react-infinite-scroll-component";

import SubTinyMenu from "../../sub-tiny-menu/SubTinyMenu";
import {
  categoryByShopWithScroll,
  categoryByShopWithAutoScroll,
  updateExistingProduct,
} from "../../../redux/shop/shop.action";
import ComboBox from "../../select-box/select-box";

const ProductInfiniteScroll = (props) => {
  const history = useHistory();
  const [category, setCategory] = useState(props.match.params.collectionId);
  const [isLoading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [categoryType, setCategoryType] = useState("");

  const [collection, setCollection] = useState([]);
  const [count, setCount] = useState(8);
  const [start, setStart] = useState(0);
  // use selector to get state from store
  // state.shopScroll => describe the target reducer in root reducer (useReducerShop)
  const categoryData = useSelector((state) => state.shopScroll);

  const categroyShopData =
    categoryData?.collection?.length > 0 ? categoryData.collection : [];

  let fullState = categoryData ? categoryData : {};

  console.log(categroyShopData);
  console.log(collection);
  useEffect(() => {
    setCategoryType(props.match.params.collectionId);
    let obj = {
      category: category,
      start: start,
    };
    dispatch(categoryByShopWithAutoScroll(obj));
  }, []);

  useEffect(() => {
    debugger;
    setLoading(false);
    console.log(fullState);
    setCollection(categroyShopData[fullState?.currentIndex]?.data);
  }, [categroyShopData[fullState?.currentIndex]?.data?.length]);

  // useEffect(() => {
  //   debugger;
  //   if (flag) {
  //     let itemExist = categroyShopData?.find((c) => c.category === category);
  //     if (itemExist) {
  //       setCollection(itemExist?.data);
  //       setStart(itemExist?.data?.length);
  //     }
  //   }
  // }, [flag]);
  // categroyShopData [{category:hats, data:[]}, {sneaker, data:[]}]
  useEffect(() => {
    debugger;
    let nextCategoryData = categroyShopData.find(
      (c) => c.category === category
    );
    if (nextCategoryData?.data?.length > 0) {
      setLoading(false);
      setFlag(true);
      setCollection(nextCategoryData?.data);
    }
  }, [categroyShopData?.length]);

  const handleType = (value) => {
    debugger;
    history.push(`/shop/${value.toLowerCase()}`);
    setCategory(value.toLowerCase());
    let itemExist = categroyShopData?.find(
      (c) => c.category === value?.toLowerCase()
    );
    if (itemExist) {
      let updateCollection = [];
      itemExist?.data?.map((i) => {
        updateCollection.push(i);
      });
      if (updateCollection?.length > 0) {
        setCollection(updateCollection);
        setStart(updateCollection?.length - 8);
      }
      console.log(collection);
    } else {
      setStart(0);
      let obj = {
        category: value.toLowerCase(),
        start: 0,
        previousType: category,
      };
      dispatch(categoryByShopWithAutoScroll(obj));
    }
  };

  const fetchNextUsers = () => {
    debugger;
    let nextStart;
    if (start === undefined || start === null) {
      nextStart = 0 + 8;
    } else {
      nextStart = start + 8;
    }
    let currentObj = categroyShopData.find((d) => d.category === category);
    if (currentObj?.total > collection?.length) {
      setStart(nextStart);
      let obj = {
        category: category,
        start: nextStart,
      };
      dispatch(categoryByShopWithAutoScroll(obj));
    } else {
      setStart(currentObj?.total);
      if (flag) {
        alert("No more product of this category.");
      }
    }
    // setFlag(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
      <SubTinyMenu
        path={props.match.path}
        type={categoryType}
        data={props.shopCollections}
        handleType={handleType}
      />
      <Link
        to="#"
        onClick={() => history.goBack()}
        className="flex text-md text-purple-500"
      >
        Back
      </Link>
      <ComboBox handleType={handleType} />
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {categoryType.toUpperCase()}
      </h2>

      <InfinitScroll
        dataLength={collection?.length}
        next={fetchNextUsers}
        hasMore={true}
        loader={<h4>Loading ... </h4>}
      >
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {collection?.map((item) => {
            return (
              <>
                <CollectionItem key={item.id} category={category} item={item} />
              </>
            );
          })}
        </div>
      </InfinitScroll>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : null}
      {/* <button onClick={handleScroll}>Load More</button> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  shopCollections: selectCollectionForPreview,
  shop: (category) => selectCollection(category),
});
export default connect(mapStateToProps, null)(ProductInfiniteScroll);
