// src/components/SpeakerPage.jsx
import React from 'react';
import { products } from '../data/products'; // Adjust the path if necessary
const SpeakerPage = () => {
  // Filter the products to get only speakers
  const speakers = products.filter(product => product.category === 'audio' || product.name.includes('Speaker'));
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Speakers</h1>
      <div className="p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="border p-4 rounded shadow">
            <img src={speaker.image} alt={speaker.name} className="mb-2 w-full h-36 object-cover" />
            <h2 className="text-lg font-semibold">{speaker.name}</h2>
            <p className="text-gray-700">{speaker.description}</p>
            <p className="font-bold">${speaker.price}</p>
            <button className="mt-2 bg-purple-600 text-white p-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SpeakerPage;