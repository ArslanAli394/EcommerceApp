import cartType from "./cart.types"

export const cartHidden = ()=>{
    return{
        type:cartType.SET_HIDDEN_CART
    }
}
export const addItem = item =>{
    return {
        type:cartType.ADD_ITEM,
        payload: item
    }
}

export const clearItemFromCart = item =>{
    return{
        type:cartType.CLEAR_ITEM_FROM_CART,
        payload:item
    }
}
// for decrese quantity
export const removeItemFromCart = item =>{
    return{
        type:cartType.REMOVE_ITEM_FROM_CART,
        payload:item
    }
}