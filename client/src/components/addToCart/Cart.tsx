'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaCreditCard, FaFire } from 'react-icons/fa';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        updateQuantity(itemId, newQuantity);
    };

    const handleCheckout = () => {
        // TODO: Implement checkout functionality
        console.log('Proceeding to checkout with items:', cartItems);
        alert('Checkout functionality will be implemented here!');
    };

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
                                                        ${item.originalPrice.toFixed(2)}
                                                    </span>
                                                    <span className="text-danger fw-bold">${discountedPrice.toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className="fw-bold text-primary">${item.price.toFixed(2)}</span>
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
                                            <span className="fw-bold">${(discountedPrice * item.quantity).toFixed(2)}</span>
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
                        <span className="fw-bold">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Tax (8.5%):</h6>
                        <span className="fw-bold">${(getCartTotal() * 0.085).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Total:</h5>
                        <span className="fw-bold fs-4 text-primary">${(getCartTotal() * 1.085).toFixed(2)}</span>
                    </div>

                    <button className="btn btn-success w-100 d-flex align-items-center justify-content-center" onClick={handleCheckout}>
                        <FaCreditCard className="me-2" style={{ marginRight: '10px' }} />
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
