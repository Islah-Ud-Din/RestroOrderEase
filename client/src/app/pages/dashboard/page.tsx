'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Sidebar from '@/components/Sidebar';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

interface RecentOrder {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  time: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { accessToken } = useUser(); // assuming only accessToken in context
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/pages/login');
      return;
    }
  
    loadDashboardData();
  }, [router, accessToken, ]);

  const loadDashboardData = async () => {
    try {
      // Simulated data
      setStats({
        totalOrders: 156,
        totalRevenue: 12450.75,
        pendingOrders: 8,
        completedOrders: 148,
      });

      setRecentOrders([
        {
          id: 'ORD-001',
          customerName: 'John Doe',
          items: ['Margherita Pizza', 'Coke'],
          total: 24.99,
          status: 'pending',
          time: '2 min ago',
        },
        {
          id: 'ORD-002',
          customerName: 'Jane Smith',
          items: ['Chicken Burger', 'Fries', 'Milkshake'],
          total: 18.5,
          status: 'completed',
          time: '15 min ago',
        },
        {
          id: 'ORD-003',
          customerName: 'Mike Johnson',
          items: ['Pasta Carbonara', 'Garlic Bread'],
          total: 22.75,
          status: 'pending',
          time: '25 min ago',
        },
        {
          id: 'ORD-004',
          customerName: 'Sarah Wilson',
          items: ['Caesar Salad', 'Soup'],
          total: 16.25,
          status: 'completed',
          time: '45 min ago',
        },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAccessToken(null);
    router.push('/pages/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'completed': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Sidebar />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            <h4 className="mb-0">Restaurant Dashboard</h4>
          </span>
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-user me-2"></i>
                Admin
              </span>
              <ul className="dropdown-menu">
                <li><span className="dropdown-item"><i className="fas fa-cog me-2"></i>Settings</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content container-fluid">
        {/* Stats */}
        <div className="row mb-4">
          {[
            { label: 'Total Orders', value: stats.totalOrders, icon: 'fa-shopping-cart', color: 'primary' },
            { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: 'fa-dollar-sign', color: 'success' },
            { label: 'Pending Orders', value: stats.pendingOrders, icon: 'fa-clock', color: 'warning' },
            { label: 'Completed Orders', value: stats.completedOrders, icon: 'fa-check-circle', color: 'info' },
          ].map((item, i) => (
            <div className="col-xl-3 col-md-6 mb-4" key={i}>
              <div className={`card border-left-${item.color} shadow h-100 py-2`}>
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className={`text-xs font-weight-bold text-${item.color} text-uppercase mb-1`}>
                        {item.label}
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{item.value}</div>
                    </div>
                    <div className="col-auto">
                      <i className={`fas ${item.icon} fa-2x text-gray-300`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">Recent Orders</h6>
            <button className="btn btn-sm btn-primary">View All</button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" width="100%">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td><small>{order.items.join(', ')}</small></td>
                      <td>${order.total.toFixed(2)}</td>
                      <td><span className={`badge ${getStatusBadge(order.status)}`}>{order.status}</span></td>
                      <td>{order.time}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1"><i className="fas fa-eye"></i></button>
                        <button className="btn btn-sm btn-outline-success me-1"><i className="fas fa-check"></i></button>
                        <button className="btn btn-sm btn-outline-danger"><i className="fas fa-times"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card shadow">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
          </div>
          <div className="card-body row">
            {[
              { label: 'Add New Menu Item', icon: 'fa-plus', color: 'primary' },
              { label: 'Generate Report', icon: 'fa-file-alt', color: 'success' },
              { label: 'Manage Staff', icon: 'fa-users', color: 'info' },
              { label: 'System Settings', icon: 'fa-cog', color: 'warning' },
            ].map((action, i) => (
              <div className="col-md-3 mb-3" key={i}>
                <button className={`btn btn-${action.color} btn-block`}>
                  <i className={`fas ${action.icon} me-2`}></i>
                  {action.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
