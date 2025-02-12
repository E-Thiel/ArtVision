import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="navbar-left">
          {/*---------------ArtVision Logo---------------*/}
          <div className="header-logo">
            <Link to="/"><a href="#">Art<span className="highlight">Vision</span></a></Link>
          </div>

          {/*---------------Links---------------*/}
          <ul className="nav-links">
            <li className="nav-link">
              <Link to="/about">
                <img src="/svg/header/About.svg" alt="about" />
                About
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/support">
                <img src="/svg/header/Support.svg" alt="support" />
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/*---------------Other Links---------------*/}
        <div className="header-actions">
          {isAuthenticated ? (
            <div className="login-actions">
              <Link to="/cart" className="cart-icon">
                <img src="/svg/header/Shopping%20Cart.svg" alt="cart" />
              </Link>
              <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>
          ) : (
            location.pathname !== '/sign-in' && (
              <div className="not-login-actions">
                <Link to="/cart" className="cart-icon">
                  <img src="/svg/header/Shopping%20Cart.svg" alt="cart" />
                </Link>
                <Link to="/sign-in"><button onClick={handleLogin} className="login-btn">Sign In</button></Link>
                <Link to="/register"><button onClick={handleLogin} className="reg-btn">Register</button></Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;