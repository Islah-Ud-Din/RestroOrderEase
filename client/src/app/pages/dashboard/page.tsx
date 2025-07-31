'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';

import Loader from '@/components/Loader/Loader';

import { MenuItem as MenuItemComponent, Cart as CartComponent } from '@/components/addToCart';
import { menuItems, getHotDeals, getAllCategories, getMenuByCategory } from '@/data/menuItems';
import { FaShoppingCart, FaFire, FaUtensils, FaCreditCard, FaHeart } from 'react-icons/fa';
import MenuBannerCarousel from '@/components/banner/MenuBannerCarousel';

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

    const getFilteredMenuItems = () => {
        if (selectedCategory === 'All') {
            return menuItems.filter((item) => !item.isHotDeal);
        }
        return getMenuByCategory(selectedCategory);
    };

    if (loading) {
        return <Loader size={70} />;
    }

    return (
        <div className="dashboard-page">
            {/* Banner Carousel */}
            <MenuBannerCarousel onCartClick={() => setActiveTab('cart')} cartCount={getCartItemCount()} />
            {/* Main Content */}
            <div className="main-content flex-grow-1">
                {/* Navigation Tabs */}
                <div className="dashboard-tabs bg-white shadow-sm p-3">
                    <ul className="nav nav-tabs" id="dashboardTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'hot-deals' ? 'active' : ''}`}
                                onClick={() => setActiveTab('hot-deals')}
                            >
                                <FaFire className="me-2" />
                                Hot Deals
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>
                                <FaUtensils className="me-2" />
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
                                    <FaFire className="me-2" />
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
                                <h3>Our Menu</h3>

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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
