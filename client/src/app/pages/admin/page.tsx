'use client';

import React, { useState, useEffect } from 'react';

// Navigation
import { useRouter } from 'next/navigation';

// Context
import { useUser } from '@/contexts/UserContext';

// Components
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';

// Components
import Loader from '@/components/Loader/Loader';

//  Lib
import { ClipboardList, TrendingUp, Users, BarChart3, Settings, LogOut, Bell, Search, Home, UtensilsCrossed } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Bar as RechartsBar,
} from 'recharts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const { navigate } = useSidebarNavigation();

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

    //  importData and saleDistribution
    const importData = [
        { name: 'Jan', value: 15000000 },
        { name: 'Feb', value: 18000000 },
        { name: 'Mar', value: 16000000 },
        { name: 'Apr', value: 22000000 },
        { name: 'May', value: 20000000 },
        { name: 'Jun', value: 25000000 },
        { name: 'Jul', value: 28000000 },
    ];

    const saleDistribution = [
        { name: 'Category A', value: 40, color: '#3B82F6' },
        { name: 'Category B', value: 30, color: '#10B981' },
        { name: 'Category C', value: 20, color: '#F59E0B' },
        { name: 'Category D', value: 10, color: '#EF4444' },
    ];

    const barChartData = {
        labels: importData.map((item) => item.name),
        datasets: [
            {
                label: 'Total Import',
                data: importData.map((item) => item.value),
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${(context.parsed.y / 1000000).toFixed(1)}M`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Doughnut chart configuration
    const doughnutChartData = {
        labels: saleDistribution.map((item) => item.name),
        datasets: [
            {
                data: saleDistribution.map((item) => item.value),
                backgroundColor: saleDistribution.map((item) => item.color),
                borderWidth: 0,
            },
        ],
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
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
                            <button key={item.id} onClick={() => navigate(item.id)} className={'nav-item'}>
                                <item.icon />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <div className="dashboard-content">
                        <h3>Admin Dashboard</h3>
                        <p>Select a section from the sidebar to manage Orders, Customers, Analytics, or Settings.</p>

                        <div className="row">
                            <div className="col-lg-8">
                                {/* Admin Cards */}
                                <div className="admin-stats">
                                    {[
                                        { title: 'Total Money', amount: 'Rs 70,00,000', change: '+11.01%', color: 'green' },
                                        { title: 'Purchase', amount: 'Rs 70,00,000', change: '+37.01%', color: 'green' },
                                        { title: 'Sale', amount: 'Rs 110,030', change: '+50.01%', color: 'green' },
                                        { title: 'Expense', amount: 'Rs 70,00,000', change: '+68.03%', color: 'green' },
                                    ].map((stat, index) => (
                                        <div key={index} className="admin-stats-card">
                                            <p className="admin-stats-title">{stat.title}</p>
                                            <p className="admin-stats-amount">{stat.amount}</p>
                                            <div className="admin-stats-change">
                                                <TrendingUp className="icon" />
                                                <span className={`change-${stat.color}`}>{stat.change}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Admin Perform */}
                                <div className="admin-perform">
                                    <h4 className="">Business Performance Overview</h4>

                                    <div className="data-graph" style={{ height: 400 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={performanceData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <RechartsTooltip formatter={(value: number) => `${(value / 1000000).toFixed(1)}M`} />
                                                <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="previous"
                                                    stroke="#6B7280"
                                                    strokeWidth={2}
                                                    strokeDasharray="5 5"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* two GRaph */}
                                <div className="row">
                                    <div className="col-lg-6 admin-perform">
                                        <h3>Total Import</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                                        <div className="data-graph" style={{ height: 200 }}>
                                            <Bar data={barChartData} options={barChartOptions} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 admin-perform">
                                        <h3>Total Sale</h3>

                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                                        <div className="data-graph" style={{ height: 200 }}>
                                            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                                        </div>
                                    </div>
                                </div>

                                {/* Admin Perform */}
                                <div className="admin-perform">
                                    <h4 className="">Business Performance Overview</h4>

                                    <div className="data-graph" style={{ height: 400 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={performanceData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <RechartsTooltip formatter={(value: number) => `${(value / 1000000).toFixed(1)}M`} />
                                                <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="previous"
                                                    stroke="#6B7280"
                                                    strokeWidth={2}
                                                    strokeDasharray="5 5"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4"></div>
                        </div>

                        <div className="row">
                            <div className="col-lg4"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
