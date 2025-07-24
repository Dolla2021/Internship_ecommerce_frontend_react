// src/components/WishlistContext.jsx
import { createContext, useState } from 'react';
export const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
    setSuccessMessage(`${product.name} has been added to your wishlist!`);
    
    // Clear the success message after a few seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, successMessage }}>
      {children}
    </WishlistContext.Provider>
  );
};