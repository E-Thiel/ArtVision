import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/HomePage/components/Header/Header.jsx";
import Home from "./pages/HomePage/Home.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Cart from './pages/Cart/Cart.jsx';


const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};

createRoot(document.getElementById("root")).render(<App />);