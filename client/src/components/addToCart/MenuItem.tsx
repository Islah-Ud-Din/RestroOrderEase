'use client';

import React from 'react';
import { MenuItem as MenuItemType, useCart } from '@/contexts/CartContext';
import { FaFire, FaPlus, FaClock, FaStar, FaHeart } from 'react-icons/fa';

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
        <div
            className="menu-item-card position-relative overflow-hidden shadow-sm border-0"
            style={{
                borderRadius: '16px',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Discount Badge - Top Left */}
            {item.isHotDeal && item.originalPrice && (
                <div
                    className="position-absolute bg-danger top-0 start-0 d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                        borderRadius: '0 0 16px 0',
                        padding: '8px 16px',
                        fontSize: '0.75rem',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(233, 30, 99, 0.3)',
                    }}
                >
                    <FaFire className="me-1" />
                    Rs.{(item.originalPrice - discountedPrice).toFixed(0)} off Rs.{item.originalPrice.toFixed(0)}
                </div>
            )}

            {/* Image Section */}
            <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                <img
                    src={item.image}
                    srcSet={`${item.image} 1x, ${item.image.replace('w=800&h=600', 'w=1600&h=1200')} 2x`}
                    alt={item.name}
                    className="w-100 h-100"
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                    }}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/public/images/fallback-food.jpg';
                    }}
                />

                {/* Hot Deal Badge - Top Right on Image */}
                {item.isHotDeal && (
                    <div className="position-absolute top-0 end-0 m-2" style={{ bottom: '0' }}>
                        <span
                            className="badge d-flex align-items-center px-3 py-2 shadow-sm"
                            style={{
                                background: 'linear-gradient(45deg, #4566f7, #3b56e8)',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                color: '#fff',
                            }}
                        >
                            <FaFire className="me-1" />
                            Hot Deal
                        </span>
                    </div>
                )}

                {/* Popular Badge */}
                {item.isPopular && (
                    <div className="position-absolute" style={{ top: '10px', right: item.isHotDeal ? '10px' : '10px' }}>
                        <span
                            className="badge d-flex align-items-center px-3 py-2 shadow-sm"
                            style={{
                                background: 'linear-gradient(45deg, #ffd700, #ffb700)',
                                color: '#333',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                            }}
                        >
                            <i className="fas fa-crown me-1"></i>
                            Popular
                        </span>
                    </div>
                )}
            </div>

            {/* Card Body */}
            <div className="p-3">
                {/* Title and Add Button Row */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1 me-2">
                        <h6 className="card-title mb-1 fw-bold text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.3' }}>
                            {item.name}
                        </h6>
                    </div>

                    <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-1" style={{ fontSize: '0.8rem' }} />
                        <span className="fw-bold me-1" style={{ fontSize: '0.85rem', color: '#333' }}>
                            {item.rating.average}
                        </span>
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                            ({item.ordersCount}+)
                        </span>
                    </div>
                </div>
                {/* Category and Rating */}
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                        <span className="text-muted me-2" style={{ fontSize: '0.85rem' }}>
                            Rs • {item.tags[0] || 'Fast Food'}
                        </span>
                    </div>
                </div>
                {/* Time and Price Row */}
                <div className="d-flex align-items-center">
                    <div className="d-flex w-100 justify-content-between align-items-center text-muted" style={{ fontSize: '0.85rem' }}>
                        <span style={{ fontWeight:550, color: '#4566f7' }}>
                            Rs.{item.price.toFixed(0)}
                        </span>

                        <div className='d-flex align-items-center'>
                            <FaClock className="mr-1" style={{ fontSize: '0.8rem' }} />
                            <span>{item.preparationTime}</span>
                        </div>
                    </div>
                </div>
                {/* Taste Profile - Compact */}
                <div className="mt-2 mb-2">
                    <div className="d-flex flex-wrap gap-1">
                        <span
                            className="badge px-2 py-1"
                            style={{
                                background: 'linear-gradient(45deg, #4566f7, #5c7cfa)',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                color: '#fff',
                            }}
                        >
                            {item.taste.flavor}
                        </span>
                        {item.taste.spiceLevel !== 'None' && (
                            <span
                                className="badge px-2 py-1"
                                style={{
                                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    color: '#fff',
                                }}
                            >
                                {item.taste.spiceLevel}
                            </span>
                        )}
                        {item.tags.slice(1, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="badge px-2 py-1"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    color: '#6c757d',
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    border: '1px solid #e9ecef',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Allergens - Compact */}
                {item.allergens.length > 0 && (
                    <div className="mt-2 mb-2">
                        <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.75rem' }}>
                            <i className="fas fa-exclamation-triangle me-1" style={{ fontSize: '0.7rem' }}></i>
                            <span>Contains: {item.allergens.slice(0, 2).join(', ')}</span>
                            {item.allergens.length > 2 && <span> +{item.allergens.length - 2}</span>}
                        </div>
                    </div>
                )}
                {/* Add to Cart Button */}
                <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center" onClick={handleAddToCart}>
                    <FaPlus className="mr-1" style={{ fontSize: '0.7rem' }} />
                    Add
                </button>
            </div>
        </div>
    );
};

export default MenuItem;
