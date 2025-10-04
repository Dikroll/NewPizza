import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/UseCart";
import "./CartButton.css";

const CartButton = () => {
    const { cartItems } = useCart();
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        if (Array.isArray(cartItems)) {
            const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            setTotalQuantity(total);
        }
    }, [cartItems]); 

    return (
        <Link to="/cart" className="cart-button">
            Корзина {totalQuantity > 0 && `(${totalQuantity})`}
        </Link>
    );
};

export default CartButton;
