
import React,{useState,useEffect} from 'react'
import {commerce }from './lib/commerce'
import{ Products,Navbar, Cart, Checkout } from './components'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';


const App = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products,setProducts]=useState([]);


  //Cart
  const [cart,setCart]=useState({});
  //Checkout
  const [order, setOrder] = useState({});
  const {errorMessage, setErrorMessage} = useState({});

  // Promise products fetched from API
  const fetchProducts=async()=>{
    const {data} =await commerce.products.list()
    setProducts(data)
  }
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
  },[])//Gets rendered first time only
  

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return ( 
    <Router>
    <div style={{ display: 'flex' }}>
        <CssBaseline />
      <Navbar totalItems = {cart.total_items} handleDrawerToggle={handleDrawerToggle} />
      <Switch>
        <Route exact path = "/">
          <Products products={products} addCart = {AddtoCart}/> 
        </Route>

        <Route exact path = "/cart">
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
