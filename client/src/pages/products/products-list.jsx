import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductAction } from "../../redux/products/product.action";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log(products);
  useEffect(() => {
    dispatch(getProductAction());
  }, []);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div>
        <div className="flex justify-between items-between">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
            Products
          </h2>
          <Link
            to="/create-product"
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white text-medium rounded-md flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block w-full shadow-md rounded-lg overflow-hidden">
            <table className="w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-3 sm:px-5 py-2 sm:py-3 md:py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 sm:px-5 py-2 sm:py-3 md:py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-3 sm:px-5 py-2 sm:py-3 md:py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wider">
                    Colors
                  </th>
                  {/* <th className="px-3 sm:px-5 py-2 sm:py-3 md:py-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-3 sm:px-5 py-2 sm:py-3 md:py-4 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0
                  ? products?.map((p, index) => (
                      <tr key={index}>
                        <td className="px-3 sm:px-5 py-3 border-b border-gray-200 bg-white text-sm sm:text-base md:text-lg">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                              <img
                                className="w-full h-full rounded-full"
                                src={p.brandImage}
                                alt=""
                              />
                            </div>
                            <div className="pl-2 sm:pl-3 md:pl-4">
                              <p className="text-gray-900">{p.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p>{p.brandTitle}</p>
                        </td>
                        <td>
                          <div className="flex">
                            {p?.colorsWithImages.length > 0 &&
                              p?.colorsWithImages.map((c, index) => (
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: `${c.color}`,
                                    marginRight: "2px",
                                  }}
                                ></div>
                              ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
// const mapStateToProps = createStructuredSelector({
//   productList: getProducts,
// });

export default ProductList;
