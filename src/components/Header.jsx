import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock state for demo
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://th.bing.com/th/id/OIP.duvYsEnRh7NCU3effnQOTAHaHa?w=187&h=188&c=7&r=0&o=7&dpr=1.6&pid=1.7&rm=3"
            alt="Shop Logo"
            className="w-10 h-10 object-contain"
            loading="lazy"
          />
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition">
            ShopNow
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-700">
          {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
        {/* Navigation */}
        <nav className={`md:flex space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
            Products
          </Link>
          <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
            Categories
          </Link>
          <Link to="/deals" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
            Deals
          </Link>
          <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
            Contact
          </Link>
        </nav>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Search products"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-500" />
          </button>
        </form>
        {/* User, Wishlist, and Cart */}
        <div className="flex items-center space-x-4">
          {/* Login/Register Button */}
          <div className="relative">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-indigo-600 transition"
                aria-label="Go to user profile"
              >
                <FaUser className="w-6 h-6" />
                <span className="ml-1 text-sm">Profile</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition"
                  aria-label="Toggle login/register dropdown"
                >
                  <FaUser className="w-6 h-6" />
                  <span className="ml-1 text-sm">Login / Register</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          <Link to="/wishlist" className="flex items-center text-gray-700 hover:text-indigo-600 transition">
            <FaHeart className="w-6 h-6" />
            <span className="ml-1 text-sm">Wishlist</span>
          </Link>
          <Link to="/cart" className="flex items-center text-gray-700 hover:text-indigo-600 transition">
            <FaShoppingCart className="w-6 h-6" />
            <span className="ml-1 text-sm">Cart</span>
          </Link>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
              Categories
            </Link>
            <Link to="/deals" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
              Deals
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;