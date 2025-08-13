'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

// UserContext
import { useUser } from '@/contexts/UserContext';

// SidebarNavigation
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';

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
    TrendingUp,
    Package,
    Calendar,
    ChevronRight,
    MoreVertical,
} from 'lucide-react'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const UiDashboard = () => {
    const router = useRouter();
    const { navigate } = useSidebarNavigation();
    const { user, logout } = useUser();

    const [userName] = useState({ name: 'Islahuddin' });

    // Sample data for charts
    const performanceData = [
        { name: 'Jan', current: 15000000, previous: 10000000 },
        { name: 'Feb', current: 18000000, previous: 12000000 },
        { name: 'Mar', current: 16000000, previous: 14000000 },
        { name: 'Apr', current: 22000000, previous: 18000000 },
        { name: 'May', current: 20000000, previous: 16000000 },
        { name: 'Jun', current: 25000000, previous: 20000000 },
        { name: 'Jul', current: 28000000, previous: 22000000 },
    ];

    const importData = [
        { name: 'Opzelura', value: 25000000 },
        { name: 'Abilify', value: 22000000 },
        { name: 'Zofran', value: 20000000 },
        { name: 'Windows', value: 15000000 },
        { name: 'Android', value: 8000000 },
        { name: 'Other', value: 23000000 },
    ];

    const purchaseData = [
        { name: 'Jan', value: 25000000 },
        { name: 'Feb', value: 30000000 },
        { name: 'Mar', value: 27000000 },
        { name: 'Apr', value: 35000000 },
        { name: 'May', value: 22000000 },
        { name: 'Jun', value: 30000000 },
        { name: 'Jul', value: 25000000 },
        { name: 'Aug', value: 32000000 },
        { name: 'Sep', value: 28000000 },
        { name: 'Oct', value: 30000000 },
        { name: 'Nov', value: 22000000 },
        { name: 'Dec', value: 28000000 },
    ];

    const saleDistribution = [
        { name: 'Lahore', value: 38.6, color: '#3B82F6' },
        { name: 'Karachi', value: 22.5, color: '#10B981' },
        { name: 'Islamabad', value: 30.8, color: '#F59E0B' },
        { name: 'Other', value: 8.1, color: '#8B5CF6' },
    ];

    const stocksData = [
        { name: 'Opzelura', price: '5:00 PM', status: 'Medium', progress: 75 },
        { name: 'Abilify', price: '5:00 PM', status: 'High', progress: 85 },
        { name: 'Chlorthalidone', price: '5:00 PM', status: 'Medium', progress: 60 },
        { name: 'Zofran', price: '5:00 PM', status: 'Medium', progress: 70 },
        { name: 'Gabapentin', price: '5:00 PM', status: 'Medium', progress: 65 },
    ];

    const paymentsData = [
        {
            id: 'PND001265',
            company: 'Shell Limited Company',
            amount: 'Rs 100,000',
            time: '10:00-11:30',
            location: 'Lahore',
            status: 'Pending',
        },
        { company: 'Care Medical Centre', amount: 'Rs 500,000', time: '10:00-11:30', location: 'Lahore', status: 'Not Responding' },
        { company: 'Florence health care', amount: 'Rs 750,030', time: '10:00-11:30', location: 'Lahore', status: 'Clear' },
        { company: 'EliteCare Clinic', amount: 'Rs 750,030', time: '10:00-11:30', location: 'Lahore', status: 'Not Responding' },
        { company: 'LifeLine Physical Therapy', amount: 'Rs 750,030', time: '10:00-11:30', location: 'Lahore', status: 'Clear' },
    ];

    const sidebarItems = [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'import', label: 'Import', icon: Package, count: 0 },
        { id: 'purchase', label: 'Purchase', icon: ClipboardList },
        { id: 'sale', label: 'Sale', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'High':
                return 'text-red-500';
            case 'Medium':
                return 'text-yellow-500';
            case 'Clear':
                return 'text-green-500';
            case 'Pending':
                return 'text-yellow-500';
            case 'Not Responding':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="admin-dashboard">
            {/* header */}
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
                                className={`nav-item${item.id === 'stats' ? ' active' : ''}`}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName.name}</h1>
                        <p className="text-gray-600">Explore on-chain funds deployed by the community, or create your own.</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                            <Calendar className="w-4 h-4" />
                            <span>Nov 16, 2020 - Dec 16, 2020</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { title: 'Total Money', amount: 'Rs 70,00,000', change: '+11.01%', color: 'text-green-600' },
                            { title: 'Purchase', amount: 'Rs 70,00,000', change: '+37.01%', color: 'text-green-600' },
                            { title: 'Sale', amount: 'Rs 110,030', change: '+50.01%', color: 'text-green-600' },
                            { title: 'Expense', amount: 'Rs 70,00,000', change: '+68.03%', color: 'text-green-600' },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.amount}</p>
                                <div className="flex items-center">
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className={`text-sm ${stat.color}`}>{stat.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Business Performance */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Business Performance Overview</h3>
                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span>Current Week</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                        <span>Previous Week</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                        <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} />
                                        <Line type="monotone" dataKey="previous" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Available Stocks */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Available Stocks</h3>
                                <button className="flex items-center space-x-1 text-blue-600 text-sm">
                                    <span>View all</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {stocksData.map((stock, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-gray-900">{stock.name}</span>
                                                <span className={`text-sm ${getStatusColor(stock.status)}`}>{stock.status}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                                <span>Today | {stock.price}</span>
                                                <TrendingUp className="w-4 h-4" />
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${stock.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Total Import */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Total Import</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={importData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                        <Bar dataKey="value" fill="#3B82F6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Total Sale */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Sale</h3>
                                <p className="text-sm text-gray-600">
                                    Explore on-chain funds deployed by the community, or create your own.
                                </p>
                            </div>
                            <div className="h-32 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={saleDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value">
                                            {saleDistribution.map((entry, index) => (
                                                <Cell key={index} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2">
                                {saleDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                                            <span className="text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="font-medium">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipment */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">PND001265</p>
                                    <p className="font-medium text-gray-900">Shipment this month</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span>Created Sep 12, 2020</span>
                                <div className="flex items-center space-x-1 text-yellow-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Medium</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Purchase Chart */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Total Purchase</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={purchaseData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                    <Bar dataKey="value" fill="#1E40AF" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Payment This Month */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Payment this month</h3>
                            <button className="flex items-center space-x-1 text-blue-600 text-sm">
                                <span>View all</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {paymentsData.map((payment, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{payment.company}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <span className={getStatusColor(payment.status)}>{payment.status}</span>
                                                <span>•</span>
                                                <span>{payment.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <p>{payment.time}</p>
                                        <p>{payment.location}</p>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UiDashboard;
