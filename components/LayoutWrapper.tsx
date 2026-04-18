'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current path is an admin page
    const isAdminPage = pathname?.startsWith('/admin');

    // Admin pages have their own layout
    if (isAdminPage) {
        return <>{children}</>;
    }

    // Regular pages get header and footer
    return (
        <>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
