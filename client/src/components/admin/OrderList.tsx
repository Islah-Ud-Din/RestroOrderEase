'use client';

import React, { useState } from 'react';
import {
  ClockCircleOutlined,
  CheckOutlined,
  CoffeeOutlined,
  CheckCircleOutlined,
  CarOutlined,
  CloseOutlined,
  EyeOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Table, Tag, Button, Select, Input, Space, Typography, Popconfirm } from 'antd';

const { Option } = Select;
const { Text } = Typography;

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

const OrderList: React.FC<OrderListProps> = ({
  orders,
  onStatusUpdate,
  onDeleteOrder,
  onViewOrder
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusTag = (status: Order['status']) => {
    const statusMap: Record<
      Order['status'],
      { color: string; icon: React.ReactNode; text: string }
    > = {
      pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
      confirmed: { color: 'blue', icon: <CheckOutlined />, text: 'Confirmed' },
      preparing: { color: 'geekblue', icon: <CoffeeOutlined />, text: 'Preparing' },
      ready: { color: 'green', icon: <CheckCircleOutlined />, text: 'Ready' },
      delivered: { color: 'green', icon: <CarOutlined />, text: 'Delivered' },
      cancelled: { color: 'red', icon: <CloseOutlined />, text: 'Cancelled' }
    };
    const { color, icon, text } = statusMap[status];
    return <Tag color={color} icon={icon}>{text}</Tag>;
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text strong>#{id}</Text>
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_: any, order: Order) => (
        <>
          <Text strong>{order.customerName}</Text>
          <div style={{ fontSize: '12px', color: '#888' }}>{order.customerEmail}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{order.customerPhone}</div>
        </>
      )
    },
    {
      title: 'Items',
      key: 'items',
      render: (_: any, order: Order) => (
        <>
          {order.items.map((item, i) => (
            <div key={i} style={{ fontSize: '12px' }}>
              {item.quantity}x {item.name}
            </div>
          ))}
        </>
      )
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => <Text strong>${total.toFixed(2)}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Order['status']) => getStatusTag(status)
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => <Text>{new Date(date).toLocaleString()}</Text>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, order: Order) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onViewOrder(order)}
          />
          <Select
            size="small"
            value={order.status}
            onChange={(value) => onStatusUpdate(order.id, value as Order['status'])}
            style={{ width: 120 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="preparing">Preparing</Option>
            <Option value="ready">Ready</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <Popconfirm
            title="Delete Order"
            description="Are you sure to delete this order?"
            onConfirm={() => onDeleteOrder(order.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
          style={{ width: 150 }}
        >
          <Option value="all">All Status</Option>
          <Option value="pending">Pending</Option>
          <Option value="confirmed">Confirmed</Option>
          <Option value="preparing">Preparing</Option>
          <Option value="ready">Ready</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredOrders}
        pagination={{ pageSize: 5 }}
      />

      {filteredOrders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          <h4>No orders found</h4>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
