import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory, Link } from "react-router-dom";
//components
import CollectionPreview from "../../components/collection-preview/collection-preview";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector.js";
import SubTinyMenu from "../sub-tiny-menu/SubTinyMenu";

const CollectionOverview = ({ collections }) => {
  console.log(collections);
  const history = useHistory();
  const [categoryType, setCategoryType] = useState("All");
  useEffect(() => {
    // if(collections.length >0){
    //     collections.map(collection=>{
    //         setCategoryType(collection.title)
    //     })
    // }
  }, []);
  return (
    <div>
      <Link
        to="#"
        onClick={() => history.goBack()}
        className="flex text-md text-purple-500 mx-5"
      >
        Back
      </Link>
      <SubTinyMenu
        type={categoryType}
        data={collections}
        handleType={(value) => setCategoryType(value)}
      />
      {categoryType === "All"
        ? collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
          ))
        : collections.map(
            ({ id, ...otherCollectionProps }) =>
              categoryType === otherCollectionProps.title && (
                <CollectionPreview key={id} {...otherCollectionProps} />
              )
          )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});
export default connect(mapStateToProps)(CollectionOverview);
