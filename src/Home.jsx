import React, { useEffect, useState } from "react";
import { getProducts } from "./api/products";

function Home() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        const data = await getProducts(); 
        setProducts(data); 
      };
  
      fetchProducts(); 
    }, []);
  
    return (
      <div>
        <h1>Home</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>{product.material}</p>
              <p>{product.surface}</p>
              <p>{product.size}</p>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Home;
