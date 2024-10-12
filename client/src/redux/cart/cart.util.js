export const addItemToCart = (cartItems,cartAddItem)=>{
    console.log(cartAddItem)
    const existingCart = cartItems.find(
        cartItem=> cartItem.id === cartAddItem.id
        )
    if(existingCart){
        
        return cartItems.map(
            cartItem=> cartItem.id === cartAddItem.id ?
            {...cartItem,quantity:cartItem.quantity+1}:cartItem
        )
    }
    return [...cartItems,{...cartAddItem,quantity:1}]
}

export const removeItemToCart = (cartItems,cartRemoveItem)=>{
    const existingCart = cartItems.find(
        cartItem=> cartItem.id === cartRemoveItem.id
        )
    if(existingCart.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartRemoveItem.id)
    }
    return cartItems.map( cartItem =>
        cartItem.id === cartRemoveItem.id ?
        { ...cartItem, quantity:cartItem.quantity-1}:
        cartItem
        )
}