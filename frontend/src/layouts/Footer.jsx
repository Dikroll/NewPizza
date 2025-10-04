import React from 'react';
import ScrollToCategory from '@/utils/scrollToCategory';



const Footer = ({ categories }) => {
  const scrollToCategory = ScrollToCategory()
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-block">
          <h5 className="footer-title">Категории</h5>
          <ul className="footer-categories">
          {categories.map((category) => (
              <li key={category.id}>
                <a 
                  href={`/#category-${category.id}`} 
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault(); 
                    scrollToCategory(category.id);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-block">
          <h5 className="footer-title">Контактная информация</h5>
          <p>Телефон: +7 944 70 44</p>
          <p>Email: <a href="mailto:info@vremya-vdohnoveniy.ru" className="footer-link">DIMOKPIZZA@yandex.ru</a></p>
          <p>Адрес: Ул. 8 марта, д. 32Б, Иваново</p>
        </div>

        <div className="footer-block">
          <h5 className="footer-title">Социальные сети</h5>          
            <p><a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="footer-link">ВКонтакте</a></p>
            <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Telegram</a></p> 
        </div>
      </div>


      <div className="footer-bottom">
        <small>© 2025 Dымок. Все права защищены.</small>
      </div>
    </footer>
  );
};

export default Footer;
