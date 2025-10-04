import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { config } from "@/services/config";
import { useCart } from "@/context/UseCart";
import "./Product_modal.css";

const ProductModal = ({ product, onClose }) => {
  const { cart, AddItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const pizzaWindowRef = useRef(null);

  const cartItem = cart?.find(
    (item) => item.product.id === product.id && item.size.id === selectedSize.id
  );


  const totalPrice = selectedSize.price * cartQuantity;

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const CloseBtn = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); 
  };

  useEffect(() => {
    if (cartItem) {
      setCartQuantity(cartItem.quantity);
    } else {
      setCartQuantity(1);
    }
  }, [cartItem, selectedSize]);

  return (
    <div
      className={`pizzaWindowArea ${isOpen ? "open" : ""}`}
      ref={pizzaWindowRef}
      onClick={CloseBtn}
    >
      <div className="pizzaWindowBody" onClick={(e) => e.stopPropagation()}>
        <button className="pizzaWindowCloseButton" onClick={CloseBtn}>
          <X size={24} />
        </button>

        <div className="pizzaBig">
          <img src={`${config.apiUrl}${product.image_url}`} alt={product.name} />
        </div>
        
        <div className="pizzaInfo">
          <div className="pizzaInfo--content">
            <h1>{product.name}</h1>
            <span>{selectedSize.grammas}г</span>
            <div className="pizzaInfo--desc">{product.description}</div>

            <div className="pizzaInfo--sizearea">
              <div className="pizzaInfo--sector">Размер</div>
              <div className="pizzaInfo--sizes">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`pizzaInfo--size ${
                      selectedSize.size === size.size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.size}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pizzaInfo--footer">
            <div className="quantity-container">
              <button 
                className="quantity-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setCartQuantity(Math.max(1, cartQuantity - 1));
                }}
              >
                -
              </button>
              <span className="quantity-value">{cartQuantity}</span>
              <button 
                className="quantity-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setCartQuantity(cartQuantity + 1);
                }}
              >
                +
              </button>
            </div>
            
            <button 
              className="pizzaInfo--addButton" 
              onClick={async (e) => {
                e.stopPropagation();
                setIsOpen(false)
                try {
                  await AddItem(product.id, selectedSize.id, cartQuantity);
                } catch (error) {
                  console.error("Ошибка при добавлении товара:", error);
                }
              }}
            >
              <span>{cartItem ? "Обновить" : "Добавить"} за {totalPrice}₽</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;