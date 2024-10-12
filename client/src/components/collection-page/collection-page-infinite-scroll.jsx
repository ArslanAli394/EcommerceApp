import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import { useDebounce } from "use-debounce";
// import { useHistory } from "react-router-dom";
// import { selectCollection } from '../../redux/shop/shop.selector';
import { createStructuredSelector } from "reselect";
import CollectionItem from "../collection-item/collection-item";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { categoryByShopWithScroll } from "../../redux/shop/shop.action";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector.js";
import InfiniteScroll from "react-infinite-scroller";
import SubTinyMenu from "../sub-tiny-menu/SubTinyMenu";
import {
  categoryByShopWithScroll,
  onCategoryChange,
} from "../../redux/shop/shop.action";

const CollectionPageInfiniteScroll = (props) => {
  const [category, setCategory] = useState(props.match.params.collectionId);
  const history = useHistory();
  // const { title, items,routeName } = collection;
  let [pageNum, setPageNum] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const dispatch = useDispatch();
  const [categoryType, setCategoryType] = useState("");
  const [skip, setSkip] = useState(0);
  const [collection, setCollection] = useState([]);
  const categoryData = useSelector((state) => state.shopScroll);
  const categroyShopData =
    categoryData?.collection?.length > 0 ? categoryData.collection : [];

  console.log(categroyShopData);

  // useEffect(() => {
  //   // let obj = {
  //   //   category: category,
  //   //   skip: skip,
  //   // };
  //   // dispatch(categoryByShopWithScroll(obj));
  //   console.log(pageNum);
  //   console.log(skip);
  //   axios
  //     .get(`http://localhost:5000/api/shop/${category}/scroll/${skip}`)
  //     .then(({ data }) => {
  //       console.log(data.data);
  //       let updateCollection = [...collection];
  //       let currentIndex = updateCollection?.findIndex(
  //         (c) => c.category === category
  //       );
  //       updateCollection[currentIndex] = {
  //         ...updateCollection[currentIndex],
  //         data: [...updateCollection[currentIndex].data, ...data.data],
  //       };
  //       console.log(updateCollection);
  //       setCollection(updateCollection);
  //     })
  //     .catch((err) => console.log(err));
  // }, [skip]);

  useEffect(() => {
    setCategoryType(props.match.params.collectionId);
    let obj = {
      category: category,
      pageNum: pageNum,
    };
    debugger;
    if (categoryData.collection.length === 0) {
      console.log("first call");
      dispatch(categoryByShopWithScroll(obj));
    }
  }, []);

  console.log(loadMore);
  useEffect(() => {
    setLoading(false);
    console.log("here 123");
  }, [categroyShopData[0]?.data?.length]);
  useEffect(() => {
    setFlag(true);
    setCollection(categroyShopData);
  }, [categroyShopData?.length > 0, categroyShopData?.length, categoryType]);

  const handleType = (value) => {
    console.log(props.match.path);
    history.push(`/shop/${value.toLowerCase()}`);
    setCategoryType(value.toLowerCase());
    if (flag) {
      setFlag(false);
    }
    let index = categroyShopData.findIndex(
      (c) => c.category === value.toLowerCase()
    );
    if (index > -1) {
      setPageNum(categroyShopData[index]?.data?.length);
      let updateCollection = [];
      updateCollection.push(categroyShopData[index]);
      setCollection(updateCollection);
    } else {
      setPageNum(0);
      dispatch(onCategoryChange());
    }
    let currentType = category.charAt(0).toUpperCase() + category.slice(1);
    console.log(currentType);
    console.log(value);
    if (value !== currentType) {
      if (categroyShopData[index]?.category) {
        // when redux contain data of that category
        setCollection(categroyShopData);
        setSkip(categroyShopData[index].data?.length);
      } else {
        // when data of this category not exist in redux
        setSkip(0);
        let obj = {
          currentCollection: collection,
          skip: 0,
          category: value.toLowerCase(),
          previousType: category,
        };
        console.log(obj);
        dispatch(categoryByShopWithScroll(obj));
      }
    }
  };

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      console.log(first);
      if (first.isIntersecting) {
        setPageNum((no) => no + 8);
      }
    })
  );

  if (collection?.length > 0) {
    let currentItem = collection?.find((c) => c.category === category);
    if (currentItem.total === currentItem.data?.length - 1) {
      setLoadMore(false);
    }
  }
  useEffect(() => {
    if (pageNum > 1 && loadMore) {
      // axios
      //   .get(`http://localhost:5000/api/shop/${category}/scroll/${pageNum}`)
      //   .then(({ data }) => {
      //     console.log(data.data);
      // dispatch({
      //   type: shopTypes.GET_SHOP_DATA_SCROLL,
      //   payload: {
      //     category: category,
      //     data: data.data,
      //     componentData: currentCollection,
      //     previousType,
      //   },
      // });
      let obj = {
        category,
        skip: pageNum,
        currentCollection: collection,
        previousType: category,
      };
      let index = categroyShopData.findIndex(
        (c) => c.category === categoryType
      );
      if (pageNum < collection[index]?.total) {
        dispatch(categoryByShopWithScroll(obj));
        setLoading(true);
      }
      // setCollection([...collection, ...data.data]);
      // })
      // .catch((err) => console.log(err));
    }
  }, [pageNum]);

  const handleScroll = (e) => {
    e.preventDefault();
    let index = collection?.findIndex((c) => c.category === category);
    // setSkip(collection[index]?.data?.length);
  };

  useEffect(() => {
    const currentElement = lastElement;
    console.log(currentElement);
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        //alert(lastElement);
        // let storeItem = categroyShopData?.find((s) => s.category === category);
        //cuurent component  item
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
      <SubTinyMenu
        path={props.match.path}
        type={categoryType}
        data={props.shopCollections}
        handleType={handleType}
      />
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {categoryType.toUpperCase()}
      </h2>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => handleScroll}
        hasMore={true}
        // loader={
        //   <div className="loader" key={0}>
        //     Loading ...
        //   </div>
        // }
        useWindow={false}
      >
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {collection?.map(
            (item) =>
              item.category === categoryType &&
              item?.data?.map((categoryItem) => (
                <div ref={setLastElement}>
                  <CollectionItem
                    key={categoryItem.id}
                    category={item.category}
                    item={categoryItem}
                  />
                </div>
              ))
          )}
        </div>
      </InfiniteScroll>
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

// const mapStateToProps = (state,ownProps)=>({
//     collection : selectCollection(ownProps.match.params.collectionId)(state)
// })
const mapStateToProps = createStructuredSelector({
  shopCollections: selectCollectionForPreview,
});
// export default withRouter(
//   connect(mapStateToProps, null)(CollectionPageInfiniteScroll)
// );
export default connect(mapStateToProps, null)(CollectionPageInfiniteScroll);
