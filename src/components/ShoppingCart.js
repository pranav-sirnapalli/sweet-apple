
import React, { useState } from 'react';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const placeOrder = () => {
    
    fetch('https://sweet-apple-acres.netlify.app/.netlify/functions/api/orders', {
      method: 'POST',
      body: JSON.stringify(cartItems),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order placed successfully:', data);
        setCartItems([]);
      });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={placeOrder}>Place Order</button>
      )}
    </div>
  );
}

export default ShoppingCart;


