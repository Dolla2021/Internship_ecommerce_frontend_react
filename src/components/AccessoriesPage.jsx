import React from 'react';
import { products } from '../data/products';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
const AccessoriesPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  // Filter the products to get only accessories
  const accessories = products.filter(product => product.category === 'accessories');
  const handleAddToCart = (accessory) => {
    const newItem = {
      ...accessory,
      selectedColor: 'black', // Default color
      quantity: 1 // Default quantity
    };
    addToCart(newItem);
    navigate('/cart');
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
            <img 
              src={accessory.image} 
              alt={accessory.name} 
              className="w-full h-30 object-cover rounded mb-2" 
            />
            <h2 className="text-lg font-semibold">{accessory.name}</h2>
            <p className="text-gray-700 text-sm mb-2">{accessory.description}</p>
            <p className="font-bold text-lg mb-2">${accessory.price}</p>
            <button
              onClick={() => handleAddToCart(accessory)}
              className="w-full bg-purple-400 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AccessoriesPage;