
import React,{useState,useEffect} from 'react'
import {commerce }from './lib/commerce'
import{Products,Navbar} from './components'


const App = () => {
  const [products,setProducts]=useState([]);
  const fetchProducts=async()=>{
    const {data} =await commerce.products.list()// Promise products fetched from API
    setProducts(data)
  }

  useEffect(()=>{
    fetchProducts();
  },[])//Gets rendered first time only
console.log(products)

  return ( 
    <div>
      <Navbar/>
      <Products products={products}/>
      <Navbar />
      <Navbar nav />
    </div>
   );
}
 
export default App;
