import React,{ useState,useEffect } from 'react'
import {HiChevronRight,HiChevronLeft} from 'react-icons/hi';


const ViewItem=()=> {

  const [jsxelement, setjsxelement] = useState(1);

const handleImage =(value)=> {
  setjsxelement(value);   
}
const handleRightArrow=()=>{
  if(jsxelement<4){
    setjsxelement(jsxelement+1)
  }else{
    setjsxelement(1)
  }

}
const handleLeftArrow=()=>{
  if(jsxelement>1){
    setjsxelement(jsxelement-1)
  }else{
    setjsxelement(4)
  }
  
}

  return(
    <div className="py-6">
  
  <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <div className="flex flex-col md:flex-row -mx-4">
      <div className="md:flex-1 px-4">
        <div x-data="{ image: 1 }" x-cloak>
          <div className="flex justify-start">
            <div className="hidden md:block px-5">
              <div className="rounded-lg h-20 w-20 bg-gray-100 mb-4">
              <button className='rounded-lg h-20 w-20' onClick={()=>handleImage(1)}>
                <span className="text-5xl">1</span>
              </button>
              </div>
              
              <div className="rounded-lg h-20 w-20 bg-gray-100 mb-4">
              <button className='rounded-lg h-20 w-20' onClick={()=>handleImage(2)}>
                <span className="text-5xl">2</span>
              </button>
              </div>

              <div className=" rounded-lg h-20 w-20 bg-gray-100 mb-4">
              <button className='rounded-lg h-20 w-20' onClick={()=>handleImage(3)}>
                <span className="text-5xl">3</span>
              </button>
              </div>

              <div className=" rounded-lg h-20 w-20 bg-gray-100 mb-4">
              <button className='rounded-lg h-20 w-20' onClick={()=>handleImage(4)}>
                <span className="text-5xl">4</span>
              </button>
              </div>
            </div>
            <div className="relative h-100 w-3/4 rounded-lg bg-gray-100 mb-4">
            <span className="text-5xl h-full w-full rounded-md object-cover max-w-lg mx-auto">
              {
                jsxelement
              }            
              </span>
              <div className='absolute right-0 top-1/2'>
                  <button onClick={handleRightArrow} 
                  className='bold text-xl text-purple-600'>
                    <HiChevronRight/>
                  </button>
              </div>
              <div className='absolute left-0 top-1/2'>
                
              <button onClick={handleLeftArrow} 
                  className='bold text-xl text-purple-600'>
                    <HiChevronLeft/>
                  </button>
              </div>
            </div>
            
          </div>

          <div className="flex -mx-2 mb-4">
        
              {/* <div className="flex-1 px-2">
                <button x-on:click="image = i" :className="{ 'ring-2 ring-indigo-300 ring-inset': image === i }" className="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                  <span x-text="i" className="text-2xl"></span>
                </button>
              </div> */}
            {/* </template> */}
          </div>
        </div>
      </div>
      <div className="md:flex-1 px-4">
        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">Lorem ipsum dolor, sit amet consectetur, adipisicing elit.</h2>
        <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">ABC Company</a></p>

        <div className="flex items-center space-x-4 my-4">
          <div>
            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
              <span className="text-indigo-400 mr-1 mt-1">$</span>
              <span className="font-bold text-indigo-600 text-3xl">25</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-green-500 text-xl font-semibold">Save 12%</p>
            <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
          </div>
        </div>

        <p className="text-gray-500">Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.</p>

        <div className="flex py-4 space-x-4">
          <div className="relative">
            <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
            <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>

            <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>

          <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default ViewItem;


// <div className="grid grid-rows-4 grid-flow-col gap-4 rounded-lg mb-4">
//             <div className="rounded-lg h-20 w-20 bg-gray-100 mb-4">
//               <span className="text-5xl">1</span>
//             </div>

//             <div className="rounded-lg h-20 w-20 bg-gray-100 mb-4">
//               <span className="text-5xl">2</span>
//             </div>

//             <div className=" rounded-lg h-20 w-20 bg-gray-100 mb-4">
//               <span className="text-5xl">3</span>
//             </div>
//             <div className=" rounded-lg h-20 w-20 bg-gray-100 mb-4">
//               <span className="text-5xl">4</span>
//             </div>
//             <div className="row-span-4 rounded-lg bg-gray-100 mb-4">
//               <span className="text-5xl">4</span>
//             </div>
//           </div>