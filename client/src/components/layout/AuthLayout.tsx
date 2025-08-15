'use client';

import { useUser } from '@/contexts/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user, authToken } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const isLoggedIn = !!(user && (user as any).role) || !!authToken;
    const publicRoutes = ['/pages/login', '/pages/SignUp'];


    useEffect(() => {
        if (!isLoggedIn && !publicRoutes.includes(pathname)) {
            router.push('/pages/login'); // redirect to login if not allowed
        }
    }, [isLoggedIn, pathname, router]);

    const rsLayoutHandle = isLoggedIn && (user as any)?.role === 'user' ? true : false;

    return (
        <>
            {rsLayoutHandle && <Header />}
            <main style={{ flex: 1 }}>{children}</main>
            {rsLayoutHandle && <Footer />}
        </>
    );
}

export default AuthLayout;
