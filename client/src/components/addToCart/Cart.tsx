'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import GoogleMapComponent from '@/components/GoogleMap/GoogleMap';

import { FaTrash, FaMinus, FaPlus, FaCreditCard, FaFire } from 'react-icons/fa';

const Cart: React.FC = () => {
    const GOOGLE_API_KEY = 'AIzaSyAuIR2zgDpOIjcAS3DlQ31HjbQHeloSd_I';
    const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);
    const [location, setLocation] = useState<string>('');
    const [locationError, setLocationError] = useState<string>('');

    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();

    const handleMapPick = async (lat: number, lng: number) => {
        setLatlng({ lat, lng });
        try {
            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=65166b14ce784a67a77a4d47a56d403d`);
            const data = await res.json();
            const components = data.results[0]?.components || {};
            const city = components.city || components.town || components.village || '';
            const state = components.state || '';
            const country = components.country || '';
            setLocation(`${city}${city ? ', ' : ''}${state}${state ? ', ' : ''}${country}`);
            setLocationError('');
        } catch (err) {
            setLocationError('Failed to fetch location details.');
        }
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        updateQuantity(itemId, newQuantity);
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout with items:', cartItems);
        alert('Checkout functionality will be implemented here!');
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    setLatlng({ lat: latitude, lng: longitude });
                    try {
                        const res = await fetch(
                            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=65166b14ce784a67a77a4d47a56d403d`
                        );
                        const data = await res.json();

                        console.log('data', data);
                        const components = data.results[0]?.components || {};
                        const city = components.city || components.town || components.village || '';
                        const state = components.state || '';
                        const country = components.country || '';
                        setLocation(`${city}${city ? ', ' : ''}${state}${state ? ', ' : ''}${country}`);
                    } catch (err) {
                        setLocationError('Failed to fetch location details.');
                    }
                },
                (err) => {
                    setLocationError('User denied location or an error occurred.');
                }
            );
        } else {
            setLocationError('Geolocation not supported.');
        }
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty text-center py-5">
                <h5 className="text-muted">Your cart is empty</h5>
                <p className="text-muted">Add some delicious items to get started!</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div style={{ marginBottom: '1rem' }}>
                <strong>Your Location: </strong>
                {location ? <span>{location}</span> : <span style={{ color: 'red' }}>{locationError || 'Fetching location...'}</span>}
            </div>
            <div style={{ height: 300, marginBottom: 20 }}>
                <GoogleMapComponent latlng={latlng} onPick={handleMapPick} apiKey={GOOGLE_API_KEY} />
            </div>

            <div className="cart-header d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Shopping Cart ({getCartItemCount()} items)</h5>
                <button className="btn btn-sm btn-outline-danger" onClick={clearCart}>
                    Clear Cart
                </button>
            </div>

            <div className="cart-items">
                {cartItems.map((item) => {
                    const discountedPrice =
                        item.isHotDeal && item.originalPrice ? item.originalPrice * (1 - (item.discount || 0) / 100) : item.price;

                    return (
                        <div key={item.id} className="cart-item card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded"
                                            style={{ height: '60px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="mb-1">{item.name}</h6>
                                        <small className="text-muted">{item.description}</small>
                                        {item.isHotDeal && (
                                            <span className="badge bg-danger ms-2">
                                                <FaFire className="me-1" />
                                                Hot Deal
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-md-2">
                                        <div className="price-info">
                                            {item.isHotDeal && item.originalPrice ? (
                                                <div>
                                                    <span className="text-decoration-line-through text-muted d-block">
                                                        Rs {item.originalPrice.toFixed(2)}
                                                    </span>
                                                    <span className="text-danger fw-bold"> Rs{discountedPrice.toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className="fw-bold text-primary">Rs {item.price.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="quantity-controls d-flex align-items-center">
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="mx-2 fw-bold">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="item-total text-end">
                                            <span className="fw-bold"> Rs {(discountedPrice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-summary card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Subtotal:</h6>
                        <span className="fw-bold">Rs{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Tax (8.5%):</h6>
                        <span className="fw-bold">Rs{(getCartTotal() * 0.085).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Total:</h5>
                        <span className="fw-bold fs-4 text-primary">Rs{(getCartTotal() * 1.085).toFixed(2)}</span>
                    </div>

                    <button
                        className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                        disabled={!location}
                        onClick={handleCheckout}
                    >
                        <FaCreditCard className="me-2" style={{ marginRight: '10px' }} />
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
