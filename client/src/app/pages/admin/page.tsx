'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaClipboardList, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Context
import { useUser } from '@/contexts/UserContext';

// Components
import Loader from '@/components/Loader/Loader';
import OrderList from '@/components/admin/OrderList';
import OrderForm from '@/components/admin/OrderForm';
import AdminStats from '@/components/admin/AdminStats';

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

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'orders' | 'new-order' | 'stats'>('orders');
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    console.log('User in admin:', user);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/pages/login');
            return;
        }
        setTimeout(() => setLoading(false), 1000);

        loadSampleOrders();
    }, [router, authToken]);

    const loadSampleOrders = () => {
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
        ];

        setOrders(sampleOrders);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/pages/login');
    };

    const handleOrderStatusUpdate = (orderId: string, newStatus: Order['status']) => {
        setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    };

    const handleDeleteOrder = (orderId: string) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    };

    const handleCreateOrder = (newOrder: Omit<Order, 'id' | 'orderDate'>) => {
        const order: Order = {
            ...newOrder,
            id: Date.now().toString(),
            orderDate: new Date().toISOString(),
        };
        setOrders((prevOrders) => [order, ...prevOrders]);
        setActiveTab('orders');
    };

    if (loading) {
        return <Loader size={70} />;
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header bg-primary text-white p-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="mb-0">
                                <FaClipboardList className="me-2" />
                                Restaurant Admin Panel
                            </h2>
                        </div>
                        <div className="col-md-6 text-end">
                            <span className="me-3">Welcome, {(user as any)?.name || 'Admin'}</span>
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 col-lg-2">
                        <div className="admin-sidebar bg-light p-3" style={{ minHeight: 'calc(100vh - 80px)' }}>
                            <nav className="nav flex-column">
                                <button
                                    className={`nav-link btn btn-link text-start ${activeTab === 'orders' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    <FaClipboardList className="me-2" />
                                    Orders
                                </button>
                                <button
                                    className={`nav-link btn btn-link text-start ${activeTab === 'new-order' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('new-order')}
                                >
                                    <FaPlus className="me-2" />
                                    Create Order
                                </button>
                                <button
                                    className={`nav-link btn btn-link text-start ${activeTab === 'stats' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('stats')}
                                >
                                    <FaChartBar className="me-2" />
                                    Statistics
                                </button>
                                <hr />
                                <button className="nav-link btn btn-link text-start">
                                    <FaUsers className="me-2" />
                                    Customers
                                </button>
                                <button className="nav-link btn btn-link text-start">
                                    <FaCog className="me-2" />
                                    Settings
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9 col-lg-10">
                        <div className="admin-content p-4">
                            {activeTab === 'orders' && (
                                <OrderList
                                    orders={orders}
                                    onStatusUpdate={handleOrderStatusUpdate}
                                    onDeleteOrder={handleDeleteOrder}
                                    onViewOrder={setSelectedOrder}
                                />
                            )}

                            {activeTab === 'new-order' && <OrderForm onSubmit={handleCreateOrder} />}

                            {activeTab === 'stats' && <AdminStats orders={orders} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
