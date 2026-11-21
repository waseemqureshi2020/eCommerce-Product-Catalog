import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Import Checkout
import { products } from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  
  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Add to Cart with Toast
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    
    // Hide toast after 2.5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  let filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  if (sortOrder === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartItems.length} />
        
        {/* Toast Notification */}
        <div className={`toast ${showToast ? 'show' : ''}`}>
          <span className="toast-icon">✓</span> {toastMessage}
        </div>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <div className="controls">
                  <div className="filter-group">
                    <label>Category: </label>
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option value="All">All</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Home">Home</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Sort by: </label>
                    <select onChange={(e) => setSortOrder(e.target.value)}>
                      <option value="default">Default</option>
                      <option value="low-high">Price: Low to High</option>
                      <option value="high-low">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      addToCart={addToCart} 
                    />
                  ))}
                </div>
              </>
            } />
            
            <Route path="/cart" element={
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            } />

            {/* New Checkout Route */}
            <Route path="/checkout" element={
              <Checkout cartItems={cartItems} clearCart={clearCart} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;