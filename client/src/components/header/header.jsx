import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../assests/crown.svg.svg";
import { connect } from 'react-redux';

import CartIcon from '../cart-icon/cart-icon'

//auth
// import {auth} from '../../firebase/firebase.util';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';


const Header =({currentUser,cartHidden})=>{
    return(
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class='flex justify-between items-center  py-4 md:justify-start md:space-x-10'>
             <div class='flex justify-start lg:w-0 lg:flex-1'>
                 <Link to='/'><Logo/></Link>
             </div>
             <div class='flex justify-end lg:w-0 lg:flex-1'>
                 <Link to='/shop' class='px-2'><span class='text-xl'>Shop</span></Link>
                 <Link><span class='text-xl px-2'>Contact</span></Link>
                 {
                     currentUser ?
                     <div style={{cursor:'pointer'}} 
                    //  sssonClick={()=> auth.signOut()}
                     >
                          <Link
                   to="#"
                   className=" flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                 >
                   SignOut
                 </Link>
                    </div>:
                     <Link
                     to="signIn"
                     className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                   >
                     Sign In
                   </Link>
                 }
                 <CartIcon/>
                 
             </div>


        </div>
        {
          cartHidden?null:
          <CartDropdown/>   
        }      
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartHidden: selectCartHidden
})
export default connect(mapStateToProps)(Header);





