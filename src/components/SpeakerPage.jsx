
import React from 'react';
import { products } from '../data/products'; // Adjust the path as needed
import { useCart } from './CartContext';// Assumes you have a CartContext implemented
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Initialize react-toastify only once in your app (e.g., in App.jsx)
// import { ToastContainer } from 'react-toastify';
// <ToastContainer />
const SpeakerPage = () => {
  // Get addToCart from your global CartContext
  const { addToCart } = useCart();
  // Filter products to retain only those that are speakers.
  // Products are considered speakers if their category is "audio" or their name includes "Speaker".
  const speakers = products.filter(product =>
    product.category === 'audio' || product.name.toLowerCase().includes('speaker')
  );
  // Handler when "Add to Cart" button is clicked
  const handleAddToCart = (speaker) => {
    addToCart(speaker);
    toast.success(`${speaker.name} has been added to your cart!`);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Speakers</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="border p-4 rounded shadow flex flex-col">
            <img
              src={speaker.image}
              alt={speaker.name}
              className="mb-2 w-full h-36 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{speaker.name}</h2>
            <p className="text-gray-700 flex-grow">{speaker.description}</p>
            <p className="font-bold mt-2">${speaker.price}</p>
            <button
              onClick={() => handleAddToCart(speaker)}
              className="mt-2 bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SpeakerPage;