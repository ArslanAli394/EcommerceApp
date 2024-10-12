import React from 'react';
import { connect } from 'react-redux';
import { addItem, clearItemFromCart, removeItemFromCart } from '../../redux/cart/cart.action';


const CheckOutItem = ({item,clearItem,removeItem, addItemQty}) =>{
    let {name,quantity,price,imageUrl} = item
    return (
        <div class="flex justify-between mt-6">
            <div class="flex">
                <img class="h-20 w-20 object-cover rounded" src={imageUrl} alt={name}/>
                <div class="mx-3">
                    <h3 class="text-sm text-gray-600">{name}</h3>
                    <div class="flex items-center mt-2">
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600" onClick={()=>addItemQty(item)}>
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span class="text-gray-700 mx-2">{quantity}</span>
                        <button class="text-gray-500 focus:outline-none focus:text-gray-600" onClick={()=>removeItem(item)}>
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="text-gray-600">{price}</div>
            <span class="text-gray-600">{quantity*price}</span>
            <div class="text-red-600 cursor-pointer" onClick={()=>clearItem(item)}>&#10005;</div>
        </div>
    )
}
const mapDispatchToProps = dispatch=>({
    clearItem: item =>dispatch(clearItemFromCart(item)),
    removeItem: item =>dispatch(removeItemFromCart(item)),
    addItemQty: item =>dispatch(addItem(item))

})
export default connect(null,mapDispatchToProps)(CheckOutItem);