'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { menuItems } from '@/data/menuItems';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  deliveryAddress: string;
  specialInstructions: string;
}

interface OrderFormProps {
  onSubmit: (order: OrderFormData) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: [],
    deliveryAddress: '',
    specialInstructions: ''
  });

  const [selectedItem, setSelectedItem] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    if (!selectedItem || itemQuantity <= 0) return;

    const menuItem = menuItems.find(item => item.id === selectedItem);
    if (!menuItem) return;

    const existingItemIndex = formData.items.findIndex(item => item.id === selectedItem);

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedItems = [...formData.items];
      updatedItems[existingItemIndex].quantity += itemQuantity;
      setFormData(prev => ({
        ...prev,
        items: updatedItems
      }));
    } else {
      // Add new item
      const newItem: OrderItem = {
        id: menuItem.id,
        name: menuItem.name,
        quantity: itemQuantity,
        price: menuItem.price
      };
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
    }

    // Reset form
    setSelectedItem('');
    setItemQuantity(1);
  };

  const handleRemoveItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleUpdateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      alert('Please fill in all required customer information');
      return;
    }

    if (formData.items.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }

    onSubmit({
      ...formData,
      items: formData.items.map(item => ({
        ...item,
        price: Number(item.price.toFixed(2))
      }))
    });

    // Reset form
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      items: [],
      deliveryAddress: '',
      specialInstructions: ''
    });
  };

  return (
    <div className="order-form">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Create New Order</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Customer Information */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Customer Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Customer Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Address</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Order Items</h5>
              </div>
              <div className="card-body">
                {/* Add Item Form */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                    >
                      <option value="">Select Menu Item</option>
                      {menuItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} - ${item.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Qty"
                      min="1"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleAddItem}
                      disabled={!selectedItem}
                    >
                      <FaPlus className="me-1" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="order-items-list">
                  {formData.items.map((item) => (
                    <div key={item.id} className="order-item d-flex justify-content-between align-items-center p-2 border rounded mb-2">
                      <div className="flex-grow-1">
                        <div className="fw-bold">{item.name}</div>
                        <small className="text-muted">${item.price} each</small>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div className="quantity-controls d-flex align-items-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleUpdateItemQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleUpdateItemQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                {formData.items.length > 0 && (
                  <div className="order-summary mt-3 p-3 bg-light rounded">
                    <h6>Order Summary</h6>
                    <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Tax (8.5%):</span>
                      <span>${(calculateTotal() * 0.085).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span>${(calculateTotal() * 1.085).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary">
            <FaTimes className="me-1" />
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={formData.items.length === 0}>
            <FaSave className="me-1" />
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
