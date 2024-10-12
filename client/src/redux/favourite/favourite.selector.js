import { createSelector } from 'reselect';

//input selector which related to only cart
const selectFavourite = (state)=> state;
//output for collection
export const selectCollection  = createSelector(
    [selectFavourite],
    state => state.shop.collection
) 
// output selector favourite items id
export const selectFavouriteItem = createSelector(
    [selectFavourite],
    state=>state.favourite
)
// output selector for getting favourite items
export const selectingFavouriteCollection = createSelector(
    [selectCollection],
    collection=> Object.keys(collection).map(key=>collection[key]).map(item=>item.items)
)