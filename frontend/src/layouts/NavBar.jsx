import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartButton from "@/components/Cart/CartButton/CartButton";
import logo from "@/assets/images/favicon.svg";
import { useAuth } from "@/context/UseAuth";
import Userlogo from "@/assets/images/profile.svg"; 
import ScrollToCategory from '@/utils/scrollToCategory';
import { X, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { Instagram, Facebook, MessageSquare } from "lucide-react";

const NavBar = ({ categories = [] }) => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const scrollToCategory = ScrollToCategory();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMobileDropdownOpen(false);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const toggleDesktopDropdown = () => {
    setDesktopDropdownOpen(!desktopDropdownOpen);
  };

  const CategoryClick = (categoryId) => {
    scrollToCategory(categoryId);
    setIsMenuOpen(false);
    setMobileDropdownOpen(false);
    setDesktopDropdownOpen(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">

          <button 
            className="navbar-toggler d-lg-none" 
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <div className="navbar-toggler-icon-close">
                <X size={24} />
              </div>
            ) : (
              <Menu size={24} />
            )}
          </button>


          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" width="80" height="80" className="me-2" />
            <span className="brand-text">Dымок</span>
          </Link>

          <div className="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li 
                className="nav-item dropdown"
                onMouseEnter={() => setDesktopDropdownOpen(true)}
                onMouseLeave={() => setDesktopDropdownOpen(false)}
              >
                <div
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="categoriesDropdown"
                  role="button"
                >
                  <span>Категории{desktopDropdownOpen ? <ChevronUp size={16} className="ms-1" /> : <ChevronDown size={16} className="ms-1" />}</span>
                 
                </div>
                <ul 
                  className={`dropdown-menu categories-dropdown ${desktopDropdownOpen ? 'show' : ''}`} 
                  aria-labelledby="categoriesDropdown"
                >
                  <div className="dropdown-columns">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <a 
                          href={`/#category-${category.id}`} 
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToCategory(category.id);
                          }}
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/delivery" className="nav-link">Контакты</Link>
              </li>
              <li className="nav-item">
                <Link to="/promotions" className="nav-link">Акции</Link>
              </li>
            </ul>
          </div>


          <div className="d-flex align-items-center ms-3">
            {user ? (
              <Link to="/profile" className="profile-icon d-none d-lg-block">
                <img src={Userlogo} alt="Profile"/>
              </Link>
            ) : (
              <Link to="/login" className="profile-icon d-none d-lg-block">
                <img src={Userlogo} alt="Login"/>
              </Link>
            )}
            <CartButton className="btn btn-danger" />
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={toggleMenu} />
        )}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <img src={logo} alt="Logo" width="60" height="60" />
            <span className="brand-text">Dымок</span>
            <button className="close-menu" onClick={toggleMenu}>
              <X size={24} />
            </button>
          </div>

          <div className="mobile-menu-content">
            <ul className="mobile-nav">
              <li className="mobile-nav-item dropdown">
                <div 
                  className="dropdown-toggle mobile-dropdown-header"
                  onClick={toggleMobileDropdown}
                >
                  <span>Категории</span>
                  {mobileDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <ul className={`mobile-dropdown-menu ${mobileDropdownOpen ? 'show' : ''}`}>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a 
                        href={`/#category-${category.id}`} 
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          CategoryClick(category.id);
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mobile-nav-item">
                <Link to="/delivery" onClick={toggleMenu}>Контакты</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/promotions" onClick={toggleMenu}>Акции</Link>
              </li>
              <li className="mobile-nav-item">
                {user ? (
                  <Link to="/profile" onClick={toggleMenu}>Личный кабинет</Link>
                ) : (
                  <Link to="/login" onClick={toggleMenu}>Войти</Link>
                )}
              </li>
            </ul>
          </div>
          <div className="mobile-menu-footer">
              <div className="contacts">
                <p>г. Иваново ул. 8 марта д. 32Б</p>
                <p>+7 (800) 555-35-35</p>
              </div>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;