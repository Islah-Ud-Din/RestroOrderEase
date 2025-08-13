'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// UserContext
import { useUser } from '@/contexts/UserContext';

// SidebarNav Hook
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';

import { Home, ClipboardList, BarChart3, Users, Settings, Bell, Search, LogOut, UtensilsCrossed } from 'lucide-react';

const CustomersPage: React.FC = () => {
    const router = useRouter();
    const { navigate } = useSidebarNavigation();

    const { user, logout } = useUser();

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'Orders', icon: ClipboardList },
        { id: 'stats', label: 'Analytics', icon: BarChart3 },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="brand-section">
                        <div className="logo-wrapper">
                            <div className="logo-icon">
                                <UtensilsCrossed />
                            </div>
                            <span className="brand-name">RestaurantHub</span>
                        </div>
                    </div>
                    <div className="header-actions">
                        <div className="search-wrapper">
                            <Search />
                            <input type="text" placeholder="Search..." />
                        </div>
                        <button className="notification-btn">
                            <Bell />
                            <span className="notification-badge"></span>
                        </button>
                        <div className="user-section">
                            <div className="user-avatar">
                                <span>A</span>
                            </div>
                            <span className="user-name"> {(user as any)?.name || 'Admin'}</span>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>
                            <LogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="dashboard-layout">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.id)}
                                className={`nav-item${item.id === 'customers' ? ' active' : ''}`}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="main-content">
                    <div className="placeholder-page">
                        <h2>Customer Management</h2>
                        <p>Customer list and management tools will be shown here.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CustomersPage;
