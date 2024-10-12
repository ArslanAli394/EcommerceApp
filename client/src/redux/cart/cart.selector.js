import { createSelector } from 'reselect';

//input selector which related to only cart
const selectCart = (state)=> state.cart;

// output selector which recieve the input selector for cartitems
export const selectCartItems = createSelector(
    [selectCart],
    cart=>cart.cartItems
)

//output selctor for cart hidden 
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)
//output for selector for cartitem count

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce((acumulatedQty,cartItem)=>acumulatedQty+cartItem.quantity,0) 
)
// output selector for total of cartitems 
export const selectCartItemTotal = createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce((acumulatedQty,cartItem)=>acumulatedQty+cartItem.quantity*cartItem.price,0) 
)


