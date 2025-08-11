'use client';

import React, { useState, useEffect } from 'react';

// Navigation
import { useRouter } from 'next/navigation';

// Context
import { useUser } from '@/contexts/UserContext';

// Components
import Loader from '@/components/Loader/Loader';
import OrderList from '@/components/admin/OrderList';
import OrderForm from '@/components/admin/OrderForm';
import AdminStats from '@/components/admin/AdminStats';

// Data
import { sampleOrders } from '@/data/sampleOrders';

// icons
import {
    ClipboardList,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Plus,
    Bell,
    Search,
    Home,
    UtensilsCrossed,
    Truck,
    DollarSign,
    ArrowUp,
    Clock,
    CheckCircle,
    XCircle,
} from 'lucide-react';

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    orderDate: string;
    deliveryAddress?: string;
    specialInstructions?: string;
}

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const { logout, authToken, user } = useUser();

    // State
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'new-order' | 'stats' | 'customers' | 'settings'>('dashboard');
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    useEffect(() => {
        setOrders(sampleOrders);
    }, []);

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return <Clock className="icon-sm" />;
            case 'confirmed':
                return <CheckCircle className="icon-sm" />;
            case 'preparing':
                return <UtensilsCrossed className="icon-sm" />;
            case 'ready':
                return <Truck className="icon-sm" />;
            case 'delivered':
                return <CheckCircle className="icon-sm" />;
            case 'cancelled':
                return <XCircle className="icon-sm" />;
            default:
                return <Clock className="icon-sm" />;
        }
    };

    const handleOrderStatusUpdate = (orderId: string, newStatus: Order['status']) => {
        setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    };

    const handleDeleteOrder = (orderId: string) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    };

    const handleViewOrder = (order: Order) => {
        console.log('Viewing order:', order);
    };

    // New Order
    const handleSubmitOrder = (orderData: any) => {
        const newOrder: Order = {
            id: (orders.length + 1).toString(),
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            items: orderData.items,
            total: orderData.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
            status: 'pending',
            orderDate: new Date().toISOString(),
            deliveryAddress: orderData.deliveryAddress,
            specialInstructions: orderData.specialInstructions,
        };
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        setActiveTab('orders');
    };

    // Sidebar
    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'Orders', icon: ClipboardList },
        { id: 'new-order', label: 'Create Order', icon: Plus },
        { id: 'stats', label: 'Analytics', icon: BarChart3 },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    // Statistics calculations
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter((order) => order.status === 'pending').length;
    const deliveredOrders = orders.filter((order) => order.status === 'delivered').length;

    const renderDashboard = () => (
        <div className="dashboard-content">
            {/* Welcome Section */}
            <div className="welcome-section">
                <div className="welcome-header">
                    <div className="welcome-text">
                        <h1>Welcome back, Admin</h1>
                        <p>Here's what's happening with your restaurant today</p>
                    </div>
                    <div className="date-display">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Total Revenue</p>
                            <p className="stat-value">${totalRevenue.toFixed(2)}</p>
                            <p className="stat-change positive">
                                <ArrowUp />
                                +12.5%
                            </p>
                        </div>
                        <div className="stat-icon blue">
                            <DollarSign />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Total Orders</p>
                            <p className="stat-value">{totalOrders}</p>
                            <p className="stat-change positive">
                                <ArrowUp />
                                +8.2%
                            </p>
                        </div>
                        <div className="stat-icon green">
                            <ClipboardList />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Pending Orders</p>
                            <p className="stat-value">{pendingOrders}</p>
                            <p className="stat-change warning">
                                <Clock />
                                Needs attention
                            </p>
                        </div>
                        <div className="stat-icon yellow">
                            <Clock />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Delivered</p>
                            <p className="stat-value">{deliveredOrders}</p>
                            <p className="stat-change positive">
                                <CheckCircle />
                                Completed
                            </p>
                        </div>
                        <div className="stat-icon emerald">
                            <CheckCircle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="orders-section">
                <div className="section-header">
                    <h2>Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="view-all-btn">
                        View all →
                    </button>
                </div>
                <div className="orders-list">
                    {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="order-item">
                            <div className="order-content">
                                <div className="order-info">
                                    <div className="order-id">
                                        <span>#{order.id}</span>
                                    </div>
                                    <div className="customer-info">
                                        <p className="customer-name">{order.customerName}</p>
                                        <p className="order-details">{order.items.length} items</p>
                                    </div>
                                </div>
                                <div className="order-meta">
                                    <span className="order-total">${order.total.toFixed(2)}</span>
                                    <span className={`order-status ${order.status}`}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="orders-page">
            <div className="page-header">
                <h1>Orders Management</h1>
                <button  onClick={() => setActiveTab('new-order')} className="new-order-btn">
                    <Plus />
                    <span>New Order</span>
                </button>
            </div>
            <OrderList
                orders={orders}
                onStatusUpdate={handleOrderStatusUpdate}
                onDeleteOrder={handleDeleteOrder}
                onViewOrder={handleViewOrder}
            />
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'orders':
                return renderOrders();
            case 'new-order':
                return <OrderForm onSubmit={handleSubmitOrder} />;
            case 'stats':
                return <AdminStats orders={orders} />;
            case 'customers':
                return (
                    <div className="placeholder-page">
                        <h2>Customer Management</h2>
                        <p>Customer list and management tools will be shown here.</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="placeholder-page">
                        <h2>Settings</h2>
                        <p>System settings and configuration options will be available here.</p>
                    </div>
                );
            default:
                return renderDashboard();
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
                {/* Sidebar */}
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`nav-item${activeTab === item.id ? ' active' : ''}`}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">{renderContent()}</main>
            </div>
        </div>
    );
};

export default AdminDashboard;
