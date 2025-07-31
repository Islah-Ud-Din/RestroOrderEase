'use client';

import React from 'react';
import { MenuItem as MenuItemType, useCart } from '@/contexts/CartContext';
import { FaFire, FaPlus } from 'react-icons/fa';

interface MenuItemProps {
    item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
    };

    const discountedPrice = item.isHotDeal && item.originalPrice ? item.originalPrice * (1 - (item.discount || 0) / 100) : item.price;

    return (
        <div className="menu-item card h-100 shadow-sm">
            <div className="position-relative">
                <img
                    src={item.image}
                    srcSet={`${item.image} 1x, ${item.image.replace('w=800&h=600', 'w=1600&h=1200')} 2x`}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                    loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).src = '/public/images/fallback-food.jpg'; }}
                />
                <div className="d-flex flex-wrap justify-content-space align-items-center gap-2  m-2">
                    {item.isHotDeal && (
                        <span className="badge bg-danger d-flex align-items-center px-2 py-1">
                            <FaFire className="me-1" style={{ color: 'white' }} />
                            Hot Deal
                        </span>
                    )}
                    {item.isHotDeal && item.originalPrice && <span className="badge bg-success px-2 py-1">-{item.discount}%</span>}
                </div>
            </div>

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted flex-grow-1">{item.description}</p>

                <div className="price-section mb-3">
                    {item.isHotDeal && item.originalPrice ? (
                        <div>
                            <span className="text-decoration-line-through text-muted me-2">${item.originalPrice.toFixed(2)}</span>
                            <span className="text-danger fw-bold fs-5">${discountedPrice.toFixed(2)}</span>
                        </div>
                    ) : (
                        <span className="fw-bold fs-5 text-primary">${item.price.toFixed(2)}</span>
                    )}
                </div>

                <button className="btn btn-primary w-100" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default MenuItem;
