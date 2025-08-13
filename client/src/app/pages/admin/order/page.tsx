'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Context
import { useUser } from '@/contexts/UserContext';

// SidebarNav Hook
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';

// components
import OrderList from '@/components/admin/OrderList';

// data
import { sampleOrders } from '@/data/sampleOrders';

// Icons
import { ClipboardList, Users, BarChart3, Settings, LogOut, Bell, Search, Home, UtensilsCrossed } from 'lucide-react';



type OrderItem = {
	id: string;
	name: string;
	quantity: number;
	price: number;
};

type Order = {
	id: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	items: OrderItem[];
	total: number;
	status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
	orderDate: string;
	deliveryAddress?: string;
	specialInstructions?: string;
};

const OrdersPage: React.FC = () => {
	const router = useRouter();
    const { navigate } = useSidebarNavigation();
	const { logout, user } = useUser();
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		setOrders(sampleOrders as unknown as Order[]);
	}, []);

	const handleLogout = () => {
		logout();
		router.push('/');
	};

	const handleOrderStatusUpdate = (orderId: string, newStatus: Order['status']) => {
		setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
	};

	const handleDeleteOrder = (orderId: string) => {
		setOrders((prev) => prev.filter((o) => o.id !== orderId));
	};

	const handleViewOrder = (order: Order) => {
		console.log('Viewing order:', order);
	};

	const sidebarItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: Home },
		{ id: 'orders', label: 'Orders', icon: ClipboardList },
		{ id: 'stats', label: 'Analytics', icon: BarChart3 },
		{ id: 'customers', label: 'Customers', icon: Users },
		{ id: 'settings', label: 'Settings', icon: Settings },
	];


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
								className={`nav-item${item.id === 'orders' ? ' active' : ''}`}
							>
								<item.icon />
								<span>{item.label}</span>
							</button>
						))}
					</nav>
				</aside>

				<main className="main-content">
					<div className="orders-page">
						<div className="page-header">
							<h1>Orders Management</h1>
						</div>
						<OrderList
							orders={orders}
							onStatusUpdate={handleOrderStatusUpdate}
							onDeleteOrder={handleDeleteOrder}
							onViewOrder={handleViewOrder}
						/>
					</div>
				</main>
			</div>
		</div>
	);
};

export default OrdersPage;
