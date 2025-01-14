import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import "./Product.css";

function Product({ filters }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(); // api
      setProducts(data);
      setFilteredProducts(data); 
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!filters) return; 

    const {
      priceRange = [0, Infinity],
      selectedSizes = [],
      selectedMaterials = [],
      selectedSurfaces = [],
    } = filters;

    // apply filters
    const filtered = products.filter((product) => {
      return (
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedSizes.length === 0 || selectedSizes.includes(product.size)) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(product.material)) &&
        (selectedSurfaces.length === 0 || selectedSurfaces.includes(product.surface))
      );
    });

    setFilteredProducts(filtered); // update filters
  }, [filters, products]);

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <button className="add-to-cart">Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
