'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';
import Sidebar from '@/components/Sidebar';
import { MenuItem as MenuItemComponent, Cart as CartComponent } from '@/components/addToCart';
import { menuItems, getHotDeals, getAllCategories, getMenuByCategory } from '@/data/menuItems';

const Dashboard: React.FC = () => {
    const router = useRouter();
    const { authToken } = useUser();
    const { getCartItemCount } = useCart();
    const [activeTab, setActiveTab] = useState<'hot-deals' | 'menu' | 'cart'>('hot-deals');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    const hotDeals = getHotDeals();
    const categories = ['All', ...getAllCategories()];

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/pages/login');
            return;
        }

        // Simulate loading
        setTimeout(() => setLoading(false), 1000);
    }, [router, authToken]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/pages/login');
    };

    const getFilteredMenuItems = () => {
        if (selectedCategory === 'All') {
            return menuItems.filter((item) => !item.isHotDeal);
        }
        return getMenuByCategory(selectedCategory);
    };

    if (loading) {
        return (
            <div className="dashboard-loading text-center mt-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-3">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            {/* <Sidebar /> */}

            {/* Main Content */}
            <div className="main-content flex-grow-1">
                {/* Header */}
                <div className="dashboard-header bg-white shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Restaurant Dashboard</h2>
                        <div className="d-flex align-items-center gap-3">
                            <div className="cart-badge position-relative">
                                <button
                                    className={`btn ${activeTab === 'cart' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveTab('cart')}
                                >
                                    <i className="fas fa-shopping-cart me-2"></i>
                                    Cart
                                    {getCartItemCount() > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {getCartItemCount()}
                                        </span>
                                    )}
                                </button>
                            </div>
                            <button className="btn btn-outline-secondary" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt me-2"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="dashboard-tabs bg-white shadow-sm p-3">
                    <ul className="nav nav-tabs" id="dashboardTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'hot-deals' ? 'active' : ''}`}
                                onClick={() => setActiveTab('hot-deals')}
                            >
                                <i className="fas fa-fire me-2"></i>
                                Hot Deals
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>
                                <i className="fas fa-utensils me-2"></i>
                                Full Menu
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="dashboard-content p-4">
                    {/* Hot Deals Section */}
                    {activeTab === 'hot-deals' && (
                        <div className="hot-deals-section">
                            <div className="section-header mb-4">
                                <h3 className="text-danger">
                                    <i className="fas fa-fire me-2"></i>
                                    Hot Deals - Limited Time Offers!
                                </h3>
                                <p className="text-muted">Don&apos;t miss out on these amazing discounts!</p>
                            </div>

                            <div className="row">
                                {hotDeals.map((item) => (
                                    <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <MenuItemComponent item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full Menu Section */}
                    {activeTab === 'menu' && (
                        <div className="menu-section">
                            <div className="section-header mb-4">
                                <h3>
                                    <i className="fas fa-utensils me-2"></i>
                                    Our Menu
                                </h3>

                                {/* Category Filter */}
                                <div className="category-filter mb-4">
                                    <div className="btn-group" role="group">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                type="button"
                                                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {getFilteredMenuItems().map((item) => (
                                    <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <MenuItemComponent item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cart Section */}
                    {activeTab === 'cart' && (
                        <div className="cart-section">
                            <div className="section-header mb-4">
                                <h3>
                                    <i className="fas fa-shopping-cart me-2"></i>
                                    Your Order
                                </h3>
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
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-success">
                                                    <i className="fas fa-credit-card me-2"></i>
                                                    Continue Shopping
                                                </button>
                                                <button className="btn btn-outline-secondary">
                                                    <i className="fas fa-heart me-2"></i>
                                                    Save for Later
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
