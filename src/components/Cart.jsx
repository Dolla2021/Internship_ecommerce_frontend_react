// src/components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);

  const updateQuantity = (productId, selectedColor, delta) => {
    const item = cart.find(
      (item) => item.id === productId && item.selectedColor === selectedColor
    );
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor);
    } else {
      updateCartQuantity(productId, selectedColor, newQuantity);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedColor}`}
              className="flex items-center gap-4 bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.name}{' '}
                  {item.selectedColor && `(${item.selectedColor})`}
                </h3>
                <p className="text-gray-700">
                  ${parseFloat(item.price).toFixed(2)}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedColor, -1)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedColor, 1)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  removeFromCart(item.id, item.selectedColor)
                }
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <p className="font-semibold text-lg">
              Subtotal: $
              {cart
                .reduce(
                  (total, item) =>
                    total + item.quantity * parseFloat(item.price),
                  0
                )
                .toFixed(2)}
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          
            <Link to="/checkout" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Proceed to Checkout
            </Link> 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
