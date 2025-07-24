// src/components/Wishlist.jsx
import { useContext, useState } from 'react';
import { WishlistContext } from './WishlistContext';
import { CartContext } from './CartContext';
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [loadingMessage, setLoadingMessage] = useState(''); // State for loading message
  const handleAddToCart = (item) => {
    setLoadingMessage(`Adding to your cart...`);
    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      addToCart(item); // Add to cart functionality
      setLoadingMessage(`"${item.name}" has been added to your cart!`); // Set success message
      // Clear the message after 3 seconds
      setTimeout(() => {
        setLoadingMessage('');
      }, 3000);
    }, 1000); // Simulate a delay of 1 second
  };
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Wishlist</h2>
      {/* Success Alert */}
      {loadingMessage && (
        <div className="fixed top-10 right-10 z-50 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-md transition-all duration-300 transform scale-100 opacity-100">
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
            <span className="font-medium">{loadingMessage}</span>
          </div>
        </div>
      )}
      {wishlist.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-700">${item.price}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-600 text-white font-semibold py-1 px-3 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Wishlist;