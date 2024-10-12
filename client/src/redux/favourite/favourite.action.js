import favouriteTypes from './favourite.types';
// from shop 
export const addFavouriteItem = ( id ) =>{
    return {
        type: favouriteTypes.ADD_FAVOURITE_ITEM,
        payload: id
    }
}

export const selectWishListItem = () =>{
    return {
        type : favouriteTypes.FIND_FAVOURITE_ITEM,
    }
}

// wishlist quantity change 
export const addItemWishlist = item =>{
    return {
        type:favouriteTypes.ADD_WISHLIST_ITEM,
        payload: item
    }
}

export const clearItemFromWishlist = item =>{
    return{
        type:favouriteTypes.CLEAR_WISHLIST,
        payload:item
    }
}
// for decrese quantity
export const removeItemFromWishlist = item =>{
    return{
        type:favouriteTypes.REMOVE_FAVOURITE_ITEM,
        payload:item
    }
}
