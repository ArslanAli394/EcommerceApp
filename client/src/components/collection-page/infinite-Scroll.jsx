import React, { useState, useEffect, useRef } from "react";
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

const InfiniteScrollComp = (props) => {
  const [category, setCategory] = useState(props.match.params.collectionId);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [categoryType, setCategoryType] = useState("");
  const [skip, setSkip] = useState(0);
  const [collection, setCollection] = useState([]);
  const [stateObj, setStateObj] = useState({
    url: "https://pokeapi.co/api/v2/pokemon/?limit=20",
    pokemon: [],
    itemsCountPerPage: 20,
    activePage: 1,
  });
  const categoryData = useSelector((state) => state.shopScroll);
  const categroyShopData =
    categoryData?.collection?.length > 0 ? categoryData.collection : [];

  console.log(categoryData);

  //   useEffect(() => {
  //     // let obj = {
  //     //   category: category,
  //     //   skip: skip,
  //     // };
  //     // dispatch(categoryByShopWithScroll(obj));
  //     console.log(pageNum);
  //     console.log(skip);
  //     axios
  //       .get(`http://localhost:5000/api/shop/${category}/scroll/${skip}`)
  //       .then(({ data }) => {
  //         console.log(data.data);
  //         let updateCollection = [...collection];
  //         let currentIndex = updateCollection?.findIndex(
  //           (c) => c.category === category
  //         );
  //         updateCollection[currentIndex] = {
  //           ...updateCollection[currentIndex],
  //           data: [...updateCollection[currentIndex].data, ...data.data],
  //         };
  //         console.log(updateCollection);
  //         setCollection(updateCollection);
  //       })
  //       .catch((err) => console.log(err));
  //   }, [skip]);

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

  const loadPokemon = () => {
    axios
      .get(stateObj.url)
      .then((res) => {
        setStateObj((prevState) => {
          const pokemons = prevState.pokemon;
          return {
            pokemon: [...prevState.pokemon, ...res.data.results],
            url: res.data.next,
          };
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {stateObj.pokemon ? (
        <div className="row">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadPokemon}
            hasMore={stateObj.url}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            {stateObj.pokemon.map((pokemon, i) => (
              <div
                style={{ borderBottom: "1px solid", padding: "10px" }}
                key={pokemon.name + i}
              >
                <div>{pokemon.name}</div>
                <div>{pokemon.url}</div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
    </React.Fragment>
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
export default connect(mapStateToProps, null)(InfiniteScrollComp);
