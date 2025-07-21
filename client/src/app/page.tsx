'use client';

import Image from 'next/image';
import SignUpPage from './pages/SignUp/page';

export default function Home() {
    return (
        <div className="home container">
            <SignUpPage />
        </div>
    );
}
