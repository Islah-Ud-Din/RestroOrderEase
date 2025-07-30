'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    badge?: number;
}

interface SidebarProps {
    className?: string;
    onItemClick?: (item: SidebarItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '', onItemClick }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItems: SidebarItem[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'fas fa-tachometer-alt',
            path: '/pages/dashboard'
        },
        {
            id: 'menu',
            label: 'Menu Management',
            icon: 'fas fa-utensils',
            path: '/pages/menu'
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: 'fas fa-shopping-cart',
            path: '/pages/orders',
            badge: 8
        },
        {
            id: 'customers',
            label: 'Customers',
            icon: 'fas fa-users',
            path: '/pages/customers'
        },
        {
            id: 'inventory',
            label: 'Inventory',
            icon: 'fas fa-boxes',
            path: '/pages/inventory'
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: 'fas fa-chart-bar',
            path: '/pages/reports'
        },
        {
            id: 'staff',
            label: 'Staff Management',
            icon: 'fas fa-user-tie',
            path: '/pages/staff'
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: 'fas fa-cog',
            path: '/pages/settings'
        }
    ];

    const handleItemClick = (item: SidebarItem) => {
        if (onItemClick) {
            onItemClick(item);
        } else {
            router.push(item.path);
        }
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div className={`sidebar ${className} ${collapsed ? 'collapsed' : ''}`}>
            {/* Toggle Button */}
            <div className="sidebar-toggle">
                <button 
                    className="btn btn-link btn-sm"
                    onClick={() => setCollapsed(!collapsed)}
                    title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                    <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
                </button>
            </div>

            {/* Logo/Brand */}
            <div className="sidebar-brand">
                <div className="brand-content">
                    <i className="fas fa-utensils brand-icon"></i>
                    {!collapsed && <span className="brand-text">Restaurant</span>}
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {sidebarItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                onClick={() => handleItemClick(item)}
                                title={collapsed ? item.label : ''}
                            >
                                <div className="nav-icon">
                                    <i className={item.icon}></i>
                                </div>
                                {!collapsed && (
                                    <div className="nav-content">
                                        <span className="nav-label">{item.label}</span>
                                        {item.badge && (
                                            <span className="nav-badge">{item.badge}</span>
                                        )}
                                    </div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Section */}
            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">
                        <i className="fas fa-user"></i>
                    </div>
                    {!collapsed && (
                        <div className="user-details">
                            <div className="user-name">Admin User</div>
                            <div className="user-role">Manager</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 