import React from 'react';
import './PromotionList.css';
import { config } from '@/services/config';
import { Link } from 'react-router-dom';

const PromotionList = ({ promotions = [] }) => {
  return (
    <div className="promotions-container">
      <h1>Акции</h1>
      <div className="promotions-grid">
        {promotions.map((promotion) => (
          <Link to={`/promotions/${promotion.id}`} key={promotion.id} className="promotion-card">
            <img src={`${config.apiUrl}${promotion.image_url}`} alt={promotion.name} />
            <div className="promotion-info">
              <h2>{promotion.name}</h2>
              <p className="promotion-short-description">{promotion.short_description}</p>
              <p className="promotion-date">
                {new Date(promotion.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromotionList;