'use client';

import React from 'react';
import { MenuItem as MenuItemType, useCart } from '@/contexts/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const discountedPrice = item.isHotDeal && item.originalPrice
    ? item.originalPrice * (1 - (item.discount || 0) / 100)
    : item.price;

  return (
    <div className="menu-item card h-100 shadow-sm">
      <div className="position-relative">
        <img
          src={item.image}
          alt={item.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {item.isHotDeal && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-danger">
              <i className="fas fa-fire me-1"></i>
              Hot Deal
            </span>
          </div>
        )}
        {item.isHotDeal && item.originalPrice && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-success">
              -{item.discount}%
            </span>
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text text-muted flex-grow-1">{item.description}</p>

        <div className="price-section mb-3">
          {item.isHotDeal && item.originalPrice ? (
            <div>
              <span className="text-decoration-line-through text-muted me-2">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-danger fw-bold fs-5">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="fw-bold fs-5 text-primary">
              ${item.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleAddToCart}
        >
          <i className="fas fa-plus me-2"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
