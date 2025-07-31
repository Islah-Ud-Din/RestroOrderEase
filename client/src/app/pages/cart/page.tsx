'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { MenuItem as MenuItemComponent, Cart as CartComponent } from '@/components/addToCart';

const Cart: React.FC = () => {
    const router = useRouter();

    return (
        <div className="cart-page">
            {/* Content Area */}
            <div className="container cart-content p-4">
                {/* Cart Section */}
                <div className="cart-section">
                    <div className="section-header mb-4">
                        <h3>Your Order</h3>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <CartComponent />
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Order Summary</h5>
                                    <p className="card-text">Review your items and proceed to checkout when ready.</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-success" onClick={() => router.push('/pages/dashboard')}>
                                            Continue Shopping
                                        </button>
                                        <button className="btn btn-outline-secondary">Save for Later</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
