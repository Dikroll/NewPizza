import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCart, removeFromCart, addToCart, updateCartItemQuantity } from "@/api/DataFetch";
import axios from "axios";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      loadCart();
    }, []);
  
    useEffect(() => {
      calculateTotal(cartItems);
    }, [cartItems]);
  
    const loadCart = async () => {
      try {
        const cart = await fetchCart();
        const items = cart.items || cart;
        setCartItems(items);
        calculateTotal(items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    const calculateTotal = (items) => {
      const newTotal = items.reduce((sum, item) => sum + item.size.price * item.quantity, 0);
      setTotal(newTotal);
    };
  
    const modifyCart = async (action, ...args) => {
      try {
        await action(...args);
        await loadCart();
      } catch (error) {
        console.error("Ошибка при изменении корзины:", error);
      }
    };

    const clearCart = () => {
      setCartItems([]); 
      setTotal(0); 
  };
  
    const UpdateQuantity = async (itemId, newQuantity) => {
      try {

        await updateCartItemQuantity(itemId, newQuantity)
        const updatedCartItems = cartItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
  
        calculateTotal(updatedCartItems);
      } catch (error) {
        console.error("Ошибка при изменении количества:", error);
      }
    };
  
    return (
      <CartContext.Provider value={{
        cartItems,
        total,
        RemoveItem: (cartItemId) => modifyCart(removeFromCart, cartItemId),
        AddItem: (productId, sizeId, quantity) => modifyCart(addToCart, productId, sizeId, quantity),
        loadCart,
        UpdateQuantity,
        clearCart
      }}>
        {children}
      </CartContext.Provider>
    );
  };
export const useCart = () => useContext(CartContext);