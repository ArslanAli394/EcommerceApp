import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import { useDebounce } from "use-debounce";
// import { useHistory } from "react-router-dom";
// import { selectCollection } from '../../redux/shop/shop.selector';
import { createStructuredSelector } from "reselect";
import CollectionItem from "../collection-item/collection-item";
import { withRouter } from "react-router-dom";
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
  // const history = useHistory();
  // console.log(history);
  // const [shopCollections, setShopCollection] = useState([]);
  // console.log(props.match.params.collectionId);
  const [category, setCategory] = useState(props.match.params.collectionId);
  // const { title, items,routeName } = collection;
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [categoryType, setCategoryType] = useState("");
  const [skip, setSkip] = useState(0);
  const [collection, setCollection] = useState([]);
  const categoryData = useSelector((state) => state.shopScroll);
  const categroyShopData =
    categoryData?.collection?.length > 0 ? categoryData.collection : [];

  console.log(categoryData);

  useEffect(() => {
    // let obj = {
    //   category: category,
    //   skip: skip,
    // };
    // dispatch(categoryByShopWithScroll(obj));
    axios
      .get(`http://localhost:5000/api/shop/${category}/scroll/${skip}`)
      .then(({ data }) => {
        console.log(data.data);
        let updateCollection = [...collection];
        let currentIndex = updateCollection?.findIndex(
          (c) => c.category === category
        );
        updateCollection[currentIndex] = {
          ...updateCollection[currentIndex],
          data: [...updateCollection[currentIndex].data, ...data.data],
        };
        console.log(updateCollection);
        setCollection(updateCollection);
      })
      .catch((err) => console.log(err));
  }, [skip]);

  useEffect(() => {
    setCategoryType(props.match.params.collectionId);
    let obj = {
      category: category,
      skip: skip,
    };
    dispatch(categoryByShopWithScroll(obj));
  }, []);

  useEffect(
    () => {
      console.log("here");
      setFlag(true);
      setCollection(categroyShopData);
    },
    [categroyShopData?.length > 0, categroyShopData?.length],
    categoryType
  );

  const handleType = (value) => {
    setCategoryType(value.toLowerCase());
    if (flag) {
      setFlag(false);
    }
    dispatch(onCategoryChange());
    let index = categroyShopData.findIndex(
      (c) => c.category === value.toLowerCase()
    );
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

  const handleScroll = (e) => {
    e.preventDefault();
    let index = collection?.findIndex((c) => c.category === category);
    setSkip(collection[index]?.data?.length);
  };
  console.log(categoryType);
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <SubTinyMenu
        type={categoryType}
        data={props.shopCollections}
        handleType={handleType}
      />
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {category.toUpperCase()}
      </h2>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => handleScroll}
        hasMore={true}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {collection?.map(
            (item) =>
              item.category === categoryType &&
              item?.data?.map((categoryItem) => (
                <CollectionItem
                  key={categoryItem.id}
                  category={item.category}
                  item={categoryItem}
                />
              ))
          )}
        </div>
      </InfiniteScroll>

      <button onClick={handleScroll}>Load More</button>
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
