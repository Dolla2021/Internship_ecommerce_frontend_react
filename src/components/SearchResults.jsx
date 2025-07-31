
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { products } from '../data/products';
import { FaSort, FaHeart, FaShoppingCart } from 'react-icons/fa';
const SearchResults = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [successMessage, setSuccessMessage] = useState('');
  
  const query = new URLSearchParams(useLocation().search).get('q')?.toLowerCase() || '';
  // Enhanced filtering with fuzzy search
  const filtered = products.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
  );
  // Sort products
  const sortedProducts = [...filtered].sort((a, b) => {
    const [field, direction] = sortOrder.split('-');
    if (field === 'price') {
      return direction === 'asc' 
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price);
    }
    return direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
  // Suggestions based on category or partial name match
  const suggestions = query && filtered.length === 0
    ? products.filter(
        (item) =>
          item.category?.toLowerCase().includes(query.split(' ')[0]) ||
          item.name.toLowerCase().includes(query.split(' ')[0])
      ).slice(0, 3)
    : [];
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  const handleAddToCart = (item) => {
    addToCart(item);
    setSuccessMessage(`${item.name} added to cart!`);
    setTimeout(() => setSuccessMessage(''), 3000);
    navigate('/cart');
  };
  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    setSuccessMessage(`${item.name} added to wishlist!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Success Message Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 transform translate-y-0 z-50">
          {successMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Search Results for "{query || 'All'}"
          <span className="ml-2 text-sm text-gray-500">
            ({filtered.length} items found)
          </span>
        </h2>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <img
              src="https://illustrations.popsy.co/gray/falling-box.svg"
              alt="No results"
              className="w-50 h-50 mx-auto"
            />
          </div>
          <p className="text-xl text-gray-600 mb-6">No results found for "{query}"</p>
          
          {suggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">You might like these:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {suggestions.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <Link to={`/products/${item.id}`} className="block relative group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    </Link>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">${item.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 flex items-center justify-center gap-2 px-7 py-2 bg-indigo-600   text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <FaShoppingCart /> Add to Cart
                        </button>
                        <button
                          onClick={() => handleAddToWishlist(item)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FaHeart /> Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link to={`/products/${item.id}`} className="block relative group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold text-indigo-600 mb-4">${item.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FaHeart /> Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;