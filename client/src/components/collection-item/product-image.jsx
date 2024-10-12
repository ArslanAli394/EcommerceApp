import React, { lazy, Suspense, useMemo } from "react";
// import "./styles.css";
// import Artists from "./Artists";
// const CollectionItem = lazy(() => import("./collection-item"));
// const Data = React.lazy(() => import("./Data"));
let data = {
  id: 10,
  categoryId: "627fa53c8f10b09fbe77c326",
  name: "Adidas NMD",
  imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
  price: 220,
  color: ["red", "green"],
};

function LazyLoadComponent() {
  const Article = useMemo(() => lazy(() => import("./article")));
  return (
    <div className="App">
      {/* <CollectionItem key={1} category="hats" item={data} /> */}
      <Suspense fallback={<h1>Loading ... </h1>}>
        <Article />
      </Suspense>
    </div>
  );
}

export default LazyLoadComponent;
