import React from 'react'
import { connect } from 'react-redux';
// use for multiple ouput selector without passing state bcz it auto get higher state
import { createStructuredSelector } from 'reselect'; 


import { ReactComponent as ShoppingIcon }  from '../../assests/shopping-bag.svg.svg';
import {cartHidden} from '../../redux/cart/cart.action';
import { selectCartItemCount } from '../../redux/cart/cart.selector';


const CartIcon =({cartHiddenSection,itemCount})=>{
    return <div className="relative flex-shrink-0 h-8 w-6 text-gray-400 group-hover:text-gray-500 cursor-pointer" onClick={cartHiddenSection}>
    <ShoppingIcon className="absolute w-6 h-6"/>
    <span className="absolute text-sm text-purple-800 text-bold top-1.5 left-2"> {itemCount} </span>
</div> 

}
const mapStateToProps = createStructuredSelector({
      itemCount:selectCartItemCount
})
const mapDispatchToProps = dispatch=>({
    cartHiddenSection: ()=>dispatch(cartHidden())
})
export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);


    