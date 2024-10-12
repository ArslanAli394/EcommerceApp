import React from 'react';
import { useDispatch } from 'react-redux';
// import { Route } from 'react-router-dom';
// import CollectionOverview from '../../components/collection-overview/collection-overview';
// import CollectionPage from '../../components/collection-page/collection-page';
import { addItem } from '../../redux/cart/cart.action';

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Hat',
        href: '#',
        imageSrc: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Sneaker',
        href: '#',
        imageSrc: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 4,
        name: 'Jacket',
        href: '#',
        imageSrc: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 5,
        name: 'Mens',
        href: '#',
        imageSrc: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
      },
  ]
  
function ShopTwoPic() {
  const dispatch = useDispatch();

    return (
      <div className="bg-white">



        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
       

       
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                  <span
                    className="absolute top-0 right-0 p-3 text-md font-bold leading-none text-white transform bg-green-600 rounded-full">
                    30% Off
                </span>
                <div className='invisible group-hover:visible'>
                  <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-55 lg:h-80 lg:aspect-none'>
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                  <span
                    className="absolute top-0 right-0 p-3 text-md font-bold leading-none text-white transform bg-green-600 rounded-full">
                    40% Off
                </span>
                </div> 
                {/* <div className='absolute w-1/3 h-10 top-30 left-25 py-2 bg-gray-400 text-white text-center'>
                    <button 
                    // onClick={()=>addItem(item)}
                    >Add To Favourite</button>
                  </div>  */}
                  <div className='absolute w-1/3 h-10 top-20 left-40 py-2 bg-gray-400 text-white text-center'>
                    <button 
                    onClick={()=>dispatch(addItem(product))}
                    >Add To Cart</button>
                  </div>
                  
                </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="mt-4 text-lg text-bold font-bold text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  <p className=" text-lg font-bold font-medium text-gray-900">{product.price}</p>
                  </div>
                    {/* <p className=" text-sm text-gray-500">{product.color}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
export default ShopTwoPic;