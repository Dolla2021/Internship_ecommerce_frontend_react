import React from 'react';
// Add these imports for icons
import { FaStore, FaTags, FaInfoCircle, FaSearch } from 'react-icons/fa';

const Navigation = () => {
  return (
    <nav className="bg-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button className="flex items-center text-neutral-950 hover:text-blue-600">
          <FaStore className="mr-2" /> Shop by store
        </button>
        <button className="flex items-center text-neutral-950  hover:text-blue-600">
          <FaTags className="mr-2" /> Shop by brand
        </button>
        <button className="flex items-center text-neutral-950 hover:text-blue-600 ">
          <FaInfoCircle className="mr-2" /> TopValu Product Information
        </button>
      </div>
      
    </nav>
  );
};

export default Navigation;