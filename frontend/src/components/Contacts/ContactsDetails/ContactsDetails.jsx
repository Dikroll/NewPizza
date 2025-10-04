import React from 'react';
import './ContactsDetails.css'; 

const ContactsDetails = () => {
  return (
    <div className="contacts-info">
      <h2>Контакты</h2>
      <p><strong>Адрес:</strong> Иваново ул. 8 марта 32Б  </p>

      <div className="contact-info-item">
        <h3>Режим работы доставки</h3>
        <p><strong>Пн-Чт:</strong> 10:00-21:30</p>
        <p><strong>Пт-Сб:</strong> 10:00-22:30</p>
        <p><strong>Вс:</strong> 10:00-21:30</p>
        <p>Доставка бесплатная при заказе от 990 ₽, при заказе менее 990 ₽ стоимость доставки — 150 ₽.</p>
        <p><strong>Телефон доставки:</strong> 8 800 555-35-35</p>
      </div>

      <div className="contact-info-item">
        <h3>Режим работы самовывоза</h3>
        <p><strong>Пн-Чт:</strong> 11:00-21:30</p>
        <p><strong>Пт-Сб:</strong> 11:00-22:30</p>
        <p><strong>Вс:</strong> 11:00-21:30</p>
      </div>

      <div className="contact-info-item">
        <h3>Режим работы заведения</h3>
        <p><strong>Пн-Чт:</strong> 11:00-22:00</p>
        <p><strong>Пт-Сб:</strong> 11:00-23:00</p>
        <p><strong>Вс:</strong> 11:00-22:00</p>
      </div>

      <div className="contact-info-item">
        <h3>Оплата</h3>
        <p>💳 Онлайн на сайте  | 💵 Курьеру (картой или наличными)</p>
      </div>
    </div>
  );
};

export default ContactsDetails;
