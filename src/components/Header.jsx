import React, { useEffect, useState } from "react";
import "./Header.css";

function Header() {

////////////////////////////////////////////////////////////////////
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
////////////////////////////////////////////////////////////////////

  return (
    <header className="header">
      <div className="header-conainer">
        <div className="navbar-left">
            {/*---------------ArtVision Logo---------------*/}
          <div className="header-logo">
            <a href="#">Art<span className="highlight">Vision</span></a>
          </div>

          {/*---------------Links---------------*/}
          <ul className="nav-links">
            <li className="nav-link"><img src="/svg/header/Home.svg" alt="home" />Home</li> 
            <li className="nav-link">
              <img src="/svg/header/About.svg" alt="about" />About
            </li>
            <li className="nav-link">
              <img src="/svg/header/Support.svg" alt="support" />Support
            </li>
          </ul>
        </div>
        
        {/*---------------Other Links---------------*/}

        <div className="header-actions">
          {isAuthenticated ? (
            <div className="login-actions">
              <a href="#" className="cart-icon"><img src="/svg/header/Shopping Cart.svg" alt="home" /></a>
              <a href="#" className="menu-icon">☰</a>
              <span onClick={handleLogout} className="profile-icon">⚪</span>
            </div>
          ) : (
            <div className="not-login-actions">
              <a href="#" className="cart-icon"><img src="/svg/header/Shopping Cart.svg" alt="home" /></a>
              <button onClick={handleLogin} className="login-btn" >Sign In</button>
              <button onClick={handleLogin} className="reg-btn">Register</button>
            </div>
          )}
        </div>
      </div>
      
    </header>
  );
}


  
  export default Header;