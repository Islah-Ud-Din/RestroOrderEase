'use client';

import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaClock, FaCheck, FaUtensils, FaCheckCircle, FaTruck, FaTimes } from 'react-icons/fa';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
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
}

interface OrderListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onViewOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onStatusUpdate, onDeleteOrder, onViewOrder }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-warning" />;
      case 'confirmed':
        return <FaCheck className="text-info" />;
      case 'preparing':
        return <FaUtensils className="text-primary" />;
      case 'ready':
        return <FaCheckCircle className="text-success" />;
      case 'delivered':
        return <FaTruck className="text-success" />;
      case 'cancelled':
        return <FaTimes className="text-danger" />;
      default:
        return <FaClock className="text-warning" />;
    }
  };

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'confirmed':
        return 'bg-info text-white';
      case 'preparing':
        return 'bg-primary text-white';
      case 'ready':
        return 'bg-success text-white';
      case 'delivered':
        return 'bg-success text-white';
      case 'cancelled':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="order-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Order Management</h3>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px' }}
          />
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>#{order.id}</strong>
                </td>
                <td>
                  <div>
                    <div className="fw-bold">{order.customerName}</div>
                    <small className="text-muted">{order.customerEmail}</small>
                    <br />
                    <small className="text-muted">{order.customerPhone}</small>
                  </div>
                </td>
                <td>
                  <div>
                    {order.items.map((item, index) => (
                      <div key={index} className="small">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <strong>${order.total.toFixed(2)}</strong>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td>
                  <small>{formatDate(order.orderDate)}</small>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onViewOrder(order)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>

                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => onStatusUpdate(order.id, e.target.value as Order['status'])}
                      style={{ width: 'auto' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeleteOrder(order.id)}
                      title="Delete Order"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted">No orders found</h5>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
