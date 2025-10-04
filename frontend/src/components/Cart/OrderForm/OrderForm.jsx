import React, { useState } from 'react';
import { validatePhone, validateEmail } from '@/utils/validateData'; 
import './OrderForm.css';

const OrderForm = ({ formData, onFormChange, selectedPayment, onPaymentChange, total, onSubmitOrder }) => {
    const [errors, setErrors] = useState({});

    const exChange = (e) => {
        const { name, value } = e.target;

        let newErrors = { ...errors };
        let newValue = value;

        if (name === 'phone') {
            if (!newValue.startsWith('+7')) {
                newValue = '+7' + newValue.replace(/[^0-9]/g, '').slice(1); 
            }
            if (!validatePhone(newValue)) {
                newErrors.phone = 'Некорректный номер телефона';
            } else {
                delete newErrors.phone;
            }
        }

        if (name === 'email') {
            if (!validateEmail(newValue)) {
                newErrors.email = 'Некорректный email';
            } else {
                delete newErrors.email;
            }
        }

        setErrors(newErrors);
        onFormChange({ target: { name, value: newValue } }); 
    };

    return (
        
        <form className="order-form">
            <h3>Доставка</h3>
            <div className="form-row">
                
                <div className="form-group">
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={exChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Телефон:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={exChange}
                        maxLength="12"
                        required
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
            </div>

            <div className="form-group">
                <label>Адрес:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={exChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Подъезд:</label>
                    <input
                        type="text"
                        name="entrance"
                        value={formData.entrance}
                        onChange={exChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Квартира:</label>
                    <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={exChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Этаж:</label>
                    <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={exChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={exChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <h3>Оплата</h3>
            
            <div className="payment-options">
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="card_online"
                    checked={selectedPayment === 'card_online'}
                    onChange={onPaymentChange}
                />
                Онлайн
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selectedPayment === 'cash'}
                    onChange={onPaymentChange}
                />
                Наличные
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="card_on_delivery"
                    checked={selectedPayment === 'card_on_delivery'}
                    onChange={onPaymentChange}
                />
                Картой
            </label>
            
        </div>
        <div className="form-group">
                <label>Комментарий курьеру:</label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={exChange}
                    className="fixed-textarea"
                ></textarea>
            </div>
            <div className="total-amount">
            <h3>К оплате: {total}₽</h3>
        </div>
        <button onClick={(e) => onSubmitOrder(e)} className="submit-button">
                Оформить заказ
            </button>

        </form>
        
        
    );
};

export default OrderForm;
