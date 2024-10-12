import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionItem from "./components/collection-item/collection-item";
import SubTinyMenu from "./components/sub-tiny-menu/SubTinyMenu";
import { categoryByShopWithScroll } from "./redux/shop/shop.action";
import { selectCollectionForPreview } from "./redux/shop/shop.selector";

const TOTAL_PAGES = 2;

const AppObs = (props) => {
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [initFlag, setFlag] = useState(true);
  const [category, setCategory] = useState("Hats");
  const [categoryCollection, setcategoryCollection] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.shopScroll);
  const categroyShopData =
    categoryData?.collection?.length > 0 ? categoryData.collection : [];
  console.log(props.shopCollections);
  useEffect(() => {
    let obj = {
      category: category.toLowerCase(),
      skip: pageNum,
      currentCollection: [],
      previousType: category.toLowerCase(),
    };
    dispatch(categoryByShopWithScroll(obj));
  }, []);
  // console.log(categroyShopData[0]?.data?.length);

  useEffect(() => {
    let filterCollection = categroyShopData?.find(
      (c) => c.category === category.toLowerCase()
    );
    if (filterCollection?.data?.length > 0 || initFlag) {
      setcategoryCollection(filterCollection?.data);
      setTotalPages(filterCollection?.totalPages);
      setSelectedCollection(filterCollection);
      setPageNum(1);
      setFlag(false);
    }
  }, [categroyShopData?.length]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      console.log(first);
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const callUser = async () => {
    setLoading(true);
    let filterCollection = categroyShopData?.find(
      (c) => c.category === category.toLowerCase()
    );
    if (initFlag) {
      alert("dispatch");
      //   let all = new Set([categroyShopData[0]?.data]);
      // setcategoryCollection([...all]);
      setLoading(false);
    } else {
      debugger;
      console.log(pageNum);
      console.log(filterCollection);
      if (pageNum <= filterCollection?.totalPages) {
        let response = await axios.get(
          `http://localhost:5000/api/shop/${category.toLowerCase()}/scroll/${pageNum}`
        );
        let all = new Set([...categoryCollection, ...response.data.data]);

        setcategoryCollection([...all]);
        setLoading(false);
      }
    }
  };
  // const callUser = async () => {
  // 	setLoading(true);
  //   let obj = {
  //     category: "hats",
  //     skip: pageNum,
  //     currentCollection: [],
  //     previousType: "hats",
  //   };
  //   debugger;
  //   if(initFlag){
  //     dispatch(categoryByShopWithScroll(obj));
  //   }else{
  // 	let response = await axios.get(
  // 		`http://localhost:5000/api/shop/hats/scroll/${pageNum}`
  // 	);
  // 	let all = new Set([...categoryCollection, ...response.data.data]);
  // 	setcategoryCollection([...all]);
  //   }
  // };
  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      callUser();
    }
  }, [pageNum]);
  // handle category change
  const handleCategoryChange = (value) => {
    let obj = {
      category: value.toLowerCase(),
      skip: 1,
      currentCollection: categoryCollection,
      previousType: category.toLowerCase(),
      previousPage: pageNum,
    };
    setcategoryCollection([]);
    setCategory(value);
    dispatch(categoryByShopWithScroll(obj));
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
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div className="mx-44 bg-gray-100 p-6">
      <SubTinyMenu
        type={category}
        data={props.shopCollections}
        handleType={handleCategoryChange}
      />
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {category.toUpperCase()}
      </h2>
      {/* <h1 className='text-3xl text-center mt-4 mb-10'>All users</h1> */}

      <div className="grid grid-cols-3 gap-4">
        {categoryCollection?.length > 0 &&
          categoryCollection.map((user, i) => {
            return i === categoryCollection.length - 1 &&
              !loading &&
              pageNum <= TOTAL_PAGES ? (
              <div key={`${user?.name}-${i}`} ref={setLastElement}>
                {setLastElement}
                <CollectionItem
                  key={i}
                  category={user?.categoryId}
                  item={user}
                />
              </div>
            ) : (
              <CollectionItem key={i} category={user?.categoryId} item={user} />
            );
          })}
      </div>
      {loading && <p className="text-center">loading...</p>}

      {pageNum - 1 === TOTAL_PAGES && <p className="text-center my-10">♥</p>}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  shopCollections: selectCollectionForPreview,
});

export default connect(mapStateToProps, null)(AppObs);
