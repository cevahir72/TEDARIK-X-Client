'use client'
import React, { createContext, useContext, useState } from "react";

// Context oluşturuluyor
const CartContext = createContext();

// CartProvider, tüm uygulama içerisinde sepet verilerini sağlar
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Sepete ürün ekleme fonksiyonu
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Sepetten ürün çıkarma fonksiyonu
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const flushCart = () => {
    setCart([])}

  // Sepetteki ürünün miktarını güncelleme
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };
  // Sepetteki ürünün miktarını 1 artırma
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Sepetteki ürünün miktarını 1 azaltma
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };


  // Sepetteki toplam ürün sayısını ve tutarını hesaplama
  const getCartDetails = () => {
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalVat = totalPrice * 0.10; // KDV %10
    const shipping = 0; // Ücretsiz gönderi

    return {
      totalQuantity,
      totalPrice,
      totalVat,
      shipping,
      grandTotal: totalPrice + totalVat + shipping,
    };
  };

  return (
    <CartContext.Provider value={{ cart, addToCart,flushCart, removeFromCart, updateQuantity, getCartDetails, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// CartContext'i kullanmak için custom hook
export const useCart = () => useContext(CartContext);

