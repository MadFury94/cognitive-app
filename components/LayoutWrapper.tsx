'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Pages with their own standalone layout (no header/footer)
    const isStandalonePage =
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/cognigym-test');

    if (isStandalonePage) {
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
