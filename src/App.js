
import React,{useState,useEffect} from 'react'
import "./App.css"
import {commerce }from './lib/commerce'
import{ Products,Navbar, Cart, Checkout } from './components'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';
import fire from './components/Login/fire'
import Login from './components/Login/login';
import { Redirect } from 'react-router';

const App = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products,setProducts]=useState([]);
//Login and sign up
const [user,setUser]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [emailError,setEmailError]=useState('')
const [passwordError,setPasswordError]=useState('')
const [hasAccount,setHasAccount]=useState(false)

const clearInputs=()=>{
  setEmail('');
  setPassword('');

}
const clearErrors=()=>{
  setEmailError('');
  setPasswordError('');
}
const handleLogin=()=>{
  clearErrors()
    fire
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err=>{
          switch(err.code)
          {
            case"auth/invalid-email":
            case"auth/user-disabled":
            case"auth/user-not-found":
              setEmailError(err.message);
              break;
            case"auth/wrong-password":
              setPasswordError(err.message);
              break;



          }
        })
}
const handleSignup=()=>{
  clearErrors();
  fire
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err=>{
          switch(err.code)
          {
            case"auth/email-already-in-use":
            case"auth/invalid-email":
              setEmailError(err.message);
              break;
            case"auth/weak-password":
              setPasswordError(err.message);
              break; 
          }
        })
}
const handleLogout=()=>{
  fire.auth().signOut()
}
const authListener=()=>{
  fire.auth().onAuthStateChanged((user)=>{
    if(user){
      clearInputs();
      setUser(user);
    }
    else{
      setUser("");
    }
  });
}

  // Promise products fetched from API
  const fetchProducts=async()=>{
    const {data} =await commerce.products.list()
    setProducts(data)
  }
  //Cart
  const [cart,setCart]=useState({});
  
// Promise function to fetch cart from API
  const fetchCarts=async()=>{
    setCart(await commerce.cart.retrieve())
  }
// Promise function to add products with quantity to cart using the API
  const AddtoCart = async (productId, quant) => {
    const item = await commerce.cart.add(productId, quant);
    setCart(item.cart);
  }

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }
//Checkout
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder)

      setOrder(incomingOrder);
      refreshCart();
    }
    catch (error){
      setErrorMessage(error.data.error.message);
  }
}

//----------------------------------------------
  useEffect(()=>{
    fetchProducts();
    fetchCarts();
    authListener();
  },[])//Gets rendered first time only


    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return ( 
    <Router>
    <div style={{ display: 'flex' }}>
        <CssBaseline />

      <Switch>
        <Route exact path = "/">
          <div className="App">
          {user?( <Redirect to='/products' />):(<Login 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
              />)}
          </div>         
        </Route>
        <Route exact path = "/products">
          <Navbar handleLogout={handleLogout} totalItems = {cart.total_items} handleDrawerToggle={handleDrawerToggle} />
          <Products products={products} addCart = {AddtoCart}/> 
        </Route>       
        <Route exact path = "/cart">
        <Navbar handleLogout={handleLogout} totalItems = {cart.total_items} handleDrawerToggle={handleDrawerToggle} />
           <Cart
            cart = {cart}
            handleUpdateCartQty = {handleUpdateCartQty}
            handleRemoveFromCart = {handleRemoveFromCart}
            handleEmptyCart = {handleEmptyCart}
            /> 
        </Route>
        <Route exact path="/checkout">
        <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
    </div>
    </Router>
   );
};
 
export default App;
