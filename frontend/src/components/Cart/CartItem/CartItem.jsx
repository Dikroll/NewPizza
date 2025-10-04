import React, { useState } from 'react'; 
import { useCart } from '@/context/UseCart';
import './CartItem.css';
import { config } from '@/services/config';
import { X } from 'lucide-react';

export const CartItem = ({ item }) => {
  const { RemoveItem, UpdateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const QuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await UpdateQuantity(item.id, newQuantity);
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Ошибка при изменении количества:', error);
    }
  };

  const RemoveProduct = async () => {
    try {
      await RemoveItem(item.id);
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };

  return (
    <div className="cart-items">
      <div className="cart-item">
        <button className="remove-icon" onClick={RemoveProduct}>
          <X size={15} />
        </button>
        <img
          src={`${config.apiUrl}${item.product.image_url}`}
          alt={item.product.name}
          className="cart-item-image"
        />
        <div className="cart-item-details">
          <h3 className="cart-item-title">{item.product.name}</h3>
          <p className="cart-item-size">Размер: {item.size?.size || "Неизвестно"}</p>
          <div className="price-quantity-container">
            <div className="quantity-container">
              <button
                onClick={() => QuantityChange(quantity - 1)}
                className="quantity-btn left"
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                onClick={() => QuantityChange(quantity + 1)}
                className="quantity-btn right"
              >
                +
              </button>
            </div>
            <p className="cart-item-price">{item.size?.price || 0}₽</p>
          </div>
        </div>
      </div>
    </div>
  );
};
