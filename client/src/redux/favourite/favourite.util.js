// add fovourtie item id
export const addFavouriteProduct = (items,id) =>{
    const existFavouriteItem = items.find(
        item=> item === id
        )
    if(existFavouriteItem){
        return items;
    }
    return [...items,id]
}
// find wishlist item by favoruite id
export const findWishListItems = ( favouriteId, collections) =>{
    const wishlistItems = [];
    if(favouriteId.length  === 0){
        return wishlistItems;
    }else{
        Object.keys(collections).map(key=>collections[key]).map(item =>{
            item.items.find(obj =>{
                favouriteId.map(fd =>{
                    if(obj.id === fd ){
                        obj.quantity = 1
                        wishlistItems.push(obj)
                    }
                })
            })
        });
        return wishlistItems;
    }

}
// increment in wishlist item
export const addItemToWishlist = (wishlistItems,wishlistAddItem)=>{
    
    const existingWishlist = wishlistItems.find(
        wishItem=> wishItem.id === wishlistAddItem.id
        )
    if(existingWishlist){
        return wishlistItems.map(
            wishItem=> wishItem.id === wishlistAddItem.id ?
            {...wishItem,quantity:wishItem.quantity+1}:wishItem
        )
    }
    return [...wishlistItems,{...wishlistAddItem,quantity:1}]
}
// decrement in wishlist item
export const removeItemToWishlist = (wishlistItems,wishlistRemoveItem)=>{
    const existingWishlist = wishlistItems.find(
        wishlistItem=> wishlistItem.id === wishlistRemoveItem.id
        )
    if(existingWishlist.quantity === 1){
        return wishlistItems.filter(wishlistItem => wishlistItem.id !== wishlistRemoveItem.id)
    }
    return wishlistItems.map( wishlistItem =>
        wishlistItem.id === wishlistRemoveItem.id ?
        { ...wishlistItem, quantity:wishlistItem.quantity-1}:
        wishlistItem
        )
}