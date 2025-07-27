import React, { useState } from 'react';
// Add these imports for icons    
import { FaStore, FaTags, FaInfoCircle } from 'react-icons/fa';
const Navigation = () => {
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const toggleStoreDropdown = () => setStoreDropdownOpen(!storeDropdownOpen);
  const toggleBrandDropdown = () => setBrandDropdownOpen(!brandDropdownOpen);
  return (
    <nav className="bg-gray-800 p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        {/* Shop by Store Dropdown */}
        <div className="relative">
          <button
            className="flex items-center text-gray-300 hover:text-gray-300"
            onClick={toggleStoreDropdown}
          >
            <FaStore className="mr-2" /> Shop by store
          </button>
          {storeDropdownOpen && (
            <div className="absolute text-gray-100 left-0 mt-2 w-48 bg-gray-800  rounded shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Store 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Store 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Store 3</li>
                 <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Store 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Store 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Store 3</li>
              </ul>
            </div>
          )}
        </div>
        {/* Shop by Brand Dropdown */}
        <div className="relative">
          <button
            className="flex items-center text-gray-300 hover:text-gray-300"
            onClick={toggleBrandDropdown}
          >
            <FaTags className="mr-2" /> Shop by brand
          </button>
          {brandDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 text-gray-100 bg-gray-800 rounded shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Brand 1</li>
                <li className="px-4 py-2  hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Brand 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Brand 3</li>
              </ul>
            </div>
          )}
        </div>
        {/* Product Information */}
        <button className="flex items-center text-gray-300 hover:text-gray-300">
          <FaInfoCircle className="mr-2" /> TopValu Product Information
        </button>
      </div>
    </nav>
  );
};
export default Navigation;