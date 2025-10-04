import React from 'react';
import PromotionList from '../../components/Promotions/PromotionList/PromotionList';
const PromotionsPage = ({ promotions }) => {
    return (
        <div>
            <PromotionList promotions={promotions}/>
        </div>
    );
};
export default PromotionsPage;