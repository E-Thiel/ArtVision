import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/HomePage/components/Header/Header.jsx";
import Home from "./pages/HomePage/Home.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Cart from './pages/Cart/Cart.jsx';
import Signin from './pages/Authorisation/sign-in.jsx'
import Register from './pages/Authorisation/register.jsx'
import About from './pages/About/About.jsx'

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/sign-in" element={<Signin />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/about" element={<About />}/>
            </Routes>
        </Router>
    );
};

createRoot(document.getElementById("root")).render(<App />);