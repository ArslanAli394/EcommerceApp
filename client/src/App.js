import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//actions
import { setCurrentUser } from "./redux/user/user.action";
//pages
import HomePage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop-page/shop.component";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
//components
import Header from "./components/header/header";
import LazyLoadComponent from "./components/collection-item/product-image";
import { createStructuredSelector } from "reselect";
// import { selectCurrentUser } from './redux/user/user.selector';
import CheckOutPage from "./pages/checkoutpage/checkOutPage";
import ShopTwoPic from "./pages/shop-page/shopTwoPic.component";
import CartItem from "./components/cart-item/cart-item";
import Navbar from "./components/navbar/navbar";
import ViewItem from "./components/view-item/view-item";
import ViewItem1 from "./components/view-item/view-item1";
import ViewItem2 from "./components/view-item/view-item2";
import Collage from "./components/view-item/collage";
import BlackScroll from "./components/black-scroll/black-scroll";
import WishListPage from "./pages/wishlistPage/wishlistPage";
import AppObs from "./AppObs";
import InfiniteScrollComp from "./components/collection-page/infinite-Scroll";
import collectionPageWithSingleCategory from "./components/collection-page/collection-page-with-single-category";
import ProductForm from "./pages/products/create-product";
import ProductList from "./pages/products/products-list";

class App extends React.Component {
  
  unscribeFromAuth = null;

  componentDidMount() {
    //  this.unscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
    //    const  {setCurrentUser } = this.props;
    //     if(userAuth){
    //       const userRef = await createUserProfileDocument(userAuth);
    //       //check snapshot either user exist or not
    //       userRef.onSnapshot(snapShot=>{
    //           setCurrentUser({
    //             id:snapShot.id,
    //             ...snapShot.data()
    //           })
    //       })
    //     }else{
    //         setCurrentUser(userAuth)
    //     }
    //   })
  }
  componentWillUnmount() {
    // this.unscribeFromAuth();
  }
  render() {
    return (
      <div>
        {/* <Header currentUser={setCurrentUser}/> */}
        <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" {...this.props} component={Shop} />
          <Route path="/shoptwopic" component={ShopTwoPic} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route
            exact
            path="/signIn"
            component={SignIn}
            // render={ ()=> this.props.currentUser ? (<Redirect to='/'/>):(<SignIn/>)}
          />
          <Route path="/signUp" component={SignUp} />
          <Route path="/cart" component={CartItem} />
          <Route path="/view-item" component={ViewItem} />
          <Route path="/view-item1/:category/:_id" component={ViewItem1} />
          <Route path="/view-item2" component={ViewItem2} />
          <Route path="/scroll1" component={Collage} />
          <Route path="/blackscroll" component={BlackScroll} />
          <Route path="/whislist" component={WishListPage} />
          <Route path="/scroll" exact component={InfiniteScrollComp} />
          <Route path="/appobs" exact component={AppObs} />
          {/* products */}
          <Route path="/products" component={ProductList} />
          <Route path="/create-product" component={ProductForm} />
          {/* <Route path="/lazy" exact component={LazyLoadComponent} /> */}
          {/* <Route path="/shop/all/hats" exact component={collectionPageWithSingleCategory} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // currentUser : selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
