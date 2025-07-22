// src/components/WishlistContext.jsx
import { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const addToWishlist = (product) => setWishlist((prev) => [...prev, product]);
  const removeFromWishlist = (productId) => setWishlist((prev) => prev.filter((item) => item.id !== productId));
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};