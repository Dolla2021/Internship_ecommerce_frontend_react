// src/components/ProductDetail.jsx
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { products } from '../data/products';
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  // Find product from centralized data
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div className="p-6 max-w-6xl mx-auto">Product not found</div>;
  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor: product.colors?.find((c) => c.id === selectedColor)?.label || null,
    });
    setSuccessMessage(` has been added to your cart!`); // Set success message
    setTimeout(() => {
      setSuccessMessage(''); // Clear the message after 3 seconds
    }, 3000);
    navigate('/cart'); // Navigate to cart after adding product 
  };
  const handleAddToWishlist = () => {
    addToWishlist({
      ...product,
      selectedColor: product.colors?.find((c) => c.id === selectedColor)?.label || null,
    });
    setSuccessMessage(` has been added to your wishlist!`); // Set success message
    setTimeout(() => {
      setSuccessMessage(''); // Clear the message after 3 seconds
    }, 3000);
  };
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-xl">
      {/* Left: Image Section */}
      <div className="p-6 rounded-xl flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-sm object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      {/* Right: Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {product.name}
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full ml-2">NEW</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1 capitalize">{product.category}</p>
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700">Product Info</h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          </div>
          {product.colors && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700">Color</h3>
              <div className="flex items-center gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color.id ? 'ring-2 ring-indigo-600' : 'ring-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.label || color.id}
                    aria-label={`Select ${color.label || color.id} color`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart} // Call the new function
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
              aria-label={`Add ${product.name} to cart`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16 11V3a1 1 0 00-1-1H5a1 1 0 00-1 1v8H2l1 9h14l1-9h-2zM6 4h8v7H6V4z" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist} // Call the new function
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md hover:bg-gray-300 transition"
              aria-label={`Add ${product.name} to wishlist`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              Add to Wishlist
            </button>
          </div>
          <span className="text-2xl font-bold text-gray-800">${product.price}</span>
        </div>
      </div>
      {/* Success Message Alert */}
      {successMessage && (
        <div className="fixed top-10 right-10 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md transition-all duration-300">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;