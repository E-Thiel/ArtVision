import React, { useEffect, useState } from "react";
import { useFilters } from "../../Home.jsx";
import { getAll, getFilteredItems, addToCartServer } from "../../../../api/fetch.js";
import { useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
  const { filters } = useFilters();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const hasServerFilters =
            (filters?.selectedMaterials && filters.selectedMaterials.length > 0) ||
            (filters?.selectedSurfaces && filters.selectedSurfaces.length > 0) ||
            (filters?.selectedSizes && filters.selectedSizes.length > 0) ||
            (filters?.priceRange &&
                (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000));

        if (!hasServerFilters) {
          const data = await getAll();
          setProducts(data);
        } else {
          const bodyForFilter = {
            materials: filters.selectedMaterials || [],
            surfaces: filters.selectedSurfaces || [],
            dimensions: filters.selectedSizes || [],
            prices: {
              min: filters.priceRange ? filters.priceRange[0] : 0,
              max: filters.priceRange ? filters.priceRange[1] : 1000,
            },
          };
          const data = await getFilteredItems(bodyForFilter);
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, [filters]);

  const filteredProducts = React.useMemo(() => {
    if (!filters?.searchQuery) {
      return products;
    }
    const searchLower = filters.searchQuery.toLowerCase();
    return products.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(searchLower);
      const descMatch = product.description?.toLowerCase().includes(searchLower);
      return titleMatch || descMatch;
    });
  }, [products, filters]);

  const truncateDescription = (desc) => {
    if (!desc) return "";
    return desc.length > 64 ? desc.slice(0, 64) + "..." : desc;
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      existingCartItems.push({
        id_painting: product.id,
        price: product.price,
        title: product.title,
        share_path: product.share_path,
      });
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
      alert("Item added to cart (LocalStorage)");
    } else {
      try {
        const res = await addToCartServer(product.id, product.price);
        alert("Item added to cart (Server)");
      } catch (err) {
        console.error("Error adding to cart:", err.message);
        alert("Failed to add to cart");
      }
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
                <div
                    className="product-card"
                    key={product.id}
                    style={{ cursor: "pointer" }}
                >
                  <div
                      className="product-image"
                      onClick={() => handleProductClick(product.id)}
                  >
                    <img src={product.share_path} alt={product.title} />
                  </div>
                  <div className="product-info" onClick={() => handleProductClick(product.id)}>
                    <h3>{product.title}</h3>
                    <p>{truncateDescription(product.description)}</p>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
            ))
        ) : (
            <p>No products found</p>
        )}
      </div>
  );
}

export default Product;
