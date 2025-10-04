import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';
import { config } from '@/services/config';
import { useNavigate } from 'react-router-dom'; 

const ImageSlider = ({ banners }) => {
  const navigate = useNavigate(); 

  const BannerClick = (promotionId) => {
    navigate(`/promotions/${promotionId}`); 
  };

  return (
    <div className="slider-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          speed={800}
          pagination={{ clickable: true }} 
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          resistanceRatio={0.5}
          touchReleaseOnEdges={true}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id} onClick={() => BannerClick(banner.promotion.id)}>
              <img
                src={`${config.apiUrl}${banner.image}`}
                alt={banner.title}
                className="slider-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};

export default ImageSlider;