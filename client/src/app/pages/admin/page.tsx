'use client';

import React, { useState, useEffect } from 'react';

// Navigation
import { useRouter } from 'next/navigation';

// Context
import { useUser } from '@/contexts/UserContext';

// Components
import Loader from '@/components/Loader/Loader';


// Data

// icons
import {
    ClipboardList,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    Search,
    Home,
    UtensilsCrossed,
} from 'lucide-react';

// Lib

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const { logout, authToken, user } = useUser();
    // State
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Effect
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/pages/login');
            return;
        }
        setTimeout(() => setLoading(false), 1000);
    }, [router, authToken]);

    useEffect(() => {}, []);


    // Sidebar
    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'Orders', icon: ClipboardList },
        { id: 'stats', label: 'Analytics', icon: BarChart3 },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleSidebarNavigation = (id: string) => {
        switch (id) {
            case 'customers':
                router.push('/pages/admin/customer');
                break;
            case 'orders':
                router.push('/pages/admin/order');
                break;
            case 'stats':
                router.push('/pages/admin/Statis');
                break;
            case 'settings':
                router.push('/pages/admin/settings');
                break;
            case 'dashboard':
            default:
                router.push('/pages/admin');
                break;
        }
    };

    if (loading) {
        return <Loader size={70} />;
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
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
                {/* Sidebar */
                }
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleSidebarNavigation(item.id)}
                                className={'nav-item'}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <div className="dashboard-content">
                        <h1>Admin Dashboard</h1>
                        <p>Select a section from the sidebar to manage Orders, Customers, Analytics, or Settings.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
