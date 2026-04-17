'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Stories', href: '/stories' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Cogniskills Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-2 text-base font-semibold transition-colors ${isActive(link.href)
                                    ? 'text-orange-600'
                                    : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600" />
                                )}
                            </Link>
                        ))}
                        <Link
                            href="/booking"
                            className="ml-4 px-6 py-3 text-base font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all shadow-md hover:shadow-lg"
                        >
                            Book Assessment
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-orange-600"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-3 text-base font-semibold rounded-lg transition-colors ${isActive(link.href)
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/booking"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-4 px-6 py-3 text-base font-bold text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full"
                            >
                                Book Assessment
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
