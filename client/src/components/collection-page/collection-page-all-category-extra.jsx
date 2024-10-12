import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import { selectCollection } from '../../redux/shop/shop.selector';
import CollectionItem from "../collection-item/collection-item";
import axios from "axios";
// import { categoryByShopWithScroll } from '../../redux/shop/shop.action';
import { selectCollectionForPreview } from "../../redux/shop/shop.selector.js";
import { createStructuredSelector } from "reselect";

const CollectionPageScroll = (props) => {
  const shopOnScroll = useSelector((state) => state.shopScroll);
  const dispatch = useDispatch();
  const category = props.match.params.collectionId;
  const [skip, setSkip] = useState(0);
  const [flag, setFlag] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [collection, setCollection] = useState([]);

  const sendQuery = useCallback(() => {
    axios
      .get(`http://localhost:5000/api/shop/${category}/scroll/${skip}`)
      .then(({ data }) => {
        setCollection([...collection, ...data.data]);
      })
      .catch((err) => console.log(err));
  }, [skip]);

  useEffect(() => {
    dispatch({
      type: "ITEMS_STOCK",
      payload: {
        list: collection,
        type: category,
      },
    });
  }, [collection]);

  useEffect(() => {
    setCategoryType(category.charAt(0).toUpperCase() + category.slice(1));
    console.log(shopOnScroll);
    if (shopOnScroll != undefined && shopOnScroll[category]) {
      setCollection(shopOnScroll[category]);
    } else {
      sendQuery();
    }
    if (flag) {
      sendQuery();
      setFlag(false);
    }
  }, [skip]);

  const handleScroll = (e) => {
    setSkip(collection.length + 1);
    setFlag(true);
  };
  return <></>;
};
const mapStateToProps = createStructuredSelector({
  // build in name of selector for getting state
  allCollections: selectCollectionForPreview,
});
export default connect(mapStateToProps)(CollectionPageScroll);
