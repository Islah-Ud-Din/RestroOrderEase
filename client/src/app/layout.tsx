import type { Metadata } from 'next';

// Contexts
import { UserProvider } from '@/contexts/UserContext';
import { CartProvider } from '@/contexts/CartContext';

// CSS
import '../../style/css/style.css';
import '../../style/css/font.css';

// Components
import AuthLayout from '@/components/layout/AuthLayout';

export const metadata: Metadata = {
    title: 'Food System',
    description: 'Food ordering and management system',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <UserProvider>
                    <CartProvider>
                        <AuthLayout>{children}</AuthLayout>
                    </CartProvider>
                </UserProvider>
            </body>
        </html>
    );
}
