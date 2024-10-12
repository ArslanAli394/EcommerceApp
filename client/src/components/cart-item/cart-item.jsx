import React from 'react';
import { addItem, clearItemFromCart, removeItemFromCart } from '../../redux/cart/cart.action';
import { connect } from 'react-redux';


const CartItem =({item,addItemQty,removeItem,clearItem})=>{
    let {imageUrl,name,price,quantity} = item;
    return(
        <div class='w-64 left-10'>
<div class="flex justify-between mt-2 mx-5">
<div class="flex">
    <img class="h-20 w-20 object-cover rounded" src={imageUrl} alt={name}/>
    <div class="mx-3">
        <h3 class="text-sm font-bold text-purple-600">{name}</h3>
        <div class="flex items-center mt-2">
            <button class="text-gray-500 focus:outline-none focus:text-gray-600" 
            onClick={()=>addItemQty(item)}
            >
                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <span class="text-gray-700 mx-2">{quantity}</span>
            <button class="text-gray-500 focus:outline-none focus:text-gray-600"
             onClick={()=>removeItem(item)}
             >
                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>
    </div>
</div>
{/* <div class="text-gray-600 ml-10">{price}</div> */}
{/* <div class="text-gray-600 ml-18">{quantity*price}</div> */}
    <div class="text-red-600 ml-20 cursor-pointer" 
    onClick={()=>clearItem(item)}
    ><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>
    </div>
    </div>
    )
} 
const mapDispatchToProps = dispatch=>({
    clearItem: item =>dispatch(clearItemFromCart(item)),
    removeItem: item =>dispatch(removeItemFromCart(item)),
    addItemQty: item =>dispatch(addItem(item))

})
export default connect(null,mapDispatchToProps)(CartItem);