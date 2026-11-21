import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🛒 ShopReact</Link>
      <div className="nav-links">
        <Link to="/">Shop</Link>
        <Link to="/cart" className="cart-link">
          Cart <span className="cart-badge">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;