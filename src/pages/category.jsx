import { useState, useEffect } from "react";
import {
	useParams
  } from "react-router-dom";


const Category = () => {

	const [products, setProducts] = useState([])
	const [prevCat, setPrevCat] = useState("")

	var { id } = useParams();
	
	useEffect(() => {
	
		fetchCategoryProducts(id)
	
	},[id]);
	
	const fetchCategoryProducts = (category) =>{
		fetch(`https://fakestoreapi.com/products/category/${category}`)
		.then(response => {
		  if (response.ok) {
			return response.json()
		  } else if (response.status === 404) {
			return Promise.reject('error 404')
		  } else {
			return Promise.reject('some other error: ' + response.status)
		  }
		})
		.then(response => {
		  setProducts(response)
		  setPrevCat(category)
		});
	}  
	
	return (
	  <>
		<p>
		  <strong>Category: {id} </strong>		 
		  {
			  id === prevCat && products.length > 0 ? 
			  products.map((product)=>{
				return <h2> {product.title} </h2>
				}) : <h2>Loading...</h2>
		  }
		</p>
		
	  </>
	);
  };

  export default Category;