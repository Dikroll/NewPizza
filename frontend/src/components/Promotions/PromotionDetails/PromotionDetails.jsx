import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPromotionById } from '@/api/DataFetch';
import { config } from '@/services/config';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './PromotionDetails.css';
import Loader from "@/layouts/Loader";

const PromotionDetails = () => {
    const { id } = useParams();
    const [promotion, setPromotion] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPromotionById(id)
            .then(data => setPromotion(data))
            .catch(error => console.error('Error fetching promotion:', error));
    }, [id]);

    if (!promotion) {
        return <Loader />;
    }

    return (
        <div className="promo-details-page">
            <div className="promo-card">
                <button className="promo-back-btn" onClick={() => navigate(-1)}>
                    Назад
                </button>
                <h1 className="promo-heading">{promotion.name}</h1>
                <div className="promo-img-wrapper">
                    <img
                        className="promo-img"
                        src={`${config.apiUrl}${promotion.image_url}`}
                        alt={promotion.name}
                    />
                </div>
                <p className="promo-summary">{promotion.short_description}</p>
                
                <button 
                    className="promo-toggle-btn"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                >
                    <span>Подробные условия акции</span>
                    {showFullDescription ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {showFullDescription && (
                    <div className="promo-full-desc">
                        <p className="promo-desc-text">
                            {promotion.description}
                        </p>
                    </div>
                )}
                
                <div className="promo-footer">
                    <p className="promo-date">
                        Дата создания: {new Date(promotion.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromotionDetails;