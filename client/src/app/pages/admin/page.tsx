'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Context
import { useUser } from '@/contexts/UserContext';

// Components
import Loader from '@/components/Loader/Loader';
import OrderList from '@/components/admin/OrderList';
import OrderForm from '@/components/admin/OrderForm';
import AdminStats from '@/components/admin/AdminStats';

// icons
import {
    ClipboardList,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Plus,
    Eye,
    Edit,
    Trash2,
    Bell,
    Search,
    Home,
    UtensilsCrossed,
    Truck,
    DollarSign,
    ArrowUp,
    ArrowDown,
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
    const { authToken, user } = useUser();

    // State
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'new-order' | 'stats' | 'customers' | 'settings'>('dashboard');
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        const sampleOrders: Order[] = [
            {
                id: '1',
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                customerPhone: '+1234567890',
                items: [
                    { id: '1', name: 'Margherita Pizza', quantity: 2, price: 12.99 },
                    { id: '2', name: 'Caesar Salad', quantity: 1, price: 8.99 },
                ],
                total: 34.97,
                status: 'pending',
                orderDate: new Date().toISOString(),
                deliveryAddress: '123 Main St, City, State 12345',
                specialInstructions: 'Extra cheese on pizza',
            },
            {
                id: '2',
                customerName: 'Jane Smith',
                customerEmail: 'jane@example.com',
                customerPhone: '+1234567891',
                items: [
                    { id: '3', name: 'Chicken Pasta', quantity: 1, price: 15.99 },
                    { id: '4', name: 'Garlic Bread', quantity: 2, price: 3.99 },
                ],
                total: 23.97,
                status: 'confirmed',
                orderDate: new Date(Date.now() - 3600000).toISOString(),
                deliveryAddress: '456 Oak Ave, City, State 12345',
            },
            {
                id: '3',
                customerName: 'Mike Johnson',
                customerEmail: 'mike@example.com',
                customerPhone: '+1234567892',
                items: [
                    { id: '5', name: 'Beef Burger', quantity: 1, price: 11.99 },
                    { id: '6', name: 'French Fries', quantity: 1, price: 4.99 },
                    { id: '7', name: 'Soft Drink', quantity: 1, price: 2.99 },
                ],
                total: 19.97,
                status: 'ready',
                orderDate: new Date(Date.now() - 7200000).toISOString(),
                deliveryAddress: '789 Pine St, City, State 12345',
            },
            {
                id: '4',
                customerName: 'Sarah Wilson',
                customerEmail: 'sarah@example.com',
                customerPhone: '+1234567893',
                items: [{ id: '8', name: 'Vegetarian Pizza', quantity: 1, price: 14.99 }],
                total: 14.99,
                status: 'delivered',
                orderDate: new Date(Date.now() - 10800000).toISOString(),
                deliveryAddress: '321 Elm St, City, State 12345',
            },
        ];
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

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'Orders', icon: ClipboardList },
        { id: 'new-order', label: 'Create Order', icon: Plus },
        { id: 'stats', label: 'Analytics', icon: BarChart3 },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'confirmed':
                return 'text-blue-600 bg-blue-100';
            case 'preparing':
                return 'text-purple-600 bg-purple-100';
            case 'ready':
                return 'text-green-600 bg-green-100';
            case 'delivered':
                return 'text-emerald-600 bg-emerald-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

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
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                        <button onClick={() => setActiveTab('orders')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View all →
                        </button>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibo  ld">#{order.id}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{order.customerName}</p>
                                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {getStatusIcon(order.status)}
                                        <span className="capitalize">{order.status}</span>
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <button
                    onClick={() => setActiveTab('new-order')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Order</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-sm">#{order.id}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{order.items.length} items</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-semibold">${order.total.toFixed(2)}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value as Order['status'])}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="ready">Ready</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'orders':
                return renderOrders();
            case 'new-order':
                return (
                    <div className="bg-white rounded-xl p-8 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
                        <p className="text-gray-600">Order creation form will be implemented here.</p>
                    </div>
                );
            case 'stats':
                return <AdminStats orders={orders} />;
            case 'customers':
                return (
                    <div className="bg-white rounded-xl p-8 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
                        <p className="text-gray-600">Customer list and management tools will be shown here.</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="bg-white rounded-xl p-8 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Settings</h2>
                        <p className="text-gray-600">System settings and configuration options will be available here.</p>
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
                        <button className="logout-btn">
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
