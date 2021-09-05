
import React,{useState,useEffect} from 'react'
import {commerce }from './lib/commerce'
import{Products,Navbar, Cart} from './components'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'


const App = () => {
  const [products,setProducts]=useState([]);

  
  //Cart
  const [cart,setCart]=useState({});

  const fetchCarts=async()=>{
    setCart(await commerce.cart.retrieve())
  }


  const fetchProducts=async()=>{
    const {data} =await commerce.products.list()// Promise products fetched from API
    setProducts(data)
  }

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

  useEffect(()=>{
    fetchProducts();
    fetchCarts();
  },[])//Gets rendered first time only
    console.log(cart);

  return ( 
    <Router>
    <div>
      <Navbar totalItems = {cart.total_items}/>
      <Switch>

        <Route exact path = "/">
          <Products products={products} addCart = {AddtoCart}/> 
        </Route>

        <Route exact path = "/cart">
           <Cart cart = {cart}/> 
        </Route>

      </Switch>
      
    </div>
    </Router>
   );
}
 
export default App;
