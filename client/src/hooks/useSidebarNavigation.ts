// hooks/useSidebarNavigation.ts
'use client';

import { useRouter } from 'next/navigation';

export const useSidebarNavigation = () => {
    const router = useRouter();

    const navigate = (id: string) => {
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

    return { navigate };
};
