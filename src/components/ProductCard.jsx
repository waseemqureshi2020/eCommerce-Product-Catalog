import React, { useState } from 'react';

function ProductCard({ product, addToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Revert button after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button 
          onClick={handleAddClick} 
          className={isAdded ? 'added' : ''}
          disabled={isAdded}
        >
          {isAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;