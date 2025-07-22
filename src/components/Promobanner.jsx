
import React from 'react';
const PromoBanner = () => {
  return (
    <div className="w-full px-2 py-2 sm:h-1/2">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg">
        <div className="sm:w-2/3 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-1">
            Save <span className="text-yellow-300">30% OFF</span> on Smartwatches
          </h2>
          <p className="text-xs sm:text-sm mb-2">
            Track your fitness and stay connected with our latest.
          </p>
          <button className="px-4 py-1 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-200">
            Shop Now
          </button>
        </div>
        <div className="sm:w-1/4 mt-2 sm:mt-0">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.5efkDI4nGP3TFe70qL20FwHaHa?pid=ImgDet&w=207&h=207&c=7&dpr=1.6&o=7&rm=3"
            alt="Smartwatch"
            className="w-full h-24 object-contain rounded-lg"
          />
        </div>
      </div>
      {/* Laptop Promo - Row 2 */}
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 shadow-md mt-4">
        <div className="w-full md:w-1/3">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.5efkDI4nGP3TFe70qL20FwHaHa?pid=ImgDet&w=207&h=207&c=7&dpr=1.6&o=7&rm=3"
            alt="High-performance laptop"
            className="w-full h-32 object-cover rounded-lg transition-transform transform hover:scale-105"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Next-Gen Laptops</h2>
          <p className="text-sm text-gray-600 mb-2">
            Power up your productivity with our high-performance laptops.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button className="px-4 py-1 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200">
              Shop Now
            </button>
            <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PromoBanner;