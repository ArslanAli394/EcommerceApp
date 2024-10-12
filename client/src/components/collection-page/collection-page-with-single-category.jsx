import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import { selectCollection } from '../../redux/shop/shop.selector';
import CollectionItem from "../collection-item/collection-item";
// import { categoryByShopWithScroll } from '../../redux/shop/shop.action';
import { selectCollectionForPreview } from "../../redux/shop/shop.selector.js";
import { createStructuredSelector } from "reselect";
import { getCategoryWiseData } from "../../redux/shop/shop.action";
import SubTinyMenu from "../sub-tiny-menu/SubTinyMenu";
import { useHistory, Link } from "react-router-dom";

const CollectionPageWithSingleCategory = (props) => {
  const shopData = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const history = useHistory();
  const category = props.match.params.collectionId;
  const [categoryType, setCategoryType] = useState("");
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    let category = props.match.params.collectionId;
    setCategoryType(
      category[0].toUpperCase() + category.slice(1).toLowerCase()
    );
    dispatch(getCategoryWiseData(category));
  }, []);

  useEffect(() => {
    let selecteCategory = shopData?.categoryData?.find(
      (c) => c.title === categoryType
    );
    if (selecteCategory !== undefined) {
      setCollection(selecteCategory.items);
    }
  }, [shopData?.categoryData?.length]);

  useEffect(() => {
    let selectedCategory = props.allCollections?.find(
      (c) => c.title === categoryType
    );
    if (selectedCategory?.items.length > 0) {
      setCollection(selectedCategory.items);
    }
  }, [categoryType]);

  const handleTypeChange = (value) => {
    let type = value.toLowerCase();
    history.push(`/shop/${value.toLowerCase()}`);
    let selectedCategory = props.allCollections?.find((c) => c.title === value);
    if (
      selectedCategory?.items?.length === 0 ||
      selectedCategory?.items?.length === undefined ||
      selectedCategory?.items?.length === null
    ) {
      setCategoryType(value);
      dispatch(getCategoryWiseData(type));
    } else {
      setCategoryType(value);
    }
  };
  return (
    <div className="max-w-2xl mx-auto px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link
        to="#"
        onClick={() => history.goBack()}
        className="flex text-md text-purple-500"
      >
        Back
      </Link>
      <div className="flex justify-center font-bold text-2xl font-sans">
        <SubTinyMenu
          path={props.match.path}
          type={categoryType}
          data={props.allCollections}
          handleType={handleTypeChange}
        />
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {categoryType.toUpperCase()}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {collection?.map((item, index) => (
          <CollectionItem key={index} category={category} item={item} />
        ))}
        l
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  //only use for category names
  allCollections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionPageWithSingleCategory);
