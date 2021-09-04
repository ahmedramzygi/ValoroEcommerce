
import React,{useState,useEffect} from 'react'
import {commerce }from './lib/commerce'
import{Navbar} from './components'

const App = () => {
  const [products,setProducts]=useState([]);
  const fetchProducts=async()=>{
    const response =await commerce.products.list()// Promise products fetched from API
  }
  return ( 
    <div>
      <Navbar/>
      
    </div>
   );
}
 
export default App;
