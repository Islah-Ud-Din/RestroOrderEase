'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    FaTachometerAlt,
    FaUtensils,
    FaShoppingCart,
    FaUsers,
    FaBoxes,
    FaChartBar,
    FaUserTie,
    FaCog,
    FaChevronLeft,
    FaChevronRight,
    FaUser,
} from 'react-icons/fa';

interface SidebarItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    badge?: number;
}

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const items: SidebarItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: 'FaTachometerAlt', path: '/dashboard' },
        { id: 'menu', label: 'Menu Management', icon: 'FaUtensils', path: '/menu' },
        { id: 'orders', label: 'Orders', icon: 'FaShoppingCart', path: '/orders', badge: 8 },
        { id: 'customers', label: 'Customers', icon: 'FaUsers', path: '/customers' },
        { id: 'inventory', label: 'Inventory', icon: 'FaBoxes', path: '/inventory' },
        { id: 'reports', label: 'Reports', icon: 'FaChartBar', path: '/reports' },
        { id: 'staff', label: 'Staff Management', icon: 'FaUserTie', path: '/staff' },
        { id: 'settings', label: 'Settings', icon: 'FaCog', path: '/settings' },
    ];

    const go = (path: string) => router.push(path);
    const isActive = (path: string) => pathname === path;

    const renderIcon = (iconName: string, active: boolean) => {
        const props = { size: 18, color: active ? '#0d6efd' : '#6c757d' };
        const map: Record<string, JSX.Element> = {
            FaTachometerAlt: <FaTachometerAlt {...props} />,
            FaUtensils: <FaUtensils {...props} />,
            FaShoppingCart: <FaShoppingCart {...props} />,
            FaUsers: <FaUsers {...props} />,
            FaBoxes: <FaBoxes {...props} />,
            FaChartBar: <FaChartBar {...props} />,
            FaUserTie: <FaUserTie {...props} />,
            FaCog: <FaCog {...props} />,
        };
        return map[iconName] || <FaTachometerAlt {...props} />;
    };

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : 'open'}`}>
            <div className="rs-side-head">
                <FaUtensils size={20} color="#0d6efd" />
                {!collapsed && <span className="rs-logo">Restaurant</span>}

                <div className="rs-toggle">
                    <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? <FaChevronRight /> : <FaChevronLeft />}</button>
                </div>
            </div>

            <nav>
                <ul>
                    {items.map((i) => {
                        const active = isActive(i.path);
                        return (
                            <li key={i.id} className={active ? 'active' : ''}>
                                <button onClick={() => go(i.path)} title={collapsed ? i.label : ''}>
                                    <span className="icon">{renderIcon(i.icon, active)}</span>
                                    {!collapsed && (
                                        <>
                                            <span className="label">{i.label}</span>
                                            {i.badge && <span className="badge">{i.badge}</span>}
                                        </>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="footer">
                <div className="avatar">
                    <FaUser size={16} color="#adb5bd" />
                </div>
                {!collapsed && (
                    <div className="user-details">
                        <div className="name">Admin User</div>
                        <div className="role">Manager</div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
