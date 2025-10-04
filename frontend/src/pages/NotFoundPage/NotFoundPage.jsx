// NotFoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./NotFoundPage.css"; 

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-subtitle">Страница не найдена</p>
      <button className="not-found-button" onClick={() => navigate('/')}>
        На главную
      </button>
    </div>
  );
};

export default NotFoundPage;
