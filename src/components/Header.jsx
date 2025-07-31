
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      if (search.trim()) {
        // Simulate API call for search
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(`/search?q=${encodeURIComponent(search)}`);
        toast.success('Searching for products...');
        setSearchSuggestions([]);
      } else {
        toast.error('Please enter a search term');
      }
    } catch (error) {
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };
  const handleSearchInput = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim().length > 2) {
      // Simulate API call for suggestions
      const mockSuggestions = [
        'Electronics',
        'Smartphones',
        'Laptops',
        'Accessories'
      ].filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setSearchSuggestions(mockSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info('Successfully logged out');
    // Add any additional logout logic here
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
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
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
          {/* Navigation */}
          <nav className={`
            fixed md:relative top-0 left-0 h-full w-full md:w-auto
            bg-white md:bg-transparent
            transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:transform-none transition-transform duration-200 ease-in-out
            md:flex md:items-center md:space-x-6 z-40
            ${isMobileMenuOpen ? 'block' : 'hidden'} md:block
          `}>
            <div className="p-4 md:p-0 space-y-4 md:space-y-0 md:flex md:space-x-6">
              <Link to="/products" className="block text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                Products
              </Link>
              <Link to="/categories" className="block text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                Categories
              </Link>
              <Link to="/deals" className="block text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                Deals
              </Link>
              <Link to="/contact" className="block text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                Contact
              </Link>
            </div>
          </nav>
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3 mx-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                aria-label="Search products"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition"
                disabled={isSearching}
              >
                <FaSearch className={`${isSearching ? 'animate-spin' : ''}`} />
              </button>
            </form>
            
            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                    onClick={() => {
                      setSearch(suggestion);
                      setSearchSuggestions([]);
                      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* User, Wishlist, and Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <div className="flex items-center">
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition"
                    aria-label="Go to user profile"
                  >
                    <FaUser className="w-6 h-6" />
                    <span className="ml-1 text-sm hidden md:inline">Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 text-sm text-gray-700 hover:text-indigo-600 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition"
                    aria-label="Toggle login/register dropdown"
                  >
                    <FaUser className="w-6 h-6" />
                    <span className="ml-1 text-sm hidden md:inline">Login / Register</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
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
              <span className="ml-1 text-sm hidden md:inline">Wishlist</span>
            </Link>
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-indigo-600 transition">
              <FaShoppingCart className="w-6 h-6" />
              <span className="ml-1 text-sm hidden md:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;