import React, { useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { products } from '../data/products';
const SearchResults = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const query = new URLSearchParams(useLocation().search).get('q')?.toLowerCase() || '';
  // Enhanced filtering: search name, description, and category
  const filtered = products.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
  );
  // Suggest similar products if no exact matches (based on category or partial name)
  const suggestions =
    query && filtered.length === 0
      ? products
          .filter(
            (item) =>
              item.category?.toLowerCase().includes(query.split(' ')[0]) ||
              item.name.toLowerCase().includes(query.split(' ')[0])
          )
          .slice(0, 3) // Limit to 3 suggestions
      : [];
  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/cart'); // Navigate to the cart page after adding the item
  };
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query || 'All'}"</h2>
      {filtered.length === 0 ? (
        <div>
          <p className="text-gray-300">No results found for "{query}".</p>
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">You might like these:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                  >
                    <Link to={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-40 w-full object-cover rounded"
                        loading="lazy"
                      />
                    </Link>
                    <h3 className="font-semibold mt-2">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)} // Call the new function
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => addToWishlist(item)}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
                        aria-label={`Add ${item.name} to wishlist`}
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <Link to={`/products/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded"
                  loading="lazy"
                />
              </Link>
              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)} // Call the new function
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  aria-label={`Add ${item.name} to cart`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(item)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
                  aria-label={`Add ${item.name} to wishlist`}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;