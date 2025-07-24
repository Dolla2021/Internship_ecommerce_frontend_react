import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import PromoBanner from './Promobanner';
// src/components/ShopByCategory.jsx  
const ShopByCategory = () => {
  const categories = [
    { name: 'Watches', icon: 'https://via.placeholder.com/20' },
    { name: 'Headphones', icon: 'https://via.placeholder.com/20' },
    { name: 'Cameras', icon: 'https://via.placeholder.com/20' },
    { name: 'Laptops', icon: 'https://via.placeholder.com/20' },
    { name: 'Tablets', icon: 'https://via.placeholder.com/20' },
    { name: 'Accessories', icon: 'https://via.placeholder.com/20' },
    { name: 'Speakers', icon: 'https://via.placeholder.com/20' },
    { name: 'Gaming', icon: 'https://via.placeholder.com/20' },
    { name: 'Drones', icon: 'https://via.placeholder.com/20' },
    { name: 'Smartphones', icon: 'https://via.placeholder.com/20' },
  ];
  const firstColumn = categories.slice(5);
  const secondColumn = categories.slice(0, 5);
  return (
    <div className="p-6 flex flex-col sm:flex-row items-start">
      <div className="w-20 sm:w-1/5 mb-4 sm:mb-0">
        <h2 className="text-lg font-semibold mb-4">SHOP BY BLOCK</h2>
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-3">
            {firstColumn.map((category, index) => (
              <Link to={`/products/${category.name}`} key={index}>
                <button className='bg-white p-2 rounded shadow hover:bg-purple-700 transition'>
                  <div className="flex items-center transition">
                    <span className="text-black">{category.name}</span>
                  </div>
                </button>
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-3">
            {secondColumn.map((category, index) => (
              <Link to={`/products/${category.name}`} key={index}>
                <button className='bg-white p-2 rounded shadow hover:bg-purple-700 transition'>
                  <div className="flex items-center transition">
                    <span className="text-black">{category.name}</span>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex justify-center">
        <Banner />
      </div>
      <div className="w-full sm:w-1/2 flex justify-center">
        <PromoBanner />
      </div>
    </div>
  );
};
export default ShopByCategory;