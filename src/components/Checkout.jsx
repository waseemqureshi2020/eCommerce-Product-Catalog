import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  // If cart is empty and not successful, go back to shop
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn">Go to Shop</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart(); // Empty the cart after successful order
  };

  if (isSuccess) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with ShopReact. Your order is being processed.</p>
        <button onClick={() => navigate('/')} className="btn">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-form-section">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <input type="text" required placeholder="123 Main St, City, Country" />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="text" required placeholder="MM/YY" maxLength="5" />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="password" required placeholder="123" maxLength="3" />
            </div>
          </div>
          <button type="submit" className="pay-btn">Pay ${total.toFixed(2)}</button>
        </form>
      </div>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="summary-items">
          {cartItems.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.image} {item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <h3>Total</h3>
          <h3>${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Checkout;