// src/components/CameraPage.jsx
import React from 'react';
import { products } from '../data/products'; // Adjust the path if necessary
import { useCart } from './CartContext'; // Import the Cart Context
const CameraPage = () => {
  const { addToCart } = useCart(); // Get the addToCart function from context
  // Filter the products to get only cameras
  const cameras = products.filter(product => product.category === 'electronics' && product.name.includes('Camera'));
  const handleAddToCart = (camera) => {
    const newItem = {
      ...camera,
      selectedColor: 'black', // Example color, adjust as necessary
      quantity: 1 // Default quantity
    };
    addToCart(newItem);
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cameras</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <div key={camera.id} className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
            <img src={camera.image} alt={camera.name} className="h-40 w-full object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{camera.name}</h2>
            <p className="text-gray-700">{camera.description}</p>
            <p className="font-bold">${camera.price}</p>
            <button 
              onClick={() => handleAddToCart(camera)}
              className="mt-2 bg-blue-600 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CameraPage;