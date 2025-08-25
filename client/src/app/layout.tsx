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
    icons: {
        icon: [
            { url: '/Favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/Favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/Favicon/favicon.ico', type: 'image/x-icon' },
        ],
        apple: '/Favicon/apple-touch-icon.png',
        other: [
            {
                rel: 'mask-icon',
                url: '/Favicon/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },
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
