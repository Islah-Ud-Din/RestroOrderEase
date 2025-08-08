'use client';

import React from 'react';

interface OrderPanelProps {
  cart: any[];
  orderNumber: number;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  getSubTotal: () => number;
  getProductDiscount: () => number;
  getFinalTotal: () => number;
}

const OrderPanel: React.FC<OrderPanelProps> = ({
  cart,
  orderNumber,
  updateQuantity,
  removeFromCart,
  getSubTotal,
  getProductDiscount,
  getFinalTotal
}) => {
  return (
    <div className="order-panel">
      <div className="panel-header">
        {/* search + select dropdowns */}
      </div>

      <div className="order-details">
        <div className="order-header">
          <h3>Order #{orderNumber}</h3>
        </div>

        <div className="order-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>No items in cart</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Sub total:</span>
            <span>${getSubTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Product Discount:</span>
            <span>${getProductDiscount().toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getFinalTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
