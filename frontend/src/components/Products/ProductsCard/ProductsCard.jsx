import React from 'react';
import { config } from '@/services/config.jsx';
import './ProductsCard.css';

const ProductsCard = ({ products, categories, openModal, cart, updateCart }) => {
  const productsByCategory = categories.map((category) => {
    const categoryProducts = products.filter(
      (product) => product.category_id === category.id
    );
    return {
      category: category,
      products: categoryProducts,
    };
  });

  return (
          <div>
        {productsByCategory.map(({ category, products }) => (
          <div key={category.id} id={`category-${category.id}`} className="product-category">
            <div className="product-category-title">
              <h2>{category.name}</h2>
            </div>
            <div className="products">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="product-card" onClick={() => openModal(product)}>  
                    {product.image_url && (
                      <img src={`${config.apiUrl}${product.image_url}`} alt={product.name} />
                    )}
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span>от {product.price}₽</span>
                    <button>Выбрать</button>
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        ))}
      </div>
  );
};

export default ProductsCard;
