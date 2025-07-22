// src/components/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor
      );

      if (existing) {
        return prevCart.map((item) =>
          item.id === newItem.id && item.selectedColor === newItem.selectedColor
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { ...newItem, quantity: newItem.quantity || 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  // ✅ Update quantity directly
  const updateCartQuantity = (productId, selectedColor, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
