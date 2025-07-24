// src/components/AccessoriesPage.jsx
import React from 'react';
import { products } from '../data/products'; // Adjust the path if necessary
const AccessoriesPage = () => {
  // Filter the products to get only accessories
  const accessories = products.filter(product => product.category === 'accessories');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accessories</h1>
      <div className="gp-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="border p-4 rounded shadow">
            <img src={accessory.image} alt={accessory.name} className="mb-2 w-full h-32 object-cover" />
            <h2 className="text-lg font-semibold">{accessory.name}</h2>
            <p className="text-gray-700">{accessory.description}</p>
            <p className="font-bold">${accessory.price}</p>
            <button className="mt-2 bg-blue-400 text-white p-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AccessoriesPage;