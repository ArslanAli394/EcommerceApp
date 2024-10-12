import React from "react";

import CollectionItem from "../collection-item/collection-item";

const CollectionPreview = ({ title, items, routeName }) => {
  return (
    <div class="max-w-2xl mx-auto py-9 px-4 sm:py-17 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">
        {title.toUpperCase()}
      </h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {items.map((item) => (
          <CollectionItem key={item.id} category={routeName} item={item} />
        ))}
      </div>
    </div>
  );
};
export default CollectionPreview;
