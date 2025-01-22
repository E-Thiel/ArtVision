import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewCartServer, getAll } from "../api/fetch";
import "./Cart.css";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthorized(true);

            localStorage.removeItem("cartItems");

            loadCartFromServer();
        } else {
            setIsAuthorized(false);
            loadCartFromLocalStorage();
        }
    }, []);

    const loadCartFromServer = async () => {
        try {
            const serverCartData = await viewCartServer();
            const allProducts = await getAll();

            const productsMap = new Map();
            allProducts.forEach((prod) => {
                productsMap.set(prod.id, prod);
            });

            const mergedCartItems = serverCartData.map((item) => {
                const product = productsMap.get(item.id_painting);
                return {
                    ...item,
                    share_path: product?.share_path || null,
                };
            });

            setCartItems(mergedCartItems);
        } catch (error) {
            console.error("Error fetching cart from server:", error.message);
        }
    };

    const loadCartFromLocalStorage = () => {
        const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(localCart);
    };

    const handleItemClick = (item) => {
        const paintingId = item.id_painting || item.id;
        if (paintingId) {
            navigate(`/product/${paintingId}`);
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty</p>
            ) : (
                <div className="cart-grid">
                    {cartItems.map((item, index) => {
                        const imageUrl = item.share_path || item.image || "/images/no-image.png";
                        const itemTitle = item.title || "Untitled";
                        const itemPrice = item.price || 0;

                        return (
                            <div
                                key={index}
                                className="cart-card"
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="cart-card-image">
                                    <img src={imageUrl} alt={itemTitle} />
                                </div>
                                <div className="cart-card-info">
                                    <h2>{itemTitle}</h2>
                                    <p className="cart-card-price">${itemPrice}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Cart;
