import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [message, setMessage] = useState('');
  const [shipping, setShipping] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const newSubtotal = cart.reduce((total, item) =>
      total + (parseFloat(item.price) * item.quantity), 0
    );
    setSubtotal(newSubtotal);
  }, [cart]);

  const updateQuantity = (productId, selectedColor, delta) => {
    const item = cart.find(item => item.id === productId && item.selectedColor === selectedColor);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor);
      setMessage(`${item.name} has been removed from your cart`);
    } else {
      updateCartQuantity(productId, selectedColor, newQuantity);
      setMessage(`${item.name} quantity updated to ${newQuantity}`);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const totalCost = (subtotal - discount + shipping).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedColor)}
                      className="text-sm text-red-600 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedColor, -1)}
                    className="px-3 py-1 bg-gray-300 text-black rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedColor, 1)}
                    className="px-3 py-1 bg-gray-300 text-black rounded"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">${parseFloat(item.price).toFixed(2)}</p>
                  <p className="font-bold text-gray-900">${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <Link to="/" className="text-purple-600 hover:underline text-sm">← Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit">
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>Items {cart.length}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">Shipping</label>
          <select
            value={shipping}
            onChange={(e) => setShipping(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="5">Standard Delivery – $5.00</option>
            <option value="0">Free Shipping – $0.00</option>
            <option value="10">Express Delivery – $10.00</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">Promo Code</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border p-2 rounded-l"
            />
            <button
              onClick={() => setDiscount(10)}
              className="bg-red-500 text-white px-4 rounded-r hover:bg-red-600 transition"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="flex justify-between text-base font-semibold border-t pt-4 mb-4">
          <span>Total Cost</span>
          <span>${totalCost}</span>
        </div>
        <Link
          to="/checkout"
          className="block bg-purple-600 text-white text-center py-3 rounded hover:bg-purple-700 transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
