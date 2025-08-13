'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { sampleOrders } from '@/data/sampleOrders';
import { FaClipboardList, FaClock, FaCheckCircle, FaTruck, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { Home, ClipboardList, BarChart3, Users, Settings, Bell, Search, LogOut, UtensilsCrossed } from 'lucide-react';

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

const AdminStats: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(sampleOrders as unknown as Order[]);
  }, []);

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

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  const getStatusCount = (status: Order['status']) => {
    return orders.filter(order => order.status === status).length;
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'delivered')
      .reduce((total, order) => total + order.total, 0);
  };

  const getAverageOrderValue = () => {
    if (orders.length === 0) return 0;
    const totalValue = orders.reduce((total, order) => total + order.total, 0);
    return totalValue / orders.length;
  };

  const getTodayOrders = () => {
    const today = new Date().toDateString();
    return orders.filter(order =>
      new Date(order.orderDate).toDateString() === today
    );
  };

  const getPopularItems = () => {
    const itemCounts: { [key: string]: number } = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });

    return Object.entries(itemCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  };

  const getRecentOrders = () => {
    return orders
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 5);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
                onClick={() => handleSidebarNavigation(item.id)}
                className={`nav-item${item.id === 'stats' ? ' active' : ''}`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <div className="admin-stats">
            <h3 className="mb-4">Dashboard Statistics</h3>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">{orders.length}</h4>
                  <p className="mb-0">Total Orders</p>
                </div>
                <div className="align-self-center">
                  <FaClipboardList size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">{getStatusCount('pending')}</h4>
                  <p className="mb-0">Pending Orders</p>
                </div>
                <div className="align-self-center">
                  <FaClock size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">{getStatusCount('delivered')}</h4>
                  <p className="mb-0">Delivered</p>
                </div>
                <div className="align-self-center">
                  <FaTruck size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">{formatCurrency(getTotalRevenue())}</h4>
                  <p className="mb-0">Total Revenue</p>
                </div>
                <div className="align-self-center">
                  <FaDollarSign size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Order Status Breakdown */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order Status Breakdown</h5>
            </div>
            <div className="card-body">
              <div className="status-breakdown">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Pending</span>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: `${(getStatusCount('pending') / orders.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="badge bg-warning text-dark">{getStatusCount('pending')}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Confirmed</span>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: `${(getStatusCount('confirmed') / orders.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="badge bg-info">{getStatusCount('confirmed')}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Preparing</span>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: `${(getStatusCount('preparing') / orders.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="badge bg-primary">{getStatusCount('preparing')}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Ready</span>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${(getStatusCount('ready') / orders.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="badge bg-success">{getStatusCount('ready')}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Delivered</span>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${(getStatusCount('delivered') / orders.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="badge bg-success">{getStatusCount('delivered')}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span>Cancelled</span>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-danger"
                        style={{ width: `${(getStatusCount('cancelled') / orders.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="badge bg-danger">{getStatusCount('cancelled')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Items */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Most Popular Items</h5>
            </div>
            <div className="card-body">
              <div className="popular-items">
                {getPopularItems().map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span>{item.name}</span>
                    <span className="badge bg-primary">{item.count} orders</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRecentOrders().map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>
                          <span className={`badge ${order.status === 'pending' ? 'bg-warning text-dark' :
                            order.status === 'confirmed' ? 'bg-info' :
                            order.status === 'preparing' ? 'bg-primary' :
                            order.status === 'ready' ? 'bg-success' :
                            order.status === 'delivered' ? 'bg-success' : 'bg-danger'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td>{formatDate(order.orderDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <FaChartLine size={40} className="text-primary mb-2" />
              <h4>{formatCurrency(getAverageOrderValue())}</h4>
              <p className="text-muted">Average Order Value</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <FaClock size={40} className="text-warning mb-2" />
              <h4>{getTodayOrders().length}</h4>
              <p className="text-muted">Today's Orders</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <FaCheckCircle size={40} className="text-success mb-2" />
              <h4>{((getStatusCount('delivered') / orders.length) * 100).toFixed(1)}%</h4>
              <p className="text-muted">Completion Rate</p>
            </div>
          </div>
        </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStats;
